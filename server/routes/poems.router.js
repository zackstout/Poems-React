
var express = require('express');
var router = express.Router();
var pg = require('pg');
let config;

if (process.env.DATABASE_URL) {
    // Heroku gives a url, not a connection object
    // https://github.com/brianc/node-pg-pool
    var params = url.parse(process.env.DATABASE_URL);

    config = {
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, // heroku requires ssl to be true
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

    // For local development environment:
} else {
    config = {
        host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
        port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
        database: process.env.DATABASE_NAME || 'poems', //env var: PGDATABASE
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    };

}

const RANDOM_LENGTH = 10;

var pool = new pg.Pool(config);
console.log('router in');

// POST Route
router.post('/', function (req, res) {
    console.log(req.body);
    const user_poem_id = Math.floor(Math.random() * 1000000);
    pool.connect(function (err, db, done) {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < req.body.lines.length; i++) {
                var queryText = `INSERT INTO user_poems (author, title, user_poem_id, original_line_id) VALUES ($1, $2, $3, $4);`;
                db.query(queryText, [req.body.author, req.body.title, user_poem_id, req.body.lines[i].line_id], function (errorMakingQuery, result) {
                    if (errorMakingQuery) {
                        console.log('Error with poems GET', errorMakingQuery);
                        res.sendStatus(501);
                        done();
                        return;
                    }
                });
            }
            done();
            res.sendStatus(200);
        }
    });

});



// SELECTING ALL -- WILL THAT HURT PERFORMANCE? -- 
// Answer: Yes. It's 420,000 rows, and it takes a couple seconds. Don't do this.
router.get('/random', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            console.log(err);
        } else {
            let random_indices = [];
            // Just multiplying by 3 to try to avoid blanks:
            for (let i = 0; i < RANDOM_LENGTH * 3; i++) {
                // It's so many I won't even worry about possibility of duplicates for now:
                random_indices.push(Math.floor(Math.random() * 422920));
            }

            let resultRows = [];

            // Not sure why we can't check against resultRows.length ... Oh well, we'll just clip it on the client side:
            while (random_indices.length > 0) {
                const popped = random_indices.pop();
                var queryText = `SELECT line_id, line, author, title, lineno FROM lines JOIN poems ON poems.poem_id=lines.poem_id WHERE line_id = ${popped};`;
                db.query(queryText, [], function (errorMakingQuery, result) {
                    if (errorMakingQuery) {
                        console.log('Error with poems GET', errorMakingQuery);
                        done();
                        res.sendStatus(501);
                    } else {
                        // console.log("RESULTS: ", result.rows[0]);
                        if (result.rows[0].line != '') {
                            resultRows.push(result.rows[0]);
                        }
                    }
                });
            }

            // Oooh it must be some async problem...Duh. Just super hack for now:
            setTimeout(() => {
                done();
                res.send(resultRows);
            }, 500);

        }
    });
});


router.get('/term/:term', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            console.log(err);
        } else {
            // Still imperfect: for instance 'ass' gets 'assaulting'.
            var queryText = `SELECT line_id, line, author, title, lineno FROM lines JOIN poems ON poems.poem_id=lines.poem_id WHERE line LIKE '% ${req.params.term}%';`;
            db.query(queryText, [], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error with poems GET', errorMakingQuery);
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.get('/feed', function (req, res) {
    pool.connect(function (err, db, done) {
        if (err) {
            console.log(err);
        } else {
            // Unsure whether issue was quote marks (unlikely) or wrong ordering of JOIN clause (likely):
            var queryText = `SELECT user_poem_id, user_poems.author as author, user_poems.title as title, lines.line as line, poems.author as original_author, poems.title as original_title, lines.lineno as original_lineno FROM user_poems JOIN lines ON lines.line_id = user_poems.original_line_id JOIN poems ON poems.poem_id = lines.poem_id;`;
            db.query(queryText, [], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error with poems GET', errorMakingQuery);
                    res.sendStatus(501);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});


module.exports = router;