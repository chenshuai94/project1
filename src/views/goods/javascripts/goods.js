// // 吸顶效果
// var h = 130;
// var nav = document.querySelector("#bar");
// window.onscroll = function(){
//     var sTop = document.documentElement.scrollTop || document.body.scrollTop;
//     if( sTop > h ){
//         nav.style.position = "fixed";
//         nav.style.top = 0;
//     }else{
//         nav.style.position = "static";
//     }
// }

//选项卡
window.onload = function(){
    new CheckCard().init();
}
function CheckCard(){
    this.alist = document.getElementsByClassName("check");
    this.clist = document.getElementsByClassName("contener");
    this.init = function(){
        for(let i = 0;i < this.alist.length;i ++){
            this.alist[i].onmouseenter = function(){
                this.clear();
                this.show(i);
            }.bind(this)
            this.alist[i].onmouseleave = function(){
                this.clear();
                this.hide(i);
            }.bind(this)
            this.clist[i].onmouseenter = function(){
                this.clear();
                this.show(i);
            }.bind(this)
            this.clist[i].onmouseleave = function(){
                this.clear();
                this.hide(i);
            }.bind(this)
        }
    }
    this.clear =function(){
        for(var i = 0;i < this.alist.length;i ++){
            this.clist[i].style.display = "none";
        }
    }
    this.show = function(index){
        this.clist[index].style.display = "block";
    }
    this.hide = function(index){
        this.clist[index].style.display = "none";
    }
}

// //获取数据到页面
window.onload = function(json){
    $.ajax({
        type:"get",
        url:"/json/data.json?id=" + new Date().getTime(),
        datatype:"json",
        success:function(json){
            var con = "";
            for(var item in json){
                for(var i = 0;i<json[item].length;i ++){
                   var pro = json[item][i];
                   con += `<a target="_blank" class="prod " href="/show/show.html" style="height: 424px;">
                                <div class="img_wrapper">
                                    <div style="width: 270px;height: 270px;overflow: hidden;" class="warp-img">
                                    <img src="/images/${pro.src}" alt="" style="overflow: hidden;width:90%;" >
                                    </div>
                                </div>
                                <div class="pro_name">${pro.name}</div>
                                <div class="money" style="display: block;">
                                <span class="original">¥${pro.price}</span>
                                                            </div>
                           </a>`
                }
            }
            $("#content").html(con);
        }
    })
}