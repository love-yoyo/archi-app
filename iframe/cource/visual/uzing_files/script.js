;(function($){
		
	$('body').addClass('transition');
	
	//弹出层
	bankheight()
	$(window).resize(function() {//页面窗口大小改变事件
		bankheight();
	});
	function bankheight() {
		var winH = $(window).height();
		var headH = $("#header").outerHeight();
		var bodyH = $("#mainbody").outerHeight();
		var footH = $("#footer").outerHeight();
		var feet = $(".feature").outerHeight();
		var blankH = winH - headH - bodyH - footH - feet;
		if(blankH>0){
			$("#push-to-bottom").height(blankH);	
		}
	}
	
	//悬浮
	/*
	var offsetTop = $(window).height() / 2 - $("#float").outerHeight() / 2 + "px";
	$("#float").css({ top: offsetTop});
	var isIE6 = false;
	if(window.XMLHttpRequest){ //Mozilla, Safari, IE7 
		isIE6 = false;
	}else { 
		isIE6 = true;
	}
	if(isIE6){
		var stayBottom = function () {
			var offsetTop = $(window).scrollTop() + $(window).height() / 2 - $("#float").outerHeight() / 2 + "px";
			$("#float").css({ top: offsetTop});
		};
		$(window).scroll(stayBottom).resize(stayBottom);//在浏览器滚动条变化或大小改变时调用
	}
	$("#float .fclose").click(function(){
		$(this).parent().remove();
	})
	*/
	
	var setFloat = function(){
        var floatIcon = $("#floatIcon"),
            winW = $(window).width(),
            winH = $(window).height(),
            winS = $(window).scrollTop();
        
        if(!window.XMLHttpRequest){
            var offsetTop = winS + winH / 2 - 460 + "px";
            floatIcon.css({ top: offsetTop});
        }

        if(winW < 768){
            floatIcon.fadeOut();
        }else if (winW < 1150){
            floatIcon.fadeIn();
            floatIcon.css({right: 10});
        }else if(winW > 1150){
            floatIcon.fadeIn();
            floatIcon.css({right: (winW - 960)/2 - 140});
        }
    };
    setFloat();
    $(window).resize(setFloat);

    var floatIcon = $("#floatIcon");
    floatIcon.find("li").hover(function(){
       $(this).find("p").stop(true).fadeIn();
    },function(){
        $(this).find("p").stop(true).fadeOut();
    });
    
    $("#gotop").click(function(){
        $('body,html').animate({scrollTop:0},500);
        return false;
    });
	
})(jQuery);

//TAB切换
function tabs(obj, nav, cont, cur, type){
	var c = cont;
	var obj = $(obj),
	nav = $(nav,obj),
	cont = $(cont,obj);
	
	nav.first().addClass(cur);
	cont.first().show();
	
	nav.each(function(index) {
        if(type == 'hover'){
			$(this).mouseover(function(){
				$(this).addClass(cur).siblings().removeClass(cur);
				cont.eq(index).show().siblings(c).hide();
			});	
		}else{
			$(this).click(function(){
				$(this).addClass(cur).siblings().removeClass(cur);
				cont.eq(index).show().siblings(c).hide();
			});	
		}
    });
}

//设置图片最大宽高
var flag=false;
function SetImage(ImgD,width,Height){
	var image=new Image();
	image.src=ImgD.src;
	if(image.width>0 && image.height>0){
		flag=true;
		if(image.width/image.height>=width/Height){
			if(image.width>width){
				ImgD.width=width;
				ImgD.height=(image.height*width)/image.width;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}else{
			if(image.height>Height){
				ImgD.height=Height;
				ImgD.width=(image.width*Height)/image.height;
			}else{
				ImgD.width=image.width;
				ImgD.height=image.height;
			}
		}
	}
}