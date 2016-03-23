var express = require('express');
var fs = require("fs");
var path = require("path");
var url = require("url");
const low = require('lowdb');
const storage = require('lowdb/file-sync');
const _ = require("lodash");

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/ac/main.html');
});

router.get('/main.html', function(req, res) {
    console.log("enter in this");
    var _logos = [];

    const db = low('db/wechat/hot.json', {
        storage
    });
    const db_article = low('db/wechat_article.json', {
        storage
    });
    const db_popular = low('db/wechat_popular.json', {
        storage
    });
    var _logos = _.clone(db("logos").chain().value()),
        _articles = _.clone(db_article("article").chain().value()),
        _popular = _.clone(db_popular("popular").chain().value());

    res.render('wechatGuide/main',{
        logos: _logos,
        articles: _articles,
        popular: _popular
    });
});

router.get("/logo",function(req, res){
    console.log(req.query);
    var _id = req.query.ref || 1;
    var _map = {
        "1":"hot",
        "2":"magazine",
        "3":"news",
        "4":"farce",
        "5":"travel",
        "6":"designCreate",
        "7":"designOrg",
        "8":"share",
        "9":"cource",
    }
    const db = low('db/wechat/'+_map[_id]+'.json', {
        storage
    });
    var _logos = _.clone(db("logos").chain().value());
    res.render('logo/wechat_logo',{
        logos: _logos
    });
})

module.exports = router;
