var express = require('express');
var fs = require("fs");
var path = require("path");
var url = require("url");

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/ac/main.html');
});

router.get('/main.html', function(req, res) {
    console.log("enter in this");
    res.render('wechatGuide/main');
});

module.exports = router;
