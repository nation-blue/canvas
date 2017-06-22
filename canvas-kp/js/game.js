//game 类
function Game() {
	this.canvas = document.querySelector("canvas");
	this.distance = document.querySelector(".distance span");
	this.life = document.querySelector(".life span");
	this.s_img1_img = document.querySelector("#store .img1 img")
	this.s_img2_img = document.querySelector("#store .img2 img")
	this.cobj = this.canvas.getContext("2d");
	this.innerlife = 5;
	this.innerscore = 0;
	this.hinderArr = [];

	this.person = new Person(this.canvas, this.cobj);
	this.hinder = new Hinder(this.canvas, this.cobj);

	this.t;
	this.speed = 8;
	this.step = 3;
	this.currentScore = 0;
	//moveSence
	this.backNum = 0;
	//movePerson
	this.num = 0;
	//moveHinder
	this.times = 0;
	this.randomtime = Math.floor(3 + 5 * Math.random()) * 1000;
}
Game.prototype = {
	play: function() {
		this.init();
		this.drawSence();
		var that = this;
		this.t = setInterval(function(){
			that.move(that)
		},50);
	},
	init: function() {
		this.stop();
		this.innerlife = 5;
		this.innerscore = 0;
		this.hinderArr = [];		
		this.distance.innerHTML = 0;
		this.life.innerHTML = 5;
		this.person = new Person(this.canvas, this.cobj);
		this.hinder = new Hinder(this.canvas, this.cobj);
		this.speed = 8;
		this.step = 3;
		this.currentScore = 0;
		this.backNum = 0;
		this.num = 0;
		this.times = 0;
		this.randomtime = Math.floor(3 + 5 * Math.random()) * 1000;
		var that = this;
		document.onkeydown = function(e){
			if(e.keyCode == 32){
				that.person.jump();
			}
		}
		if(document.querySelector("#difficult").classList.contains("on")){
			this.speed = 16;
		}
		if(document.querySelector("#medium").classList.contains("on")){
			this.speed = 12;
		}
	},
	drawSence: function() {
		var clientw = document.documentElement.clientWidth;
		var clienth = document.documentElement.clientHeight;
		this.canvas.width = clientw;
		this.canvas.height = clienth;
		
		if(this.canvas.width / 500 > this.canvas.height / 547) {
			this.canvas.style.backgroundSize = "contain";
		} else {
			this.canvas.style.backgroundSize = "cover";
		}
		this.person.draw();
	},
	move: function(that) {
		//moveSence
		that.backNum -= that.speed;
		that.canvas.style.backgroundPositionX = that.backNum + "px";
		//movePerson
		that.num++;
		that.cobj.clearRect(0, 0, that.canvas.width, that.canvas.height);
		that.person.draw();
		that.person.animate(that.num, that.speed);
		//moveHinder
		that.times += 50;
		if(that.times % that.randomtime == 0) {
			that.times = 0;
			that.randomtime = Math.floor(3 + 5 * Math.random()) * 1000;
			var hinder = new Hinder(that.canvas, that.cobj);
			that.hinderArr.push(hinder);
			if(that.hinderArr.length > 5) {
				that.hinderArr.shift();
			}
		}
		
		for(var i = 0; i < that.hinderArr.length; i++) {
			that.hinderArr[i].draw();
			that.hinderArr[i].animate(that.speed);

			if(hitPix(that.canvas, that.cobj, that.person, that.hinderArr[i])) {
				xue(that.canvas,that.cobj,that.person.x+that.person.width/2,that.person.y+that.person.height/2);
				if(!that.hinderArr[i].hits) {
					that.innerlife--;
					that.life.innerHTML = that.innerlife;
					if(that.innerlife <= 0) {
						alert("game over");
						location.reload();
					}
					that.hinderArr[i].hits = "hits";
				}
			}
			if(that.hinderArr[i].x + that.hinderArr[i].width < that.person.x && !that.hinderArr[i].hits) {

				if(!that.hinderArr[i].score) {
					++that.innerscore;
					++that.currentScore;
					that.distance.innerHTML = that.innerscore;
					if(that.currentScore % that.step == 0) {						
						that.step = that.currentScore * 2;
						that.currentScore = 0;
						that.speed += 4;
					}
					that.hinderArr[i].score = "true"
				}
			}
		}
	},
	stop : function(){
		clearInterval(this.t);
	},
	continue : function(){
		var that=this;
		this.t = setInterval(function(){
			that.move(that)
		},50);
	},
}

function Person(canvas, cobj) {
	this.x = 0;
	this.y = 0;
	this.canvas = canvas;
	this.cobj = cobj;
	this.runImg = document.querySelectorAll(".run");
	this.jumpImg = document.querySelectorAll(".jump");
	this.width = 83;
	this.height = 124;
	this.status = "runImg";
	this.state = 0;

	//	计算人物掉落的
	this.g = 2;
	this.n = 1;

	this.flag = true;
	this.flag1 = true;
}
Person.prototype = {
	draw: function() {
		var cobj = this.cobj;
		cobj.save();
		cobj.translate(this.x, this.y);
		cobj.drawImage(this[this.status][this.state], 0, 0, 62, 95, 0, 0, this.width, this.height);
		cobj.restore();
	},
	animate: function(num, speed) {
		if(this.status == "runImg") {
			this.state = num % 7;
		} else {
			this.state = 0;
		}
		this.x += speed;
		if(this.x > this.canvas.width / 3) {
			this.x = this.canvas.width / 3;
		}
		if(this.flag1){
			this.y += this.g * this.n;
			this.n++;
			if(this.y > this.canvas.height - this.height) {
				this.y = this.canvas.height - this.height
				this.flag1 = false;
			}
		}
		
	},
	jump: function() {
		if(!this.flag) {
			return;
		}
		this.flag = false;
		var inita = 0;
		var speeda = 10;
		var currenty = this.y;
		var r = 100;
		this.status = "jumpImg";
		this.state = 0;
		var that = this;
		var t = setInterval(function() {
			inita += speeda;
			if(inita >= 180) {
				that.status = "runImg"
				clearInterval(t);
				that.y = currenty;
				that.flag = true;
			} else {
				that.y = currenty - Math.sin(inita * Math.PI / 180) * r;
			}
		}, 50)
	}
}

function Hinder(canvas, cobj) {
	this.canvas = canvas;
	this.cobj = cobj;
	this.hinderImg = document.querySelectorAll(".hinder");
	this.state = Math.floor(this.hinderImg.length * Math.random());;
	this.width = 56;
	this.height = 40;
	this.x = this.canvas.width;
	this.y = this.canvas.height - this.height;
}
Hinder.prototype = {
	draw: function() {
		var cobj = this.cobj;
		cobj.save();
		cobj.translate(this.x, this.y);
		cobj.drawImage(this.hinderImg[this.state], 0, 0, 564, 400, 0, 0, this.width, this.height);
		cobj.restore();
	},
	animate: function(speed) {
		this.x -= speed;
	}
}

function lizi(canvas,cobj,x,y){
    this.x=x;
    this.y=y;
    this.canvas=canvas;
    this.cobj=cobj;
    this.r=2+2*Math.random();
    this.speedx=8*Math.random()-4;
    this.speedy=8*Math.random()-4;
    this.color="red";
    this.speedl=0.3;
}
lizi.prototype={
    draw:function(){
        this.cobj.save();
        this.cobj.translate(this.x,this.y);
        this.cobj.fillStyle=this.color;
        this.cobj.beginPath();
        this.cobj.arc(0,0,this.r,0,2*Math.PI);
        this.cobj.fill();
        this.cobj.restore();
    },
    animate:function(){
        this.x+=this.speedx;
        this.y+=this.speedy;
        this.r-=this.speedl;
    }

}

function xue(canvas,cobj,x,y){
    var arr=[];
    for(var i=0;i<15;i++){
        arr.push(new lizi(canvas,cobj,x,y));
    }

    var t=setInterval(function(){

        for(var i=0;i<arr.length;i++){
            arr[i].draw();
            arr[i].animate();
            if(arr[i].r<0){
                arr.splice(i,1);
            }
        }
        if(arr.length<1){
            clearInterval(t);
        }

    },50)
}