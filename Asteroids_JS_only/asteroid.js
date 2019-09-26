//this file will contain the javascript code
//following along here: https://www.youtube.com/watch?v=HWuU5ly0taA

let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 1000;
let ship;
let keys = [];
let bullets = [];

document.addEventListener('DOMContentLoaded', SetupCanvas)

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ship = new Ship();
  //trick to work with multiple keyboard inputs at once
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });
    Render();
}

class Ship {
    constructor(){
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = 'white';
    }

    // easy method to rotate objects with a single line of code
    // other, more convoluted methods exist
    Rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }

    // handles the movement of the ship
    Update() {
        // motion of the ship relative to angle it is facing
        let radians = this.angle / Math.PI * 180;
        if (this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        // handle cases where the ship may go off the screen
        if (this.x < this.radius){
            this.x = canvas.width;
        }
        if (this.x > canvas.width){
            this.x = this.radius;
        }
        if (this.y < this.radius){
            this.y = canvas.height;
        }
        if (this.y > canvas.height){
            this.y = this.radius;
        }
        // simulate slowing the ship down when the key to move isnt being held keydown
        this.velX *= 0.99;
        this.velY *= 0.99;

        // use velocity to update the ships motion
        this.x -= this.velX;
        this.y -= this.velY;
    }

    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 3); // 3 is the number of sides for the shape
        let radians = this.angle / Math.PI * 180;
        for(let i = 0;  i < 3; i++) { // 3 refers to shape sides
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function Render(){
    ship.movingForward = (keys[87]); // key code for 'w'
    // why not an else? What if both are clicked?
    if(keys[68]) { // key code for 'd'
        ship.Rotate(1);
    }
    if(keys[65]) { // key code for 'a'
        ship.Rotate(-1);
    }
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ship.Update();
    ship.Draw();
    requestAnimationFrame(Render);
}
