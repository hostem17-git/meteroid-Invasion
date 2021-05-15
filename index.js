const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


canvas.width = innerWidth
canvas.height = innerHeight;

var click ={
    x:undefined,
    y:undefined
}

class Player{
    constructor(x,y,radius,color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.radius = radius;
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fill();
        ctx.closePath();
    }
}

class Projectile{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity; 
    }

    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fill();
        ctx.closePath();
    }
    update(){
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        this.draw();
    }
}


const player = new Player(canvas.width/2,canvas.height/2,20,"blue");

player.draw();

var projectiles  = [];

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);
    player.draw();
    projectiles.forEach(projectile=>{
        projectile.update()
    })
}

var velocityCeofficient = 10;


addEventListener("click",(event)=>{
    let angle = Math.atan2((event.clientY - innerHeight/2),(event.clientX - innerWidth/2))
    let projectile = new Projectile(innerWidth/2, innerHeight/2, 10,"red",{
        x:  velocityCeofficient * Math.cos(angle),
        y:  velocityCeofficient * Math.sin(angle)
    })
    projectiles.push(projectile);
    

})

animate()