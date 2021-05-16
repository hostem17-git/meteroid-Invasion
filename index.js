const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


canvas.width = innerWidth
canvas.height = innerHeight;


var projectiles  = [];
var enemies = [];
var velocityCeofficient = 5;
var enemySpawnTime =1000;

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

class Enemy{
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



const player = new Player(canvas.width/2,canvas.height/2,20,"white");

player.draw();
function getRandomColor(){
    let color = ["#ff1e56","#ffac41","#ee4540","#c72c41","#801336","#d65a31","#c72c41","#ee4540"];
    return color[Math.floor(Math.random()*color.length)];
}
function spawnEnemy(){
    let x, y ;
    let radius = 10 + Math.random()*40
    if(Math.random() < 0.5){
        x = Math.random() < 0.5 ? - radius: canvas.width + radius;
        y = Math.random()*canvas.height;
    }else{
        x = Math.random()*canvas.width;
        y = Math.random() < 0.5 ? - radius: canvas.height + radius;
    }
    let angle = Math.atan2((y - innerHeight/2),(x - innerWidth/2))
    //let angle = Math.atan2((x - innerWidth/2),(y - innerHeight/2))
    let enemy = new Projectile(x, y,radius,getRandomColor(),{
        x:   -1*(velocityCeofficient * Math.cos(angle)),
        y:   -1*(velocityCeofficient * Math.sin(angle))
    })
    enemies.push(enemy);
}



function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,innerWidth,innerHeight);
    player.draw();
    projectiles.forEach(projectile=>{
        projectile.update()
    })

    enemies.forEach(enemy=>{
        enemy.update()
    })
    
}
addEventListener("resize",()=>{
    location.reload()
})

addEventListener("click",(event)=>{
    let angle = Math.atan2((event.clientY - innerHeight/2),(event.clientX - innerWidth/2))
    let projectile = new Projectile(innerWidth/2, innerHeight/2, 5,"white",{
        x:  velocityCeofficient * Math.cos(angle),
        y:  velocityCeofficient * Math.sin(angle)
    })
    projectiles.push(projectile);
    

})

setInterval(spawnEnemy,enemySpawnTime)
animate()