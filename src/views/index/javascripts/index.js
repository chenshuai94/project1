//楼梯效果
var $list = $("#LoutiNav li:not(.last)");
	var $floor = $(".Louti");
	var flag = true; //假设为真时，滚动条可以操作了
	$list.click(function(){
		flag = false;
		$(this).find("span")
			   .addClass("active")
			   .end()
			   .siblings()
			   .find("span")
			   .removeClass();
			   //获取当前点击的li的下标
			   var index = $(this).index();
			   //找到对应的下标对应的楼梯，获取top距离
			   var t = $floor.eq(index).offset().top-80;
			   //设置页面滚走距离
			   $("body,html").animate({"scrollTop" : t},1000,function(){
			   	  flag = true;
			   });
	})
	$(".last").click(function(){
		$list.find("span").removeClass("active");
		$("body,html").animate({"scrollTop" : 0},1000);
	})
	$(window).scroll(function(){
		if(flag){
			var sTop = $(document).scrollTop();
			//条件：当前楼梯top - 页面滚走距离 < 当前楼梯高度的一半
			var $f = $floor.filter(function(){
				return Math.abs($(this).offset().top - sTop) < $(this).height()/2;
			})
			var index = $f.index();
			if(index != -1){
				$list.eq(index).find("span")
				               .addClass("active")
				               .end()
				               .siblings()
				               .find("span")
				               .removeClass("active");
			}
			if(sTop < 100){
				$list.find("span").removeClass("active");
			}
		}
	})


// 吸顶效果
var h = 130;
var nav = document.querySelector("#bar");
window.onscroll = function(){
    var sTop = document.documentElement.scrollTop || document.body.scrollTop;
    if( sTop > h ){
        nav.style.position = "fixed";
        nav.style.top = 0;
    }else{
        nav.style.position = "static";
    }
}

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


//轮播效果
var timer = null;
var index = 0;
var $ulist = $(".uls li");
var $olist = $(".ols li");
timer = setInterval(autoPlay,3000);
function autoPlay(){
    index ++;
    if( index == $ulist.size() ){
        index = 0;
    }
    $olist.eq(index).addClass("ol_first").siblings().removeClass("ol_first");
    $ulist.eq(index).fadeIn(500).siblings().fadeOut(500);
}
$olist.mouseenter(function(){
    clearInterval(timer);
    index = $(this).index() - 1;
    autoPlay();
}).mouseleave(function(){
    timer = setInterval(autoPlay,3000);
})