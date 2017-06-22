
function shape (canvas, copy, cobj, ele) {
	if(canvas===undefined||cobj===undefined){
        console.error("参数传入有误");
        return false;
    }
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.type="line";
    this.style="stroke";
    this.historyArr=[];
    this.fillStyle="#000";
    this.strokeStyle="#000";
    this.lineWidth=1;
    this.bianNum=5;
    this.jiaoNum=5;
    this.xpw=10;
    this.xph=10;
    this.ele=ele;
    this.firstback=true;
}

shape.prototype = {
	init : function(){
		this.cobj.fillStyle = this.fillStyle;
		this.cobj.strokeStyle = this.strokeStyle;
		this.cobj.lineWidth=this.lineWidth;
		this.ele.css("display","none");
		this.firstback=true;
	},
	draw : function(){
        var that = this;
        this.copy.onmousedown = function(e){
            that.init();
            
        }
    }
}
