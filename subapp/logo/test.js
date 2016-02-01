var cheerio = require("cheerio");
const low = require('lowdb');
const storage = require('lowdb/file-sync');
const _ = require("lodash");

for (var i=0;i<10000000000000;i++) {
    const db = low('../../db/userIndex/u'+(Math.floor(i/1000))+'.json', {
        storage
    });
    db("data").push(i);
}
return;
var a = db("logos").find({"url":"http://www.iarch2.cn/"});
console.log("TEST:"+JSON.stringify(a));
var logos = _.clone(db("logos").chain().value());
var _logos = _.chain(logos)
    .map(function(logo) {
        return {
            [logo.url]: logo
        }
    })
    .value();
// console.log("TEST:" + JSON.stringify(_logos));


/*var a = {
    "test0": {
        "url": "http://www.tes",
        "index": "0",
        "img": {
            "url": "img1.png",
            "target": "b"
        },
        "name": "ceshi"
    },
    "test1": {
        "url": "http://www.tes",
        "index": "1",
        "img": {
            "url": "img1.png",
            "target": "b"
        },
        "name": "ceshi"
    },
    "test2": {
        "url": "http://www.tes",
        "index": "2",
        "img": {
            "url": "img1.png",
            "target": "b"
        },
        "name": "ceshi"
    }
}
var b = {
    "test4": {
        "name": "value",
        "index": 2
    }
}
var c = _.assign(a, b);
c = _.chain(c).sortBy("index").value();
console.log(JSON.stringify(c));
*/