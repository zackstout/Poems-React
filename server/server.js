
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var poems = require('./routes/poems.router.js');
var port = process.env.PORT || 3000;

console.log('server'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));

/** ---------- EXPRESS ROUTES ---------- **/
app.use('/poems', poems);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});
