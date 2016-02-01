var express = require('express');
var cheerio = require("cheerio");
var fs = require("fs");
var path = require("path");
var url = require("url");

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/main');
});

router.get('/main.html', function(req, res) {
    res.redirect('/main');
});

router.get('/main', function(req, res) {
    res.render('main/main');
});

router.get('/h5/nav', function(req, res) {
    console.log("current dir:" + __dirname);

    console.log("is inner:" + isInner(req));
    var navFilePath = '';
    if (isInner(req)) {
        navFilePath = '../public/json/nav-internal.json';
    } else {
        navFilePath = '../public/json/nav-external.json';
    }

    // var navFilePath =  '../public/json/nav-external.json';
    // var navFilePath =  '../public/json/nav-common.json';
    try {
        /**
         * 读取相应的json配置文件，
         * TODO: 根据访问权限的不同设置不同的navFilePath
         */
        var data = fs.readFileSync(path.join(__dirname, navFilePath));

        /**
         * [重组导航数据]
         * @param  {Json} data [JSON格式的导航内容]
         * @return {Object}    [重组JSON的数据格式，已 nav_i 为key进行分组]
         */
        var refactData = function(data) {
            var _keys = {};
            var jsonObj = JSON.parse(data);
            for (var i = 0, size = jsonObj.length; i < size; i++) {
                var item = jsonObj[i];

                var _type = item.type;
                var _k = _keys[_type];
                if (!_k) {
                    _keys[_type] = [];
                }
                _keys[_type].push(item);
            }
            return _keys;
        };

        var _keys = refactData(data);
        // console.log(JSON.stringify(_keys));

        /**
         * 处理重新构造好的数据,
         * 初始化“全局变量”
         */
        var $ = "";
        var _li_pre = "li_",
            _ul_pre = "ul_",
            ulArr = {};

        var _class_add = "bp-icon-plus",
            _class_hidden = "bp-nav-hidden";
        var i = 0;

        /**
         * 处理nav_i里面的数组
         * 示例结构：
         * [{
                    "id": "",
                    "type": "nav_0",
                    "title": "",
                    "url": "",
                    "liArr": [{
                        "id": "",
                        "title": "",
                        "ref_ulId": ""
                    }]
                },
                ...
            }]
         */
        while (_keys['nav_' + i]) {
            var len = _keys['nav_' + i].length; //获取当前 nav_i 里面的数据长度

            /**
             * 通过循环 nav_i 里面的长度依次获取其中的对象
             * 示例结构：
             * {
                    "id": "",
                    "type": "nav_0",
                    "title": "",
                    "url": "",
                    "liArr": [{
                        "id": "",
                        "title": "",
                        "ref_ulId": ""
                    }]
                }
             */
            for (var m = 0; m < len; m++) {
                var _crrtNav = _keys['nav_' + i][m]; //获取index为m的 nav_i 的对象
                if (!_crrtNav) { //如果当前的 nav_i 对象为空，则跳出循环
                    continue;
                }
                /**
                 * 当前对象不为空执行下述操作
                 */
                var crrtUl = ""; //当前ul对象，可以在它下面添加li
                if (i === 0) {
                    /**
                     * 如果 i==0 表示当前对象为root元素，考虑到多个初始元素，
                     * 所以只初始化一次 $ ，id为 nav_0 的id
                     */
                    $ = $ || cheerio.load('<ul class="bp-nav bp-nav0" id="' + (_crrtNav.id) + '"></ul>', {
                        decodeEntities: false
                    }); //decodeEntities处理中文乱码
                    crrtUl = $('#' + (_crrtNav.id));
                } else {
                    /**
                     * 不是初始元素，根据id= _ul_pre + _crrtNav['id'] 设置当前的ul
                     */
                    var _ulId = _ul_pre + _crrtNav.id;
                    crrtUl = $("#" + _ulId);
                }
                /**
                 * 获取li的数组，并在当前的crrtUl下添加这些这些li
                 */
                var _liArr = _crrtNav.liArr;
                if (_liArr && _liArr.length > 0) {
                    for (var n = 0; n < _liArr.length; n++) {
                        var _crrtLi = _liArr[n]; //index=n的li

                        if (_crrtLi) { //当前对象存在执行下述操作
                            var liId = _li_pre + _crrtLi.id; //li的id
                            /**
                             * 为当前的crrtUl添加li对象
                             */
                            crrtUl.append('<li id="' + liId + '"><a href="' + (_crrtLi.url || "") + '" target="' + (_crrtLi.target || "bp-iframe") + '">' + ((_crrtLi.title + "") || "&nbsp;") + '</a></li>');

                            /**
                             * 如果当前li有下一级导航，获取ref_ulId 即对应ul对象的id
                             */
                            if (_crrtLi.ref_ulId) {
                                var ulId = _ul_pre + _crrtLi.ref_ulId; //ul的id

                                /**
                                 * 构建ul对象并添加到当前的li元素之下
                                 */
                                var _ulStr = '<ul class="bp-nav ' + _class_hidden + ' bp-nav' + (i + 1) + '" id="' + ulId + '"></ul>';
                                $("#" + liId).append(_ulStr).addClass(_class_add);
                            }
                        }
                    }
                }
            }
            i++;
        }
        console.log("*************************************");
        console.log($.html());
        console.log("*************************************");

        res.send($.html());
    } catch (err) {
        console.log(err);
        throw (err);
    }
});

router.get('/h5/document', function(req, res) {
    res.redirect('/docs/h5/document/hello');
});


router.get('/h5/document/*', function(req, res) {
    var pathName = url.parse(req.url).pathname;
    console.log('pathname:' + pathName);
    var pathArr = pathName.split('/');

    var jsondata = fs.readFileSync(path.join(__dirname, '../dist/json/doc/' + pathArr[pathArr.length - 1]+'.json'));
    var refactData = function(data) {
        var _keys = {};
        var jsonObj = JSON.parse(data);
        return jsonObj;
    };
    console.log(jsondata);
    var _data = refactData(jsondata);
    console.log(JSON.stringify(_data));
    res.render('h5-doc-tpl',_data);
    // res.send('test');
});

module.exports = router;
