
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

var pool = new pg.Pool(config);
console.log('router in');

// POST Route
router.post('/', function (req, res) {
   
    
}); 

// GET Route
router.get('/', function (req, res) {
    pool.connect(function(err, db, done) {
        if (err) {
          console.log(err);
        } else {
          var queryText = "SELECT line, author, title, lineno FROM lines JOIN poems ON poems.id=lines.poem_id WHERE line LIKE '% water%';";
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