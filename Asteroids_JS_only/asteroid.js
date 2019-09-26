//this file will contain the javascript code
//following along here: https://www.youtube.com/watch?v=HWuU5ly0taA

let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 900;
let ship;
let keys = [];
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;

document.addEventListener('DOMContentLoaded', SetupCanvas)

function SetupCanvas(){
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ship = new Ship();

    //create asteroids for the game
    for (let i = 0; i < 8; i++) {
        asteroids.push(new Asteroid());
    }

    //trick to work with multiple keyboard inputs at once
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
    document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
        // should only allow the ship to fire when the space bar is released
        if (e.keyCode === 32 && ship.visible) {
            bullets.push(new Bullet(ship.angle));
        }
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
        this.noseX = canvasWidth / 2 + 15;
        this.noseY = canvasHeight / 2;
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
        this.noseX = this.x - this.radius * Math.cos(radians);
        this.noseY = this.y - this.radius * Math.sin(radians);
        for(let i = 0;  i < 3; i++) { // 3 refers to shape sides
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}

class Bullet {
    constructor(angle) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.velX = 0;
        this.velY = 0;
    }

    Update() {
        let radians = this.angle / Math.PI * 180;
        this.x -= Math.cos(radians) * this.speed;
        this.y -= Math.sin(radians) * this.speed;
    }

    Draw() {
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Asteroid {
    constructor(x, y, radius, level, collisionRadius) {
        this.visible = true;
        this.x = x || Math.floor(Math.random() * canvasWidth);
        this.y = y || Math.floor(Math.random() * canvasHeight);
        this.speed = 5;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = 'white;';
        this.collisionRadius = collisionRadius || 46; // slightly less than radius
        this.level = level || 1;
    }

    Update() {
        let radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;
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
    }

    Draw (){
        ctx.beginPath();
        let vertAngle = ((Math.PI * 2) / 6);
        let radians = this.angle / Math.PI * 180;
        for(let i = 0;  i < 6; i++) { // 3 refers to shape sides
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
        }
        ctx.closePath();
        ctx.stroke();
    }
}

function CircleCollision(p1x, p1y, r1, p2x, p2y, r2) {
    let radiusSum;
    let xDiff;
    let yDiff;
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
    if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
        return true;
    } else {
        return false;
    }
}

function DrawLifeShips() {
    let startX = 1350;
    let startY = 10;
    let points = [[9, 9], [-9, 9]];
    ctx.strokeStyle = 'white';
    for (let i = 0; i < lives; i++) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let j = 0; j < points.length; j++) {
            ctx.lineTo(startX + points[j][0], startY + points[j][1]);
        }
        ctx.closePath();
        ctx.stroke();
        startX -= 30;
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
    //clear current canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // add score
    ctx.fillStyle = 'white';
    ctx.font = '21px Arial';
    ctx.fillText('SCORE: ' + score.toString(), 20, 35);

    //check if lives remain
    if (lives <= 0){
        ship.visible = false;
        ctx.fillStyle = 'white';
        ctx.font = '50px Arial';
        ctx.fillText('GAME OVER', canvasWidth /2 - 150, canvasHeight / 2);
    }

    //draw the number of lives left
    DrawLifeShips();

    //check for collisions
    if (asteroids.length !== 0) {
        for(let i = 0; i < asteroids.length; i++){
            if(CircleCollision(ship.x, ship.y, 11, asteroids[i].x, asteroids[i].y, asteroids[i].collisionRadius)){
                //reset the ship
                //for extra effects, add a BANG by using the same concept as bullets and start them in the center of the ship and go outwards
                ship.x = canvasWidth / 2;
                ship.y = canvasHeight / 2;
                ship.velX = 0;
                ship.velY = 0;
                lives -= 1;
            }
        }
    }

    if (asteroids.length !== 0 && bullets.length != 0) {
loop1:
        for(let i = 0; i < asteroids.length; i++){
            for (let j = 0; j < bullets.length; j++){
                if (CircleCollision(bullets[j].x, bullets[j].y, 3, asteroids[i].x, asteroids[i].y, asteroids[i].collisionRadius)){
                    if(asteroids[i].level === 1){
                        asteroids.push(new Asteroid(asteroids[i].x - 5, asteroids[i].y - 5, 25, 2, 22))
                        asteroids.push(new Asteroid(asteroids[i].x + 5, asteroids[i].y + 5, 25, 2, 22))
                    } else if (asteroids[i].level === 2) {
                        asteroids.push(new Asteroid(asteroids[i].x - 5, asteroids[i].y - 5, 15, 3, 12))
                        asteroids.push(new Asteroid(asteroids[i].x + 5, asteroids[i].y + 5, 15, 3, 12))
                    }
                    asteroids.splice(i, 1);
                    bullets.splice(j, 1);
                    score += 20;
                    break loop1;
                }
            }
        }
    }

    if(ship.visible) {
        ship.Update();
        ship.Draw();
    }

    if(bullets.length !== 0) {
        for(let i = 0; i < bullets.length; i++){
            bullets[i].Update();
            bullets[i].Draw();
        }
    }
    if(asteroids.length !== 0) {
        for(let i = 0; i < asteroids.length; i++){
            asteroids[i].Update();
            asteroids[i].Draw(i);
        }
    }
    requestAnimationFrame(Render);
}
