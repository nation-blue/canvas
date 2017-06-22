//游戏主控制流程
var canvas = document.querySelector("canvas");

//开始界面
var hxt = document.querySelector(".hxt");
var go = document.querySelector(".go");
var gameStart = document.querySelector(".gameStart");
var game = new Game();
go.onclick = function() {
	hxt.style.display = "none";
	gameStart.style.display = "block";
	game.play();
}


//商店切换背景
var store = document.querySelector(".store")
var store_bg = document.querySelector("#store")
var s_img1 = document.querySelector("#store .img1")
var s_img1_img = document.querySelector("#store .img1 img")
var s_img2 = document.querySelector("#store .img2")
var s_img2_img = document.querySelector("#store .img2 img")
store.onclick = function(){
	store_bg.style.cssText = "width: 600px;height: 400px; opacity: 1;";
	setTimeout(function(){
		s_img1.style.cssText = "opacity: 1;"
		s_img2.style.cssText = "opacity: 1;"
	},500)
}
s_img1.onclick = function(){
	s_img1_img.classList.add("a");
	s_img2_img.classList.remove("a");
	canvas.classList.add("s_img1_img")
	canvas.classList.remove("s_img2_img")
}
s_img2.onclick = function(){
	s_img2_img.classList.add("a");
	s_img1_img.classList.remove("a");
	canvas.classList.add("s_img2_img")
	canvas.classList.remove("s_img1_img")
}
document.querySelector("#store span").onclick = function(){
	store_bg.style.cssText = "width: 0;height: 0; opacity: 0;";
	s_img1.style.cssText = "opacity: 0;"
	s_img2.style.cssText = "opacity: 0;"
}

//游戏设置
var set = document.querySelector(".set");
var set_bg = document.querySelector("#set");
var diff = document.querySelector("#difficult");
var medi = document.querySelector("#medium");
var easy = document.querySelector("#easy");

set.onclick = function(){
	set_bg.style.cssText = "width: 600px;height: 400px; opacity: 1;";
}
diff.onclick = function(){
	diff.classList.add("on")
	medi.classList.remove("on")
	easy.classList.remove("on")
}
medi.onclick = function(){
	diff.classList.remove("on")
	medi.classList.add("on")
	easy.classList.remove("on")
}
easy.onclick = function(){
	diff.classList.remove("on")
	medi.classList.remove("on")
	easy.classList.add("on")
}
document.querySelector("#set span").onclick = function(){
	set_bg.style.cssText = "width: 0;height: 0; opacity: 0;";
}

//关于我们
var about = document.querySelector(".about");
var about_bg = document.querySelector("#about");
about.onclick = function(){
	about_bg.style.cssText = "width: 600px;height: 400px; opacity: 1;";
}
document.querySelector("#about span").onclick = function(){
	about_bg.style.cssText = "width: 0;height: 0; opacity: 0;";
}


//游戏界面的操作
var stop = document.querySelector(".setopt3");
var stop_flag = true;
stop.onclick = function(){
	if(stop_flag){
		stop_flag = false;
		game.stop();
	}else{
		stop_flag = true;
		game.continue();
	}
}

var F5 = document.querySelector(".setopt2");

F5.onclick = function(){
	stop_flag = true;
	game.play();
}
