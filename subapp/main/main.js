'use strict';
var popLogoObj = {
    logo_index:0,
    currentSelectEle:null,
    crrtLogo:null
}

//百度搜索
function checkHttps() {
    BaiduHttps.useHttps();
};

function baiduWithHttps(formname) {
    var data = BaiduHttps.useHttps();
    if (data.s === 0) {
        return true;
    } else {
        formname.action = 'https://www.baidu.com/baidu' + '?ssl_s=1&ssl_c' + data.ssl_code;
        return true;
    }
};

//加入收藏
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
//设为首页 <a onclick="SetHome(this,window.location)">设为首页</a>
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl);
    } catch (e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl);
        }
    }
}
$(document).ready(function() {
    /**
     * 初始化链接的翻页
     * @type {Swiper}
     */
    var swiper = new Swiper('.swiper-friendLinks', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 13,
    });

    var Store = {
        C_ADD: "c_add",
        ALL_WEB: "allWeb",
        OFFEN_VISIT: "offenVist",
        getObjByName: function(key) {
            var value = store.get(key);
            if (!value) {
                store.set(key, {});
            }
            return store.get(key);
        },
        setObjByName: function(key, obj) {
            store.set(key, obj);
        },
        setArrByName: function(){
            store.set(key, obj);
        },
        getArrByName: function(key) {
            var value = store.get(key);
            if (!value) {
                store.set(key, []);
            }
            return store.get(key);
        },
        addWeb: function(key, webId, obj) {
            var arr = Store.getObjByName(key);
            arr[webId] = obj;
            // console.log("arr:"+JSON.stringify(arr)+" obj:"+JSON.stringify(obj));
            Store.setObjByName(key, arr);
        }
    };

    /**
     * 添加缓存中的logo
     */
    var addedObjs = Store.getObjByName(Store.C_ADD) || {};
    // $("#custom-add-logo").append('<div class="logo"><a href="'+(decodeURI(_url))+'"><img src="" alt="'+_name+'"></a><i class="triangle"></i></div>');
    var _output_html = '';
    _.forEach(addedObjs, function(value, key) {
        var _url = decodeURI(value.url);
        var _name = value.name;
        console.log("name:" + _name);
        _output_html += ('<div class="logo"><a href="' + _url + '"><img src="" alt="' + _name + '"></a><i class="triangle"></i></div>');
    });
    $("#custom-add-logo").append(_output_html);

    var _param = [];
    _.forEach(addedObjs, function(val, key) {
        _param.push(val);
    })
    console.log("++++++++++++");
    // console.log(JSON.parse(JSON.stringify(_param)));
    
    /**
     * 获取logo
     */
    $.ajax({
        url: '/logo/all',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(_param)
    }).success(function(data) {
        console.log("data length:"+data.length);
        // Store.setArrByName(Store.C_ADD,logos);
        var dataObj = {};
        _.chain(data)
            .map(function(logo){
                dataObj[logo.index] =  logo;
                // console.log("test:"+JSON.stringify(dataObj));
            }).value();

        var storeVal = _.chain(addedObjs)
            .sortBy("index")
            .map(function(web){
                console.log(web);
                web.url = decodeURI(web.url);
                web.target = "b";
                
                web.img = {
                    "url": "",
                    "alt": "",
                    "hover_img": ""
                };
                dataObj[web.index] = web;
            })
            .value();
        // console.log("store:"+JSON.stringify(dataObj));
        // console.log(JSON.stringify(_.values(dataObj)));
        var _constructLogo = function(logos, num) {
            var _logoArr = [],
                len = logos.length,
                a = Math.floor(len / num),
                b = len % num;

            for (var i = 1; i <= a; i++) {
                var logo_part = logos.slice(num * (i - 1), num * i);
                _logoArr.push(logo_part);
            }
            if (b > 0) {
                _logoArr.push(logos.slice(len - b, len));
            }
            return _logoArr;
        };
        var num = 36;
        var logoArr = _constructLogo(_.values(dataObj), num);
        console.log("length:"+logoArr.length);

        $("#logoContainer").html(new EJS({
            url: 'views/logo/logo_part.ejs'
        }).render({
            logoArr: logoArr,
            count: num
        }));
        console.log("success");
    }).error(function() {
        console.log("error");
    }).complete(function() {
        console.log("complete");
    });

    /**
     * 弹出框的相关设置
     */
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        preloader: false,

        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {

                } else {

                }
            }
        }
    });

    $("#a_openPopupLink").click(function(){
        $("#logoContainer").toggleClass('show-triangle');
        /*popLogoObj.logo_index = $("#logoContainer").find(".logo-container").last().find(".logo:last").data("index")+1;
        $("#popup_webName").val("");
        $("#popup_website").val("");
        console.log("old:"+$("#popup_website").val());
        console.log("been clicked:"+popLogoObj.logo_index);*/
    });

    $("#popup_submit").click(function() {
        if (!$("#popup_website").val()) {
            alert("网站地址不能为空");
            return
        }
        if (!$("#popup_webName").val()) {
            alert("网站名称不能为空");
            return
        }
        console.log("submit success index:"+popLogoObj.logo_index);
        var _url = encodeURI($("#popup_website").val());
        var _name = $("#popup_webName").val() || "";
        var _web = {
            "name": _name,
            "url": "http://"+_url,
            "index": popLogoObj.logo_index
        };

        Store.addWeb(Store.C_ADD, _url, _web);
        console.log(Store.getObjByName(Store.C_ADD));
        var _lastIndex = $("#logoContainer").find(".logo-container").last().find(".logo:last").data("index");
        if (popLogoObj.logo_index > _lastIndex) {
            $("#custom-add-logo").append('<div class="logo"><a href=http://"' + (decodeURI(_url)) + '"><img src="" alt="' + _name + '"></a><i class="triangle"></i></div>');
        } else {
            var _aLink = popLogoObj.currentSelectEle.find("a")
            _aLink.attr("href",_web.url);
            _aLink.find("img").attr("alt",_web.name);
        }

        /**
         * 清空输入框
         */
        $("#popup_webName").val('');
        $("#popup_website").val('');
    });
    $("#popup_cancle").click(function() {
        $.magnificPopup.close();
    });
    $("#popup-menus").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        if (_$this.index() == 2) {
            return
        }
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#pop-menu-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
    });

    $("#popup-nav").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#popup-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
    });

    /**
     * [tab页的click事件添加]
     */
    $("#sample").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#sample-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
    });
    $("#sub_sample").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#sub_sample-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
    });
    $("#websites").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        // console.log(_$this.index());
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#archi-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
        // console.log(_$this.html());
    });
    $("#gotoLeft").click(function() {
        var _container = $("#logoContainer");
        var findDiv = _container.find(".logo-container.active");
        var _prev = findDiv.prev(".logo-container");
        if (_prev.length <= 0) {
            console.log("No find next");
            findDiv.removeClass("active");
            _container.find(".logo-container:last").addClass("active");
        } else {
            findDiv.removeClass("active");
            _prev.addClass("active");
        }
    });
    $("#gotoRight").click(function() {
        var _container = $("#logoContainer");
        var findDiv = _container.find(".logo-container.active");
        var _next = findDiv.next(".logo-container");
        if (_next.length <= 0) {
            console.log("No find next");
            findDiv.removeClass("active");
            _container.find(".logo-container:first-child").addClass("active");
        } else {
            findDiv.removeClass("active");
            _next.addClass("active");
        }
    });

    var overlay = {
        pageHeight: function() {
            return document.body.scrollHeight;
        },
        pageWidth: function() {
            return document.body.scrollWidth;
        },
        show: function() {
            $("#overlay").height(overlay.pageHeight());
            $("#overlay").width(overlay.pageWidth());

            // fadeTo第一个参数为速度，第二个为透明度
            // 多重方式控制透明度，保证兼容性，但也带来修改麻烦的问题
            $("#overlay").fadeTo(200, 0.5);

        },
        hide: function() {
            $("#overlay").fadeOut(200);
        }
    };

    $("#logoContainer").delegate(".triangle", "click", function(e) {
        var _$this = $(this);
        console.log(_$this.html());
        var _crrtSelect = _$this.parent(".logo");
        popLogoObj.currentSelectEle = _crrtSelect;
        popLogoObj.logo_index = popLogoObj.currentSelectEle.data("index");
        console.log("logo_index:"+popLogoObj.logo_index);
        var aLink = _crrtSelect.find("a");
        var img = aLink.find("img");
        var val = img.length > 0 ? img.attr("alt") : aLink.find(".l-label").html();
        var _url = (aLink.attr("href")+"").replace(/^https?:\/\//,'');
        /*popLogoObj.crrtLogo = {
            "name": val,
            "url": 
        }*/
        console.log("val:"+val+" img:"+_url);
        $("#popup_webName").val(val);
        $("#popup_website").val(_url);
        $('.open-popup-link').magnificPopup('open');
        // overlay.show();
    });

    $("#gotoNext").click(function(){
        var _$this = $(this);
        var _body = _$this.parent(".cell").parent('.body');
        var _nextBody = _body.next('.body');
        console.log(_body);
        console.log("next:"+_nextBody.length);
        if (_nextBody.length > 0) {
            _nextBody.removeClass('hidden');
        }
    });

    $("#overlay").click(function() {
        overlay.hide();
    });

})
