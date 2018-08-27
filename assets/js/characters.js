var player = []
var equipment = []

/* Characters will be defined by the follow criteria
   1. Name
   2. Hit points
   3. Attack damage
   4. Defense
   5. Agility
   6. Magic attack
 */

let playerClass = [
{name: 'Fighter',
 hp: 20,
 atk: 6,
 def: 5,
 agi: 3,
 matk: 0},
{name: 'Squire',
 hp: 18,
 atk: 5,
 def: 3,
 agi: 5,
 matk: 0}
]

var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;
var context = document.getElementById('canvas').getContext("2d");
var charX = 245;
var charY = 185;

loadImage("leftArm");
loadImage("legs");
loadImage("torso");
loadImage("rightArm");
loadImage("head");
loadImage("hair");
loadImage("weapon");

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() {
      resourceLoaded();
  }
  images[name].src = "images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

function drawEllipse(centerX, centerY, width, height) {

  context.beginPath();

  context.moveTo(centerX, centerY - height/2);

  context.bezierCurveTo(
    centerX + width/2, centerY - height/2,
    centerX + width/2, centerY + height/2,
    centerX, centerY + height/2);

  context.bezierCurveTo(
    centerX - width/2, centerY + height/2,
    centerX - width/2, centerY - height/2,
    centerX, centerY - height/2);

  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

function redraw() {

  var x = charX;
  var y = charY;

  canvas.width = canvas.width; // clears the canvas

  context.drawImage(images["leftArm"], x + 40, y - 42);
  context.drawImage(images["legs"], x, y);
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["rightArm"], x - 15, y - 42);
  context.drawImage(images["head"], x - 10, y - 125);
  context.drawImage(images["hair"], x - 37, y - 138);
  drawEllipse(x + 47, y - 68, 8, 14); // Left Eye
  drawEllipse(x + 58, y - 68, 8, 14); // Right Eye
}
