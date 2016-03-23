// JavaScript Document
//验证手机号码
function sendSmsYzTel() {
    var Mobile = $("#tel").val();
    if(Mobile==''){
        $('#yzteltag').css('color','red');
        $('#yzteltag').text('请输入手机号码');
        return ;
    }
    $.get('index.php',{r:Math.random(),a:'ajax',mod:'checkmobile','mobile':Mobile},function(data){
        if ($.trim(data)=='yes') {
            $('#yzteltag').css('color','red');
            $('#yzteltag').text('你要验证的手机号码已经有人注册或已验证，请核实号码或与管理员联系');
//            $('#isexistsMobile').text('no');

            return ;
        }else if($.trim(data)=='sucessed') {
            $('#yzteltag').css('color','#864E11');
            $('#yzteltag').text('验证短信已发出，收到后请填入验证码！');
          //  $('#isexistsMobile').text('yes');
            $("#tel").attr("readonly","readonly")
        } else {
            $('#yzteltag').css('color','#864E11');
            $('#yzteltag').text('发送失败，请检查您的号码是否输入有误！');
        //    $('#isexistsMobile').text('no');
            return ;
        }
    });
}

//手机短信验证 注册

function sendSmsYz() {
    var Mobile = $("#Mobile").val();
    $.get('index.php',{r:Math.random(),a:'ajax',mod:'checkmobile','mobile':Mobile},function(data){
        if ($.trim(data)=='yes') {
            $('#reginfoRegMobile').css('color','red');
            $('#reginfoRegMobile').text('你要申请注册的手机已被注册');
            $('#isexistsMobile').text('no');
            return ;
        }else if($.trim(data)=='sucessed') {
            $('#reginfoRegMobile').css('color','#864E11');
            $('#reginfoRegMobile').text('验证短信已发出，收到后请填入验证码！');
            $('#isexistsMobile').text('yes');
            $("#Mobile").attr("readonly","readonly")
        } else {
            $('#reginfoRegMobile').css('color','#864E11');
            $('#reginfoRegMobile').text('发送失败，请检查您的号码是否输入有误！');
            $('#isexistsMobile').text('no');
            return ;
        }
    });
}


//静止输入特殊字符 除了 @ .
function stripScript(str) {
    var pattern = new RegExp("[%--`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——| {}【】‘；：”“'。，、？]")        //格式 RegExp("[在中间定义特殊过滤字符]")
    var s = str.value;
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs+s.substr(i, 1).replace(pattern, '');
    }
    str.value = rs;
}

//弹窗 邮箱用户名注册验证
function checkFormRegEmail(frm) {
    if (frm.usernameRegEmail.value=="") {
        isregEmail();
        frm.usernameRegEmail.focus();
        return false;
    }
    if (frm.emailRegEmail.value=="") {
        isemialEmail();
        frm.emailRegEmail.focus();
        return false;
    }
    if (frm.passwordRegEmail.value=="") {
        ispasswordEmail();
        frm.passwordRegEmail.focus();
        return false;
    }
    if (frm.repasswordRegEmail.value=="") {
        isrepadEmail();
        frm.repasswordRegEmail.focus();
        return false;
    }
    if(!document.getElementById("checkboxidRegEmail").checked){
        alert("请先同意活力网服务条款!");
        frm.checkboxidRegEmail.focus();
        return false;
    }
}

function isregEmail() {
    if ($.trim($('#usernameRegEmail').val())=='') {
        $('#reginfoRegEmail').css('color','red');
        $('#reginfoRegEmail').text('请填写您的用户名');
        $('#isexistsEmail').text('yes');
        return ;
    } else {
        var usernameRegEmail=$.trim($('#usernameRegEmail').val());
        $.get('index.php',{r:Math.random(),a:'ajax',mod:'register','username':usernameRegEmail},function(data){
            if ($.trim(data)=='yes') {
                $('#reginfoRegEmail').css('color','red');
                $('#reginfoRegEmail').text('该用户已经被注册，请重新选择一个');
                $('#isexistsEmail').text('yes');
                return ;
            } else {
                $('#reginfoRegEmail').css('color','#864E11');
                $('#reginfoRegEmail').text('恭喜您，此用户可以注册');
                $('#isexistsEmail').text('no');
                return ;
            }
        });
    }
}
function ispasswordEmail() {
    if ($.trim($('#passwordRegEmail').val())=='') {
        $('#reginfoRegEmail').css('color','red');
        $('#reginfoRegEmail').text('请填写您的密码');
        $('#isexistsEmail').text('yes');
        return ;
    } else{

        if ($('#passwordRegEmail').val().length < '6'){
            $('#reginfoRegEmail').css('color','red');
            $('#reginfoRegEmail').text('注册密码不能小于6位');
            $('#isexistsEmail').text('yes');
            return ;
        } else {
            $('#reginfoRegEmail').css('color','#864E11');
            $('#reginfoRegEmail').text('可以注册');
            $('#isexistsEmail').text('no');
            return ;
        }
    }
}

function isrepadEmail() {
    if ($.trim($('#repasswordRegEmail').val())=='') {
        $('#reginfoRegEmail').css('color','red');
        $('#reginfoRegEmail').text('请输入重复密码');
        $('#isexistsEmail').text('yes');
        return ;
    } else {

        if ($.trim($('#repasswordRegEmail').val())!=$.trim($('#passwordRegEmail').val())){
            $('#reginfoRegEmail').css('color','red');
            $('#reginfoRegEmail').text('注册密码和确认密码必须相同');
            $('#isexistsEmail').text('yes');
            return ;
        } else {
            $('#reginfoRegEmail').css('color','#864E11');
            $('#reginfoRegEmail').text('恭喜您，输入密码相同');
            $('#isexistsEmail').text('no');
            return ;
        }
    }
}


function isemialEmail() {

    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    var email = document.getElementById("emailRegEmail");
    if ($.trim($('#emailRegEmail').val())=='') {
        $('#reginfoRegEmail').css('color','red');
        $('#reginfoRegEmail').text('请正确输入邮箱');
        $('#isexistsEmail').text('yes');
        return ;
    }else if(!myreg.test(email.value)) {
        $('#reginfoRegEmail').css('color','red');
        $('#reginfoRegEmail').text('请填写正确的邮箱');
        $('#isexistsEmail').text('yes');
        return ;
    }else{
        var emials=$.trim($('#emailRegEmail').val());
        $.get('index.php',{r:Math.random(),a:'ajax',mod:'checkemail','email':emials},function(data){
            if ($.trim(data)=='yes') {
                $('#reginfoRegEmail').css('color','red');
                $('#reginfoRegEmail').text('该邮箱已经被注册，请重新选择一个邮箱');
                $('#isexistsEmail').text('yes');
                return ;
            } else {
                $('#reginfoRegEmail').css('color','#864E11');
                $('#reginfoRegEmail').text('恭喜您，此邮箱可以注册');
                $('#isexistsEmail').text('no');
                return ;
            }
        });
    }
}


//弹窗 手机用户名注册验证
function checkFormRegMobile(frm) {
    if (frm.usernameRegMoblie.value=="") {
        isregMoblie();
        frm.usernameRegMoblie.focus();
        return false;
    }
    if (frm.Moblie.value=="") {
        isMoblie();
        frm.Moblie.focus();
        return false;
    }
    if (frm.passwordRegMoblie.value=="") {
        ispasswordMoblie();
        frm.passwordRegMoblie.focus();
        return false;
    }
    if (frm.repasswordRegMoblie.value=="") {
        isrepadMoblie();
        frm.repasswordRegMoblie.focus();
        return false;
    }
    if(!document.getElementById("checkboxidRegMoblie").checked){
        alert("请先同意活力网服务条款!");
        frm.checkboxidRegMoblie.focus();
        return false;
    }
}

function isregMobile() {
    if ($.trim($('#usernameRegMobile').val())=='') {
        $('#reginfoRegMobile').css('color','red');
        $('#reginfoRegMobile').text('请填写您的用户名');
        $('#isexistsMoblie').text('yes');
        return ;
    } else {
        var usernameRegMobile=$.trim($('#usernameRegMobile').val());
        $.get('index.php',{r:Math.random(),a:'ajax',mod:'register','username':usernameRegMobile},function(data){
            if ($.trim(data)=='yes') {
                $('#reginfoRegMobile').css('color','red');
                $('#reginfoRegMobile').text('该用户已经被注册，请重新选择一个登录名');
                $('#isexistsMoblie').text('yes');
                return ;
            } else {
                $('#reginfoRegMobile').css('color','#864E11');
                $('#reginfoRegMobile').text('恭喜您，此用户可以注册');
                $('#isexistsMoblie').text('no');
                return ;
            }
        });
    }
}
function isMobile() {
   // preg_match("/1[3458]{1}\d{9}$/",$v['member_mobile'])
  //  var myreg = /^1\d{10}$/
    var myreg = /^1[3458]{1}\d{9}$/
 //   var myreg = /^1([3458]{1}+[0-9]{9})$/;
   // var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var Mobile = document.getElementById("Mobile");
    if ($.trim($('#Mobile').val())=='') {
        $('#reginfoRegMobile').css('color','red');
        $('#reginfoRegMobile').text('请正确输入手机号码');
        $('#isexistsMobile').text('yes');
        return ;
    }else if(!myreg.test(Mobile.value)) {
        $('#reginfoRegMobile').css('color','red');
        $('#reginfoRegMobile').text('请填写正确的手机号码');
        $('#isexistsMobile').text('yes');
        return ;
    }else{
        var Mobiles=$.trim($('#Mobile').val());
        $.get('index.php',{r:Math.random(),a:'ajax',mod:'checkmobile','mobile':Mobiles},function(data){
            if ($.trim(data)=='yes') {
                $('#reginfoRegMobile').css('color','red');
                $('#reginfoRegMobile').text('该手机号码已经被注册，请重新选择一个');
                $('#isexistsMobile').text('yes');
                return ;
            } else {
                $('#reginfoRegMobile').css('color','#864E11');
                $('#reginfoRegMobile').text('恭喜您，此手机号码可以注册');
                $('#isexistsMobile').text('no');
                return ;
            }
        });
    }
}

function ispasswordMobile() {
    if ($.trim($('#passwordRegMobile').val())=='') {
        $('#reginfoRegMobile').css('color','red');
        $('#reginfoRegMobile').text('请填写您的密码');
        $('#isexistsMoblie').text('yes');
        return ;
    } else{

        if ($('#passwordRegMobile').val().length < '6'){
            $('#reginfoRegMobile').css('color','red');
            $('#reginfoRegMobile').text('注册密码不能小于6位');
            $('#isexistsMoblie').text('yes');
            return ;
        } else {
            $('#reginfoRegMobile').css('color','#864E11');
            $('#reginfoRegMobile').text('可以注册');
            $('#isexistsMoblie').text('no');
            return ;
        }
    }
}

function isrepadMobile() {
    if ($.trim($('#repasswordRegMobile').val())=='') {
        $('#reginfoRegMobile').css('color','red');
        $('#reginfoRegMobile').text('请输入重复密码');
        $('#isexistsMoblie').text('yes');
        return ;
    } else {

        if ($.trim($('#repasswordRegMobile').val())!=$.trim($('#passwordRegMobile').val())){
            $('#reginfoRegMobile').css('color','red');
            $('#reginfoRegMobile').text('注册密码和确认密码必须相同');
            $('#isexistsMoblie').text('yes');
            return ;
        } else {
            $('#reginfoRegMobile').css('color','#864E11');
            $('#reginfoRegMobile').text('恭喜您，输入密码相同');
            $('#isexistsMoblie').text('no');
            return ;
        }
    }
}



//单页面注册验证
function isreg() {
	if ($.trim($('#username').val())=='') {
		$('#reginfo').css('color','red');
		$('#reginfo').text('请填写您的用户名');
		$('#isexists').text('yes');
		return ;
	} else {
		var username=$.trim($('#username').val());
		$.get('index.php',{r:Math.random(),a:'ajax',mod:'register','username':username},function(data){
			if ($.trim(data)=='yes') {
				$('#reginfo').css('color','red');
				$('#reginfo').text('该用户已经被注册，请重新选择一个登录名');
				$('#isexists').text('yes');
				return ;
			} else {
				$('#reginfo').css('color','#864E11');
				$('#reginfo').text('恭喜您，此用户可以注册');
				$('#isexists').text('no');
				return ;
			}
		});
	}
}

function ispassword() {
	if ($.trim($('#password').val())=='') {
		$('#regpass').css('color','red');
		$('#regpass').text('请填写您的密码');
		$('#isexists').text('yes');
		return ;
	} else{
		
		if ($('#password').val().length < '6'){
				$('#regpass').css('color','red');
				$('#regpass').text('注册密码不能小于6位');
				$('#isexists').text('yes');
				return ;
			} else {
				$('#regpass').css('color','#864E11');
				$('#regpass').text('可以注册');
				$('#isexists').text('no');
				return ;
			}
		}
}

function isrepad() {
	if ($.trim($('#repassword').val())=='') {
		$('#regpad').css('color','red');
		$('#regpad').text('请输入重复密码');
		$('#isexists').text('yes');
		return ;
	} else {
		
			if ($.trim($('#repassword').val())!=$.trim($('#password').val())){
				$('#regpad').css('color','red');
				$('#regpad').text('注册密码和确认密码必须相同');
				$('#isexists').text('yes');
				return ;
			} else {
				$('#regpad').css('color','#864E11');
				$('#regpad').text('恭喜您，输入密码相同');
				$('#isexists').text('no');
				return ;
			}
	}
}


function isemial() {
	
	 var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/; 	
	
	var email = document.getElementById("email");
	if ($.trim($('#email').val())=='') {
		$('#regemail').css('color','red');
		$('#regemail').text('请正确输入邮箱');
		$('#isexists').text('yes');
		return ;
	}else if(!myreg.test(email.value)) {
	   $('#regemail').css('color','red');
       $('#regemail').text('请填写正确的邮箱');
	   $('#isexists').text('yes');
	  return ;
	}else{
		var emials=$.trim($('#email').val());
		$.get('index.php',{r:Math.random(),a:'ajax',mod:'checkemail','email':emials},function(data){
			if ($.trim(data)=='yes') {
				$('#regemail').css('color','red');
				$('#regemail').text('该邮箱已被注册，请重新选择一个邮箱');
				$('#isexists').text('yes');
				return ;
			} else {
				$('#regemail').css('color','#864E11');
				$('#regemail').text('恭喜您，此邮箱可以注册');
				$('#isexists').text('no');
				return ;
			}
		});
	}
}

function isrealname() {
	if ($.trim($('#realname').val())=='') {
		$('#regrealname').css('color','red');
		$('#regrealname').text('请填写手机号');
		$('#isexists').text('yes');
		return ;
	} else {
				$('#regrealname').css('color','#864E11');
				$('#regrealname').text('');
				$('#isexists').text('no');
				return ;
		}
}


function iscode() {
	if ($.trim($('#yzcode').val())=='') {

		$('#reginfod').css('color','red');
		$('#reginfod').text('请输入验证码。');
		$('#isexists').text('yes');
		return ;
			
	} else {
		
		$.get('index.php',{r:Math.random(),a:'ajax',mod:'checkcode','yzcode':$.trim($('#yzcode').val())},function(data){
			if ($.trim(data)=='yes') {
				$('#reginfod').css('color','red');
				$('#reginfod').text('验证码不正确。');
				$('#isexists').text('yes');
				return ;
			} else {
				$('#reginfod').css('color','#864E11');
				$('#reginfod').text('输入正确。');
				$('#isexists').text('no');
				return ;
			}
		});
	}
}





//删除购物车商品
function delcart(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}

	arr = {"userid":userid,"pid":pid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'delcart','userid':userid,'pid':pid},function(d)
			{
				if($.trim(d) == 1)
				{
					alert('删除成功！');
					window.location.reload();
					return;
				}
				else if($.trim(d) == 2)
				{
					alert('删除失败！');
					return;
				}

			}
		);
}
//立即购买 升级
function buycart0(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
    if(userid <= 0)
    {
        alert('请登录后再执行此操作！');
        location.href="?mod=login"
        return;
    }
    $.get('index.php',{r:Math.random(),a:'ajax',mod:'buycart0','userid':userid,'pid':pid},function(d)
        {
            if($.trim(d) == 1)
            {
                window.parent.location.href="?mod=paystep"
                return;
            }

            else if($.trim(d) == 2)
            {
                alert('订阅失败！');
                return;
            }
        }

    );
}
//立即购买
function buycart(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作！');
		location.href="?mod=login"
		return;
	}
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'buycart','userid':userid,'pid':pid},function(d)
			{
				if($.trim(d) == 1)
				{
					window.parent.location.href="?mod=order_list"
					return;
				}
		
				else if($.trim(d) == 2)
				{
					alert('订阅失败！');
					return;
				}
			}
			
		);
}

//积分兑换
function addexchang(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		location.href="?mod=login"
		return;
	}
	arr = {"userid":userid,"pid":pid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'addexchang','userid':userid,'pid':pid},function(d)
			{
				if($.trim(d) == 1)
				{
					location.href="?mod=paystep"
					return;
				}
		
				else if($.trim(d) == 2)
				{
					alert('您的积分不足,不能兑换此产品！');
					return;
				}
			}
			
		);
}



//加入购物车
function addcart(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		location.href="?mod=login"
		return;
	}
	arr = {"userid":userid,"pid":pid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'addcart','userid':userid,'pid':pid},function(d)
			{
				 if($.trim(d) ==1)
				{
					alert('加入购物车成功！');
					return;
				}
				else if($.trim(d) ==2)
				{
					alert('加入购物车失败！');
					return;
				}
			}
			
		);
}


//更新购物车
function chgAmount(pid,userid,quantity)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}
	arr = {"userid":userid,"pid":pid,"quantity":quantity};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'ChangeAmount','userid':userid,'pid':pid,'quantity':quantity},function(d)
			{
				if($.trim(d) == 1)
				{
					alert('产品数量必须大于1！');
					location.reload();
					return;
				}
		
				else if($.trim(d) == 2)
				{
					location.reload();
					return;
				}
			}
			
		);
}

//清空购物车
function delallorder(userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作！');
		return;
	}
	arr = {"userid":userid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'delallorder','userid':userid},function(d)
			{
				if($.trim(d) == 1)
				{
					alert('购物车已清空！');
					location.reload();
					return;
				}
		
				else if($.trim(d) == 2)
				{
					alert('购物车清空失败！');
					return;
				}
			}
			
		);
}


//添加购物数量
function addamount(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}
    var quantity = $("#quantity").val();
	arr = {"userid":userid,"pid":pid,"quantity":quantity};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'addamount','userid':userid,'pid':pid,'quantity':quantity},function(d)
			{
			   if($.trim(d) == 1)
				{
					alert('数量必须有一个！');
					location.reload();
					return;
				}
		
				else if($.trim(d) == 2)
				{
					location.reload();
					return;
				}
			}
			
		);
}

//减购物数量
function delamount(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}
    var quantity = $("#quantity").val();
	arr = {"userid":userid,"pid":pid,"quantity":quantity};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'delamount','userid':userid,'pid':pid,'quantity':quantity},function(d)
			{
			   if($.trim(d) == 1)
				{
					alert('数量必须有一个！');
					location.reload();
					return;
				}
		
				else if($.trim(d) == 2)
				{
					location.reload();
					return;
				}
			}
			
		);
}

//删除订单
function delbill(pid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}

	arr = {"userid":userid,"pid":pid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'delbill','userid':userid,'pid':pid},function(d)
			{
				if($.trim(d) == 1)
				{
					alert('删除成功！');
					window.location.reload();
					return;
				}
				else if($.trim(d) == 2)
				{
					alert('删除失败！');
					return;
				}

			}
		);
}


//加入收藏
function joinfavo(pid,did,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}

	$.get('index.php',{r:Math.random(),a:'ajax',mod:'joinfavo','userid':userid,'pid':pid,'did':did},function(d)
			{
				//返回值  1->成功  2->已经参加		3->失败	
				if($.trim(d) == 1)
				{
					alert('收藏成功！');
					return;
				}
				else if($.trim(d) == 2)
				{
					alert('已经收藏过该课程！');
					return;
				}
		
				else if($.trim(d) == 3)
				{
					alert('收藏失败！');
					return;
				}
			}
			
		);
}



//加入关注
function joinfocus(brid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}

	arr = {"userid":userid,"brid":brid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'joinfocus','userid':userid,'brid':brid},function(d)
			{
				//返回值  1->成功  2->已经参加		3->失败	
				if($.trim(d) == 1)
				{
					alert('关注成功！');
					window.location.reload();
					return;
				}
				else if($.trim(d) == 2)
				{
					alert('已经关注过该品牌！');
					return;
				}
		
				else if($.trim(d) == 3)
				{
					alert('关注失败！');
					return;
				}
			}
			
		);
}





//删除收藏
function delfavo(pid,did,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}

	$.get('index.php',{r:Math.random(),a:'ajax',mod:'delfavo','userid':userid,'pid':pid,'did':did},function(d)
			{
				if($.trim(d) == 1)
				{
					alert('删除成功！');
					window.location.reload();
					return;
				}
				else if($.trim(d) == 2)
				{
					alert('删除失败！');
					return;
				}

			}
		);
}

//删除关注
function delfocus(brid,userid)	//pid -> 活动ID	userid -> 操作者
{
	if(userid <= 0)
	{
		alert('请登录后再执行此操作');
		return;
	}

	arr = {"userid":userid,"brid":brid};
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'delfocus','userid':userid,'brid':brid},function(d)
			{
				if($.trim(d) == 1)
				{
					alert('删除成功！');
					window.location.reload();
					return;
				}
				else if($.trim(d) == 2)
				{
					alert('删除失败！');
					return;
				}

			}
		);
}




//产品属性价格
function changePrice(pid,attid,id,kid)	
{
	var hide_id = $("#hide_id_"+kid).val();
	$("#dd_"+kid+"_"+hide_id).removeClass("ccb");
	$("#dd_"+kid+"_"+id).addClass("ccb");
	$("#hide_id_"+kid).val(id);
	$("#attr_info"+kid).val(attid);
	arr = {"attid":attid,"pid":pid};
	var obj = $(".maik").children(".aa");
	var str = '';
	for (var i = 0;i < obj.length;i++){ 
		str = str + $("#attr_info"+obj[i].value).val() + ",";
	}
	$.get('index.php',{r:Math.random(),a:'ajax',mod:'get_attr_amount','attid':attid,'pid':pid,'str':str},function(d)
			{
			$("#goods_amoumt").html(d);
			return;
			}
		);
}


//选择配送
function selectShipping(yunfei,price)	
{
	total = price + yunfei;
	total = total.toFixed(2);
	$("#yunfei").html(total);
	$("#total").val($(this).attr("total"));
}


