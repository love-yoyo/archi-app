'use strict';
var express = require('express');
var cheerio = require("cheerio");
var fs = require("fs");
var path = require("path");
var url = require("url");
const low = require('lowdb');
const storage = require('lowdb/file-sync');
const _ = require("lodash");
const db = low('db/logo.json', {
    storage
});

let router = express.Router();

router.get("/logo", function(req, res) {
    console.log("enter in add logo");
    let param = req.body;
    console.log("param:"+JSON.stringify(param));
    let _findLogo = db('logos').find({url:param.url});
    if (_findLogo) {
        res.send({"errorCode":"001","errorMsg":"地址已存在"});
    } else {
        res.send("success");
        console.log("start push value");
    }
    /*let logoArr = [];
    for (let i = 0; i < 40; i++) {
        db('logos').push({
            "name": "",
            "url": "http://www.iarch.cn/",
            "target": "b",
            "index": i,
            "img": {
                "url": "img/logo/l" + (Math.round(Math.random()) + 1) + ".png",
                "alt": "",
                "hover_img": ""
            }
        });
    }*/
    // db('logos').push(logoArr);
});

router.post('/all', function(req, res) {
    console.log("current dir:" + __dirname);
    console.log("REQ BODY:" + JSON.stringify(req.body));
    let _param = req.body;
    let r_logos = null;
    r_logos = _.clone(db("logos").chain().value());
    res.send(r_logos);
    return;

    if (_.isEmpty(_param)) {
        console.log("it's empty");
        r_logos = _.clone(db("logos").chain().value());
    } else {
        r_logos = _.chain(_param)
            .sortBy("index")
            .map(function(web) {
                web.url = uridecoe(web.href);
                web.target = "b",
                web.img = {
                    "url": "",
                    "alt": "",
                    "hover_img": ""
                };
                return web
            })
            .value();
    }
    console.log("logs.length:"+r_logos.length);
    console.log(r_logos);
    /*let logos = _.clone(db("logos").chain().value());
    // console.log("logos:"+JSON.stringify(logos));
    logos = _.chain(logos)
        .map(function(logo){
            return {
                [logo.url]:logo
            }
        }).value();
    console.log("-------------------");
    _param = _.chain(_param)
        .map(function(web){
            web.url = uridecoe(web.href);
            web.target = "b",
            web.img = {
                "url": "",
                "alt": "",
                "hover_img": ""
            };
            logos[url] && (logo[url]==web);
            return {
                [web.url]:web
            }
        }).value();
    // console.log("lgo:"+JSON.stringify(logos));
    // console.log("param:"+JSON.stringify(_param));
    logos = _.assign(logos,_param);

    let r_logos = [];
    let len = logos.length;
    for (let i = 0; i < len; i++) {
        let c_logo = logos[i];
        if (i+1<len) {
            let n_logo = logos[i+1];
            if (c_logo == n_logo) {
                continue;
            }
            r_logos.push(c_logo);
        }
    };

    console.log("TEST:"+JSON.stringify(logos));
    return;*/
    
    /*let _constructLogo = function(logos, num) {
        let _logoArr = [],
            len = logos.length,
            a = Math.floor(len / num),
            b = len % num;

        for (let i = 1; i <= a; i++) {
            let logo_part = logos.slice(num * (i - 1), num * i);
            _logoArr.push(logo_part);
        }
        if (b > 0) {
            _logoArr.push(logos.slice(len - b, len));
        }
        return _logoArr;
    };
    let num = 36;
    let logoArr = _constructLogo(r_logos, num);
    console.log(JSON.stringify(logoArr));

    res.render("logo/logo_part", {
        logoArr: logoArr,
        count: num
    });

    return;*/
});

router.get('/h5/document', function(req, res) {
    res.redirect('/docs/h5/document/hello');
});


router.get('/h5/document/*', function(req, res) {
    var pathName = url.parse(req.url).pathname;
    console.log('pathname:' + pathName);
    var pathArr = pathName.split('/');

    var jsondata = fs.readFileSync(path.join(__dirname, '../dist/json/doc/' + pathArr[pathArr.length - 1] + '.json'));
    var refactData = function(data) {
        var _keys = {};
        var jsonObj = JSON.parse(data);
        return jsonObj;
    };
    console.log(jsondata);
    var _data = refactData(jsondata);
    console.log(JSON.stringify(_data));
    res.render('h5-doc-tpl', _data);
    // res.send('test');
});

module.exports = router;
