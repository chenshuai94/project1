var oForm = document.querySelector("form");
//手机号验证
var rUser = null;
$id("phone").onblur = function(){
    var strUser = $id("phone").value;
    var reg = /^1[3578]\d{9}$/;//手机号正则
    
    if( !reg.test( strUser ) ){
        $id("s1").innerHTML = "请输入正确的手机号";
        $id("s1").style.color = "red";
        rUser = false;
        }else{
            $id("s1").innerHTML = "";
            rUser = true;
    }
}

//密码和确认密码
var rPwd = null;
$id("pwd").onblur = function(){
    var strPwd = $id("pwd").value;
    var regPwd = /^\w{6,20}$/;//密码正则
    
    if(!regPwd.test(strPwd)){
        $id("s2").innerHTML = "密码格式不正确";
        $id("s2").style.color = "red";
        rPwd = false;
    }else{
        $id("s2").innerHTML = "";
        rPwd = true;
    }
}
//确认密码
$id("qpwd").onblur = function(){
    var strqPwd = $id("qpwd").value;
    var strPwd = $id("pwd").value;
    if(strqPwd !=""){
        if(strqPwd == strPwd ){
            $id("s3").innerHTML = "";
        }else{
            $id("s3").innerHTML = "两次密码不一致";
            $id("s3").style.color = "red";
        }
    }
}

//姓名
var rName = null;
$id("name").onblur = function(){
    var strName = $id("name").value;
    var regName = /^[\u4e00-\u9fa5]{2,4}$/; //姓名正则
    
    if(!regName.test(strName)){
        $id("s4").innerHTML = "必须为2-4位汉字组成";
        $id("s4").style.color = "red";
        rName = false;
    }else{
        $id("s4").innerHTML = "";
        rName = true;
    }
}

//注册提交
oForm.onsubmit = function(e){
    var e = e.preventDefault();
    if(!rName){
        return false;
    }else{
        // return true;
        alert("注册成功!");
        // location.href = "/list/list.html";
    }
}

//cookie
//注册功能
var saveBtn = document.querySelector("#btn");
var txtName = document.querySelector("#phone");
var txtPwd = document.querySelector("#pwd");
var arr = []; //[{},{},{},{},...] 
saveBtn.onclick = function(){
    var strName = txtName.value;
    var strPwd = txtPwd.value;
    //将用户名和密码作为整体对象 存入到数组中
    arr.push( {
        "username":strName,
        "userpwd":strPwd
    } )
    
    JSON.stringify()
    //将数组存入到cookie中
    var now = new Date();
	now.setDate( now.getDate() + 10 );
    document.cookie = "userlist=" + JSON.stringify( arr )+";expires="+now + ";Path=" + escape("/");
    //location.href = "/list/list.html";
    

}
function $id(id){
	return document.getElementById(id);
}