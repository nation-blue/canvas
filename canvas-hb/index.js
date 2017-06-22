
var box = document.querySelector(".canvas");
var canvas = document.querySelector("canvas");
var cobj = canvas.getContext("2d");
var copy = document.querySelector(".copy");
var xp = document.querySelector(".xp");

var anniu = document.querySelectorAll(".menu a");
var opt = document.querySelectorAll(".opt");
anniu.forEach(function(v,i){
	v.onclick = function(){
		anniu.forEach(function(value,index){
			value.classList.remove("first");
		})
		v.classList.add("first");
		opt.forEach(function(value,index){
			value.style.display = "none";
		})
		opt[i].style.display = "block";
	}
})

var opt_li = document.querySelectorAll(".opt li");
opt_li.forEach(function(v,i){
	v.onclick = function(){
		opt_li.forEach(function(value,index){
			value.classList.remove("first");
		})
		v.classList.add("first");
	}
})

var shapeObj = new shape(canvas,copy,cobj,xp);


