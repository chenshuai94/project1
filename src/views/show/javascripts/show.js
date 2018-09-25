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


//放大镜
//鼠标移入下方的小图，对应显示上方的大图
$("#bottom li").mouseover(function(){
    var index = $(this).index();
    $("#small img").eq(index).show().siblings().hide();
    $("#big img").eq(index).show().siblings().hide();
})
//鼠标移入小图显示区，显示大图和遮罩，移出隐藏
$("#small").on({
    "mouseover" : function(){
        $("#big").show();
        $("#mask").show();
    },
    "mouseout" : function(){
        $("#big").hide();
        $("#mask").hide();
    },
    "mousemove" : function(e){
        var e = e || event;
        var x = e.pageX - $("#small").offset().left - $("#mask").width()/2;
        var y = e.pageY - $("#small").offset().top - $("#mask").height()/2;
        //边界处理
        var maxL = $("#small").width() - $("#mask").width();
        var maxT = $("#small").height() - $("#mask").height();
        x = Math.min(maxL,Math.max(0,x));
        y = Math.min(maxT,Math.max(0,y));
        //设置mask的鼠标跟随
        $("#mask").css({"left":x,"top":y});
        //比例关系及大图的偏移：x/y * 大图的宽度或高度/小图显示区的宽度或高度
        var bigImageL = x*$("#big img").width()/$("#small").width();
        var bigImageT = y*$("#big img").height()/$("#small").height();
        //设置大图片的偏移
        $("#big img").css({"left":-bigImageL,"top":-bigImageT});
    }
})