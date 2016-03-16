var express = require('express');
var fs = require("fs");
var path = require("path");
var url = require("url");

var router = express.Router();

router.get('/', function(req, res) {
    res.redirect('/fd/main.html');
});

router.get('/main.html', function(req, res) {
    console.log("enter in this");
    res.render('freeDocs/main',{
        allDocs: [
            {
                url: "http://pan.baidu.com/s/1skfGFdN",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"65份著名国外建筑设计事务所竞标方案全套高清文本"
            },
            {
                url: "http://pan.baidu.com/s/1sk3xG8P",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_002公共建筑上"
            },
            {
                url: "http://pan.baidu.com/s/1dDJKODz",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_012旅游规划"
            },
            {
                url: "http://pan.baidu.com/s/1hqXRPuk",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_001住宅建筑"
            },
            {
                url: "http://pan.baidu.com/s/1binFlk",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_017城市设计(上)"
            },
            {
                url: "http://pan.baidu.com/s/1eRiL1v0",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_019公共景观与规划（上）"
            },
            {
                url: "http://pan.baidu.com/s/1i4t401B",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_004商业建筑与规划"
            },
            {
                url: "http://pan.baidu.com/s/1gdXTWp9",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"【知筑导航】",
                desc:"中国现代-建筑.景观.规划-方案文本设计精选_010中心城区与城市规划"
            }
        ],
        selectPictures:[
            {
                url: "http://pan.baidu.com/s/1hqY79nm",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"29个博物馆·规划馆·纪念馆·展览馆·世博会建筑CAD施工图源文件"
            },
            {
                url: "http://pan.baidu.com/s/1jHhrcgQ",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"100套别墅图纸带效果图（新农村住宅）"
            },
            {
                url: "http://pan.baidu.com/s/1bkVcPC",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"深圳万科第五园(多套)(1.08G)"
            },
            {
                url: "http://pan.baidu.com/s/1dDPQkQd",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"万科-柏涛楼盘建筑设计精选CAD方案及文本合辑（一）"
            },
            {
                url: "http://pan.baidu.com/s/1o7qCnt4",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"万科-柏涛楼盘建筑设计精选CAD方案及文本合辑（二）"
            },
            {
                url: "http://pan.baidu.com/s/1mhc3du4",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"万科-柏涛楼盘建筑设计精选CAD方案及文本合辑（三）"
            },
            {
                url: "http://pan.baidu.com/s/1JQOSA",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"25套牌坊、牌楼  CAD施工图纸"
            },
            {
                url: "http://pan.baidu.com/s/1kUjWO43",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"300套大中小学幼儿园CAD学校建筑设计+图纸+施工图"
            },
            {
                url: "http://pan.baidu.com/s/1kUyPLll",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"汇景台20套联排别墅施工图纸带效果图"
            },
            {
                url: "http://pan.baidu.com/s/1kUnu91P",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"成都白云渡别墅5套施工图纸带效果图"
            }
        ],
        allModels:[
            {
                url: "http://pan.baidu.com/s/1nuwfxGX",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU商业建筑合集"
            },
            {
                url: "http://pan.baidu.com/s/1c0VZ2fe",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU居住建筑合集"
            },
            {
                url: "http://pan.baidu.com/s/1pJZbkZD",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU教育建筑合集"
            },
            {
                url: "http://pan.baidu.com/s/1nuhSCGx",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU办公建筑合集"
            },
            {
                url: "http://pan.baidu.com/s/1hrcCsq4",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"医疗建筑设计案例模型"
            },
            {
                url: "http://pan.baidu.com/s/1c1f2W6k",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU景观灯水池喷泉合集"
            },
            {
                url: "http://pan.baidu.com/s/1nuc2qdN",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"su雕塑合集"
            },
            {
                url: "http://pan.baidu.com/s/1eQRRgau",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"150款官方模型库桌子与茶几模型"
            },
            {
                url: "http://pan.baidu.com/s/1eQS7lGQ",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"86款SketchUp官方模型库沙发模型"
            }
        ],
        selectMaterial:[
            {
                url: "http://pan.baidu.com/s/1c1oWihM",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"超赞效果图psd"
            },
            {
                url: "http://pan.baidu.com/s/1bnLlO8f",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"分析图psd"
            },
                        {
                url: "http://pan.baidu.com/s/1qXk4aYw",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"户型图psd"
            },
            {
                url: "http://pan.baidu.com/s/1gdPh4rD",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"精选10种建筑风格设计作品实景图片专辑"
            },
            {
                url: "http://pan.baidu.com/s/1c1kSxqS",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"配景psd"
            },
            {
                url: "http://pan.baidu.com/s/1c1rDGcg",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU三维人物模型大全"
            },
            {
                url: "http://pan.baidu.com/s/1hrlzQXQ",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SU3D植物合集"
            },
            {
                url: "http://pan.baidu.com/s/1hribdzu",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"草图大师材质全集 skm版（自行复制到软件安装包里）"
            },
            {
                url: "http://pan.baidu.com/s/1HPMNk",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"Lumion植物扩展40个"
            }
        ],
        softwareCourse:[
            {
                url: "http://pan.baidu.com/s/1ge0ZVqz",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"Revit2014火星教程视频"
            },
            {
                url: "http://pan.baidu.com/s/1bnVtYf9",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"SketchUp建筑设计综合训练视频教程"
            },
            {
                url: "http://pan.baidu.com/s/1hqS1V2c",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"建筑学Photoshop基础教程"
            },
            {
                url: "http://pan.baidu.com/s/1boknguz",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"ID CS6自学入门到高级视频教程"
            },
            {
                url: "",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:""
            },
            {
                url: "http://pan.baidu.com/s/1eQS6kka",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"Adobe Illustrator CS6视频教程"
            },
            {
                url: "http://pan.baidu.com/s/1dDZZ9pn",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"水晶石3DSMAX教程"
            },
            {
                url: "http://pan.baidu.com/s/1o7oAAT0",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"AutoCAD 施工图绘制教程"
            },
            {
                url: "http://pan.baidu.com/s/1nuyhj53",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"iArch_ Rhino系列视频讲座"
            },
            {
                url: "http://pan.baidu.com/s/1hrfuGIw",
                img:"/img/post_11.jpg",
                hoverDesc:"",
                title:"",
                desc:"iArch_vray渲染教程系列讲座"
            }
        ]
    });
});

module.exports = router;
