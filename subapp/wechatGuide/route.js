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
    /*for (var i=0;i<40;i++) {
        var _b = i+1;
        if (i+1<10) {
            _b = "0"+(_b);
        }
        var a =    {
          "name": "",
          "url": "",
          "index": i,
          "img": {
            "url": "/img/wechat/hot/0"+_b+".png",
            "alt": "",
            "hover_img": "/img/wechat_hover/hot/0"+_b+"web.png",
            "title":"世界最受欢迎的建筑网站"
          }
        }
        _logos.push(a);
    }*/
    const db = low('db/wechat/hot.json', {
        storage
    });
    var _logos = _.clone(db("logos").chain().value());
    res.render('wechatGuide/main',{
        logos: _logos
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
