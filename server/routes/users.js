var express = require('express');
var router = express.Router();
var http = require('http');

var endOfLine = require('os').EOL;

/* POST new user */
router.post('/', function (req, res) {
    var createdUser = req.body;
    var fs = require('fs');

    fs.appendFile(__dirname + "/users.log", JSON.stringify(createdUser) + endOfLine, {'flags': 'a+'}, function (err) {
        if (err) {
            return console.log(err);
        } else {

            console.log("The file was saved!");
            res.end("OK");
        }
    });
});


/* GET all users */
router.get('/all', function (req, res) {
    var fs = require('fs')
    fs.readFile(__dirname + '/users.log', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        res.header("Content-type", "application/json");
        res.end(data);
    });
});


//comment for got push
module.exports = router;
