'use strict';
/*$("img.lazy").lazyload({
    effect: "fadeIn", 
    threshold : 100,
    placeholder: "/img/loding.gif",
    skip_invisible : false
});
*//*$("img.lazy").unveil();*/

var isLife = false;

var popLogoObj = {
    logo_index:0,
    currentSelectEle:null,
    crrtLogo:null,
    originLogos:null
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
    setTimeout(function(){
        $("img.lazy").lazyload({
            effect: "fadeIn", 
            // placeholder: "/img/loding.gif",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
            failure_limit : 10,
            threshold : 200,
            skip_invisible : false
        });
    },1500);
    

    /**
     * 初始化链接的翻页
     * @type {Swiper}
     */
    new Swiper('.ad-container-1 .swiper-container', {
        pagination: '.swiper-pagination-1',
        paginationClickable: true,
        autoplay: 3000,
        autoplayDisableOnInteraction: false
    });

    new Swiper('.swiper-friendLinks', {
        pagination: '.swiper-pagination-2',
        paginationClickable: true,
        spaceBetween: 6,
        autoplay: 5000,
        autoplayDisableOnInteraction: false
    });

    var Store = {
        C_ADD: "c_add",
        C_ADD_LIFE: "c_add_life",
        ALL_WEB: "allWeb",
        OFFEN_VISIT: "offenVist",
        OFFEN_VISIT_LIFE: "offenVistLife",
        getAddKey: function(){
            return isLife ? Store.C_ADD_LIFE : Store.C_ADD
        },
        getOffenVisitKey: function(){
            return isLife ? Store.OFFEN_VISIT_LIFE : Store.OFFEN_VISIT
        },
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
        setArrByName: function(key, obj) {
            store.set(key, obj);
        },
        getArrByName: function(key) {
            var value = store.get(key);
            if (!value || !_.isArray(value)) {
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
     * 获取logo
     */
    $.ajax({
        url: '/logo/all',
        type: 'POST',
        contentType: "application/json;charset=UTF-8",
        data: ""
    }).success(function(data) {
        isLife = false;
        console.log("data length:"+data.length);
        // Store.setArrByName(Store.C_ADD,logos);
        popLogoObj.originLogos = data;
        var _data = _.clone(data);
        var dataObj = {};
        _.chain(_data)
            .map(function(logo){
                dataObj[logo.index] =  logo;
                // console.log("test:"+JSON.stringify(dataObj));
            }).value();
        var addedObjs = Store.getArrByName(Store.getAddKey());
        var storeVal = _.chain(addedObjs)
            .sortBy("index")
            .map(function(web){
                console.log(web);
                web.url = web.url;
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
        var _timing = 0;

        $(".logo").mouseover(function(){

            console.log("been hover");
            var _this = $(this);
            
            clearTimeout(_timing);
            _timing = setTimeout(function(){
                console.log("previewLength:"+$(".web-preview.active").length);
                if (!$("#logoContainer").hasClass("show-triangle")) {
                    var _find = _this.find(".web-preview");
                    console.log("len:"+_find.find("img").attr("class")+" image:"+_find.data("hover_image"));
                    _find.find("img").attr("src",_find.data("hover_image"));
                    var _a = _this.find("a");
                    var _containerWidth = $("#logoContainer").width();
                    var _containerHeight = $("#logoContainer").height();
                    var _left = _a.offset().left;
                    var _top = _a.offset().top;
                    var _itemWidth = _a.width();
                    console.log("left:"+_left+" top:"+_top+" itemWidth:"+_itemWidth+" container:"+_containerWidth);
                    if (_find.length>0) {
                        _find.addClass("active");
                        console.log("der:"+parseFloat(_containerWidth-_left-_itemWidth));
                        var itemLeft = parseFloat(_containerWidth-_left-_itemWidth)<350 ? -360 : 100;
                        // var itemTop = _containerHeight<400 ? -400 : 0;
                        _find.css({
                            left: itemLeft,
                            top: 0
                        })
                        
                    } else {
                       // _this.append("<div class='web-preview'>"+_this.find("a").attr("href")+"</div>"); 
                    }
                } else {
                    //do nothing
                }
            },500);
        }).mouseout(function(){
            
            setTimeout(function(){
                $(".web-preview.active").removeClass("active");
            },500)
            
        });

        $("#logoContainer").mouseout(function(){
            $(".web-preview.active").removeClass("active");
        });
        $("#logoContainer img.lazy").lazyload({
            effect:"fadeIn", 
            // placeholder: "/img/loding.gif",
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
            failure_limit : 10,
            threshold : 200,
            skip_invisible : false
        });
        
        /*$("img.lazy").unveil();*/
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
            },
            open: function() {
                console.log("open popoup window");
                var _offenVisit = Store.getArrByName(Store.getOffenVisitKey());
                var _offenVisit = _.chain(_offenVisit).sortBy("num").reverse().value();
                _offenVisit = _.slice(_offenVisit,0,14);
                console.log("take:"+JSON.stringify(_offenVisit));
                $("#pop_offen_nav_items").html(new EJS({
                    text:'<% for (var i=0;i<offenVisit.length;i++){'
                            +'var _item = offenVisit[i];'
                        +'%>'
                            +'<li data-name="<%=_item.name%>" data-url="<%=_item.url%>"><%=_item.name%></li>'
                        +'<% } %>'}).render({
                            offenVisit:_offenVisit
                        })
                );
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

    /**
     * [Popup window btn click event]
     */
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
        var _url = $("#popup_website").val();
        _url = _url.indexOf("http") == 0 ? _url : "http://"+_url;
        var _name = $("#popup_webName").val() || "";
        var _web = {
            "name": _name,
            "url": _url,
            "domain": _url.replace(/^https?:\/\//,''),
            "index": popLogoObj.logo_index
        };
        
        var _lastIndex = $("#logoContainer").find(".logo-container").last().find(".logo:last").data("index");
        if (popLogoObj.logo_index > _lastIndex) {
            $("#custom-add-logo").append('<div class="logo"><a href="' + _url + '"><img src="" alt="' + _name + '"></a><i class="triangle"></i></div>');
        } else {
            if ( (popLogoObj.crrtLogo.name==$("#popup_webName").val()) && (popLogoObj.crrtLogo.url==$("#popup_website").val()) ) {
                alert("请修改网站名称或地址！");
                return;
            }
            var _addWEB = Store.getArrByName(Store.getAddKey());
            var _find = _.chain(_addWEB).find({url:_url}).value();
            if (_find) {
                _find = _web
            } else {
                _addWEB.push(_web);
                Store.setArrByName(Store.getAddKey(),_addWEB);
            }
            var _crrtSelect = popLogoObj.currentSelectEle;
            _crrtSelect.html(new EJS({
                text:'<a href="<%= url %>" target="<%= target %>">'
                    +'<% if (img && img.url) {%>'
                    +'<img src="<%= img.url%>" alt="<%=(name||"")%>" >'
                    +'<% } else {%>'
                    +'<span class="l-label"><%=(name || "")%></span>'
                    +'<% } %>'
                +'</a>'
                +'<i class="triangle"></i>'}).render({
                    url: _web.url,
                    target: "_blank",
                    name: _web.name,
                    img:null
                }));
        }

        /**
         * 清空输入框
         */
        $("#popup_webName").val('');
        $("#popup_website").val('');
        $.magnificPopup.close();
    });
    $("#popup_default").click(function(){
        var _logoIndex = popLogoObj.logo_index;
        console.log("logoIndex:"+_logoIndex);
        var _addWeb = Store.getArrByName(Store.getAddKey());
        if (_addWeb && _.isArray(_addWeb) && _addWeb.length>0) {
            console.log("start remove");
            console.log("before:"+JSON.stringify(_addWeb));
            _.chain(_addWeb).remove({index:parseInt(_logoIndex)}).value();
            console.log("removeValue:"+JSON.stringify(_addWeb));
            Store.setArrByName(Store.getAddKey(),_addWeb);
        }
        var _originLogos = popLogoObj.originLogos;
        // console.log("originLogo:"+JSON.stringify(_originLogos));
        var _matchLogo = _originLogos[_logoIndex];
        console.log("matchLogo:"+JSON.stringify(_matchLogo));
        var _crrtSelect = popLogoObj.currentSelectEle;
            _crrtSelect.html(new EJS({
                text:'<a href="<%= url %>" target="<%= target %>">'
                        +'<% if (img && img.url) {%>'
                        +'<img src="<%= img.url%>" alt="<%=(name||"")%>" >'
                        +'<% } else {%>'
                        +'<span class="l-label"><%=(name || "")%></span>'
                        +'<% } %>'
                    +'</a>'
                    +'<i class="triangle"></i>'}).render({
                        url: _matchLogo.url,
                        target: "_blank",
                        name: _matchLogo.name,
                        img:_matchLogo.img
                    }));
        $.magnificPopup.close();
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
    $("#archi_websites").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        // console.log(_$this.index());
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#archi-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
        // console.log(_$this.html());
    });
    $("#life_websites").delegate("li", "click", function(e) {
        e.preventDefault();
        var _$this = $(this);
        // console.log(_$this.index());
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#life-tab-" + (_$this.index())).addClass("active").siblings(".active").removeClass("active");
        // console.log(_$this.html());
    });
    $("#pop_offen_nav_items").delegate("li","click",function(e){
        e.preventDefault();
        var _$this = $(this);
        _$this.addClass('active').siblings(".active").removeClass('active');
        $("#popup_webName").val(_$this.data("name"));
        $("#popup_website").val(_$this.data("url"));
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

    /**
     * [Edited model]
     */
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
        var _url = (aLink.attr("href")+"");
        popLogoObj.crrtLogo = {
            "name": val,
            "url": _url
        }
        console.log("val:"+val+" img:"+_url);
        $("#popup_webName").val(val);
        $("#popup_website").val(_url.replace(/^https?:\/\//,''));
        $('.open-popup-link').magnificPopup('open');
        // overlay.show();
    });
    /**
     * [recode the time of which link been clicked]
     */
    $("#logoContainer").delegate("a","click",function(e){
        var _this = $(this);
        var nodeName = e.target.nodeName;
        console.log(nodeName);
        var _url = _this.attr("href");
        _url = _url.indexOf("http")==0 ? _url : "http://"+_url;
        if (_this.parent(".show-triangle").length<1) {
            var _offenVisit = Store.getArrByName(Store.getOffenVisitKey());
            var _find = _.chain(_offenVisit).find({url:_url}).value();
            console.log("FIND:"+JSON.stringify(_find));
            if (_find) {
                 _find.num ++;
                 Store.setArrByName(Store.getOffenVisitKey(), _offenVisit);
            } else {
                var img = _this.find("img");
                var name = img.length > 0 ? img.attr("alt") : aLink.find(".l-label").html();
                _offenVisit.push({
                    url: _url,
                    name: name,
                    num: 0
                });
                console.log(JSON.stringify(_offenVisit));
                Store.setArrByName(Store.getOffenVisitKey(), _offenVisit);
            }
        }
    });



    $(".gotoNext").click(function(){
        var _$this = $(this);
        var _body = _$this.parent(".cell").parent('.body');
        var _nextBody = _body.next('.body');
        console.log("next:"+_nextBody.length);
        if (_nextBody.length > 0) {
            _$this.toggleClass('active');
            _nextBody.toggleClass('hidden');
        }
    });

    $("#overlay").click(function() {
        overlay.hide();
    });

    $("#searchBtn").hover(function(){
        var _this = $(this);
        var _left = _this.offset().left;
        console.log(_left);
        var _menu = _this.siblings(".dropdown-menu");
        _menu.css({
            display:"block",
            left: _left+"px"
        })
    });

    $("#searchBtn+.dropdown-menu").delegate("li","click",function(){
        var _this = $(this);
        var _val = _this.find("a").html().trim();
        $("#searchBtn").val(_val);
        $(".dropdown-menu").css({
            display: "none"
        });
        var _map = {
            "百度":{
                url:"https://www.baidu.com/baidu",
                qName:"word"
            },
            "搜狗":{
                url:"https://www.sogou.com/web",
                qName:"query"
            },
            "必应":{
                url:"https://www.bing.com/search",
                qName:"q"
            },
            "谷歌":{
                url:"https://www.google.com/search",
                qName:"q"
            },
            "淘宝":{
                url:"https://s.taobao.com/search",
                qName:"q"
            }
        }
        $("#searchBtn").parent("form").attr("action",_map[_val].url);
        $("#searchBtn").siblings('.s-middle-input').attr("name",_map[_val].qName);
    });
    /*$("#searchBtn+.dropdown-menu li").hover(function(){
        var _this = $(this);
        $("#searchBtn").val(_this.find("a").html().trim());
    });*/
    $("#searchBtn+.dropdown-menu").hover(function(){

    },function(){
        $(this).hide();
    });


    /**
     * 生活导航
     */
    $("#lifeGuideBtn").click(function(){
        $.ajax({
            url: '/logo/life/all',
            type: 'POST',
            contentType: "application/json;charset=UTF-8",
            data: ""
        }).success(function(data) {
            isLife = true;
            $("#lifeGuideBtn").addClass('hidden');
            $("#archiGuideBtn").removeClass('hidden');
            $("#archiWebsiteSection").addClass('hidden');
            $("#lifeWebsiteSection").removeClass('hidden');

            console.log("data length:"+data.length);
            // Store.setArrByName(Store.C_ADD,logos);
            popLogoObj.originLogos = data;
            var _data = _.clone(data);
            var dataObj = {};
            _.chain(_data)
                .map(function(logo){
                    dataObj[logo.index] =  logo;
                    // console.log("test:"+JSON.stringify(dataObj));
                }).value();
            var addedObjs = Store.getArrByName(Store.getAddKey());
            var storeVal = _.chain(addedObjs)
            .sortBy("index")
            .map(function(web){
                console.log(web);
                web.url = web.url;
                web.target = "b";
                web.img = {
                    "url": "",
                    "alt": "",
                    "hover_img": ""
                };
                dataObj[web.index] = web;
            })
            .value();
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
            var _timing = 0;

            $(".logo").mouseover(function(){

                console.log("been hover");
                var _this = $(this);
                
                clearTimeout(_timing);
                _timing = setTimeout(function(){
                    console.log("previewLength:"+$(".web-preview.active").length);
                    if (!$("#logoContainer").hasClass("show-triangle")) {
                        var _find = _this.find(".web-preview");
                        console.log("len:"+_find.find("img").attr("class")+" image:"+_find.data("hover_image"));
                        _find.find("img").attr("src",_find.data("hover_image"));
                        var _a = _this.find("a");
                        var _containerWidth = $("#logoContainer").width();
                        var _containerHeight = $("#logoContainer").height();
                        var _left = _a.offset().left;
                        var _top = _a.offset().top;
                        var _itemWidth = _a.width();
                        console.log("left:"+_left+" top:"+_top+" itemWidth:"+_itemWidth+" container:"+_containerWidth);
                        if (_find.length>0) {
                            _find.addClass("active");
                            console.log("der:"+parseFloat(_containerWidth-_left-_itemWidth));
                            var itemLeft = parseFloat(_containerWidth-_left-_itemWidth)<350 ? -360 : 100;
                            var itemTop = _containerHeight<400 ? -400 : 0;
                            _find.css({
                                left: itemLeft,
                                top: itemTop
                            })
                            
                        } else {
                           // _this.append("<div class='web-preview'>"+_this.find("a").attr("href")+"</div>"); 
                        }
                    } else {
                        //do nothing
                    }
                },500);
            }).mouseout(function(){
                
                setTimeout(function(){
                    $(".web-preview.active").removeClass("active");
                },500)
                
            });

            $("#logoContainer").mouseout(function(){

                $(".web-preview.active").removeClass("active");
            });
            $("#logoContainer img.lazy").lazyload({
                effect:"fadeIn", 
                failure_limit : 10,
                threshold : 200,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                skip_invisible : false
            });
            console.log("success");
        }).error(function() {
            console.log("error");
        }).complete(function() {
            console.log("complete");
        });
    });

    /**
     * 建筑导航
     */
    $("#archiGuideBtn").click(function(){
        $.ajax({
            url: '/logo/all',
            type: 'POST',
            contentType: "application/json;charset=UTF-8",
            data: ""
        }).success(function(data) {
            isLife = false;
            $("#lifeGuideBtn").removeClass('hidden');
            $("#archiGuideBtn").addClass('hidden');
            $("#archiWebsiteSection").removeClass('hidden');
            $("#lifeWebsiteSection").addClass('hidden');

            console.log("data length:"+data.length);
            // Store.setArrByName(Store.C_ADD,logos);
            popLogoObj.originLogos = data;
            var _data = _.clone(data);
            var dataObj = {};
            _.chain(_data)
                .map(function(logo){
                    dataObj[logo.index] =  logo;
                    // console.log("test:"+JSON.stringify(dataObj));
                }).value();
            var addedObjs = Store.getArrByName(Store.getAddKey());
            var storeVal = _.chain(addedObjs)
                            .sortBy("index")
                            .map(function(web){
                                console.log(web);
                                web.url = web.url;
                                web.target = "b";
                                web.img = {
                                    "url": "",
                                    "alt": "",
                                    "hover_img": ""
                                };
                                dataObj[web.index] = web;
                            })
                            .value();
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
            var _timing = 0;

            $(".logo").mouseover(function(){

                console.log("been hover");
                var _this = $(this);
                
                clearTimeout(_timing);
                _timing = setTimeout(function(){
                    console.log("previewLength:"+$(".web-preview.active").length);
                    if (!$("#logoContainer").hasClass("show-triangle")) {
                        var _find = _this.find(".web-preview");
                        console.log("len:"+_find.find("img").attr("class")+" image:"+_find.data("hover_image"));
                        _find.find("img").attr("src",_find.data("hover_image"));
                        var _a = _this.find("a");
                        var _containerWidth = $("#logoContainer").width();
                        var _containerHeight = $("#logoContainer").height();
                        var _left = _a.offset().left;
                        var _top = _a.offset().top;
                        var _itemWidth = _a.width();
                        console.log("left:"+_left+" top:"+_top+" itemWidth:"+_itemWidth+" container:"+_containerWidth);
                        if (_find.length>0) {
                            _find.addClass("active");
                            console.log("der:"+parseFloat(_containerWidth-_left-_itemWidth));
                            var itemLeft = parseFloat(_containerWidth-_left-_itemWidth)<350 ? -360 : 100;
                            var itemTop = _containerHeight<400 ? -400 : 0;
                            _find.css({
                                left: itemLeft,
                                top: itemTop
                            })
                            
                        } else {
                           // _this.append("<div class='web-preview'>"+_this.find("a").attr("href")+"</div>"); 
                        }
                    } else {
                        //do nothing
                    }
                },500);
            }).mouseout(function(){
                
                setTimeout(function(){
                    $(".web-preview.active").removeClass("active");
                },500)
                
            });

            $("#logoContainer").mouseout(function(){

                $(".web-preview.active").removeClass("active");
            });
            $("#logoContainer img.lazy").lazyload({
                effect:"fadeIn", 
                failure_limit : 10,
                threshold : 200,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                skip_invisible : false
            });
            console.log("success");
        }).error(function() {
            console.log("error");
        }).complete(function() {
            console.log("complete");
        });
    });

});

