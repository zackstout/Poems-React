
var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  database: 'poems',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const RANDOM_LENGTH = 10;

var pool = new pg.Pool(config);
console.log('router in');

// POST Route
router.post('/', function (req, res) {
   
    
}); 



// SELECTING ALL -- WILL THAT HURT PERFORMANCE? -- 
// Answer: Yes. It's 420,000 rows, and it takes a couple seconds. Don't do this.
router.get('/random', function (req, res) {
    pool.connect(function(err, db, done) {
        if (err) {
          console.log(err);
        } else {
          let random_indices = [];
          // Just multiplying by 3 to try to avoid blanks:
          for (let i=0; i < RANDOM_LENGTH * 3; i++) {
              // It's so many I won't even worry about possibility of duplicates for now:
              random_indices.push(Math.floor(Math.random() * 422920));
          }

          let resultRows = [];

          // Not sure why we can't check against resultRows.length ... Oh well, we'll just clip it on the client side:
          while (random_indices.length > 0) {
            const popped = random_indices.pop();
            // console.log(popped);
            var queryText = `SELECT line_id, line, author, title, lineno FROM lines JOIN poems ON poems.poem_id=lines.poem_id WHERE line_id = ${popped};`;
            db.query(queryText, [], function (errorMakingQuery, result) {
              if (errorMakingQuery) {
                console.log('Error with poems GET', errorMakingQuery);
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
            // console.log("rows: ", resultRows);
            done();
            res.send(resultRows);
          }, 500);

        }
      });
}); 


router.get('/term/:term', function (req, res) {
    pool.connect(function(err, db, done) {
        if (err) {
          console.log(err);
        } else {
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


module.exports = router;