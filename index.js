var canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

var ctx = canvas.getContext("2d");



var mouse={
    x:undefined,
    y:undefined
}


addEventListener("resize",function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});


function getDistance( a,b){
    return Math.pow((a.x -b.x),2) + Math.pow((a.y - b.y),2);
}

addEventListener("mousemove",function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

class Circle{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    update(){
        
        this.draw();
    }
}

var circle1,circle2;

function init(){
    circle1 = new Circle(canvas.width/2 - 100,canvas.height/2,100,"black");
    circle2 = new Circle(canvas.width/2 + 100,canvas.height/2,30,"red");
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    circle2.x = mouse.x;
    circle2.y = mouse.y;
    console.log("hi")
    console.table(getDistance(circle1,circle2),);
    if(getDistance(circle1,circle2) <= Math.pow(circle2.radius+circle1.radius,2)){
        circle1.color="red";
    }else
        circle1.color="black";
    //console.table(getDistance(circle1,circle2),Math.pow(circle1.radius + circle2.radius,2));
    
    circle1.update();
    circle2.update();
}


init();
animate();
