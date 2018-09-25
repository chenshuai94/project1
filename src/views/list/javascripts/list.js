var loginBtn = document.querySelector("#btn");
	var txtName = document.querySelector("#uname");
	var txtPwd = document.querySelector("#upwd");
	loginBtn.onclick = function(){
        //获取cookie
        var str = getCookie("userlist");
        var arr = JSON.parse( str );
		var cookieName = arr[0].username;
		var cookiePwd = arr[0].userpwd;
		//获取用户输入的用户名和密码 :
		var tname = txtName.value;
		var tpwd = txtPwd.value;
            if( cookieName == tname && cookiePwd == tpwd && tpwd){
                alert("登录成功");
                location.href="/index/index.html";
            }else{
                alert("用户名或密码错误");
            }      	
    }
    
    function getCookie(key){
        var str = document.cookie;
        if( str ){ //如果cookie存在  根据key取对应的值
            str = str.replace( /\s/g ,"");//去掉cookie中的空格
            var arr = str.split(";");//将字符串拆成数组
            for( var i = 0 ; i < arr.length ; i++ ){
                var item = arr[i].split("=");
                if( item[0] == key ){
                    return item[1];
                }
            }
            //循环结束后 如果没有找到对应的key   返回""
            return "";
        }
        //cookie 不存在  返回""
        return "";
    }


