const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");


ctx.canvas.width = window.innerWidth
ctx.canvas.height = window.innerHeight;


var projectiles  = [];
var enemies = [];
var projectileSpeed = 5;
var enemySpeed = 2;
var enemySpawnTime = 1000;

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

function getDistance(a, b){
    return  ( (a.x - b.x) * (a.x - b.x) + (a.y -b.y)*(a.y -b.y));
}

function spawnEnemy(){
    let x, y ;
    let radius = 20 + Math.random()*40
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
        x:   -1*(enemySpeed * Math.cos(angle)),
        y:   -1*(enemySpeed * Math.sin(angle))
    })
    enemies.push(enemy);
}


var animationFrameId;
function animate(){

    animationFrameId = requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,innerWidth,innerHeight);
    player.draw();
    
    projectiles.forEach((projectile,projectileIndex)=>{
        if(projectile.x < 0 || projectile.x > canvas.width || projectile.y < 0 || projectile.y > canvas.height){
            projectiles.splice(projectileIndex,1);
        }else{
            projectile.update()
        }
    })
    enemies.forEach((enemy,enemyIndex)=>{
        if(getDistance(player,enemy) <= ((player.radius + enemy.radius)*(player.radius + enemy.radius))){
            cancelAnimationFrame(animationFrameId);
        }


        projectiles.forEach((projectile,projectileIndex)=>{
            if(getDistance(projectile,enemy) <= ((projectile.radius + enemy.radius)*(projectile.radius + enemy.radius))){
                gsap.to(enemy,{
                    radius:enemy.radius-10,
                })        
                projectiles.splice(projectileIndex,1);
            }
        })
        if(enemy.radius<=10){
            enemies.splice(enemyIndex,1);
        }else{
            enemy.update();
        }
        
    })
    
}

addEventListener("resize",()=>{
    location.reload()
})

addEventListener("click",(event)=>{
    let angle = Math.atan2((event.clientY - innerHeight/2),(event.clientX - innerWidth/2))
    let projectile = new Projectile(innerWidth/2, innerHeight/2, 5,"white",{
        x:  projectileSpeed * Math.cos(angle),
        y:  projectileSpeed * Math.sin(angle)
    })
    projectiles.push(projectile);
    

})
animate();
setInterval(spawnEnemy,enemySpawnTime)
