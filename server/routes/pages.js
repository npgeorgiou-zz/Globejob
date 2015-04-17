var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var http = require('http');

/* GET login page. */
router.get('/', function (req, res) {
    res.redirect("app/views/login.html")
});

/* GET jobs page. */
router.get('/jobs', function (req, res) {
    res.redirect("app/views/main.html")
});


//comment for got push
module.exports = router;
