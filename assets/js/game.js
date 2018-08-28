/* ES6 implementation will occur at a later date
import {loadEnemy} from 'enemies';
let enemy = loadEnemy();
*/
//import $ from 'jquery';

//Arrays
let armor = []
let boss = []
let enemies = []
let equipment = []
let weapons = []

//Player object
let player = {}

//Global variables
let critChance = 0
let drop = 0
let enemyDamage = 0
let enemyFlag = false
let enemyMiss = false
let enemyTimeout
let equipFlag = false
let experience = 0
let expForLevel = 0
let fightFlag = false
let playerDamage = 0
let playerMiss = false
let playerPos = 0
let playerTimeout
let xIsCrit = false

//Variables for character.
// Copyright 2011 William Malone (www.williammalone.com) [Character animation code]
var canvas;
var context;
var images = {};
var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;
var x = 245;
var y = 185;
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);
var numFramesDrawn = 0;
var curFPS = 0;

/* Characters will be defined by the follow criteria
   1. Name
   2. Hit points
   3. Attack damage
   4. Defense
   5. Agility
   6. Critical chance
   7. Magic attack
   8. Level
   9. Image location
 */

let playerClass = [
{name: 'Fighter',
 hp: 100,
 atk: 6,
 def: 5,
 agi: 3,
 crit: 0,
 matk: 0,
 level: 1,
},
{name: 'Squire',
 hp: 80,
 atk: 5,
 def: 3,
 agi: 5,
 crit: 1,
 matk: 0,
 level: 1
 },
 {name: 'Ranger',
 hp: 60,
 atk: 2,
 def: 5,
 agi: 9,
 crit: 50,
 matk: 0,
 level: 1
 },
 {name: 'Monk',
 hp: 85,
 atk: 6,
 def: 4,
 agi: 6,
 crit: 3,
 matk: 0,
 level: 1,
}
]

/* Weapons will be defined by the following criteria:
  1. Weapon name
  2. Rarity
  3. Attack damage
  4. Agility
  5. Critical chance
*/

let commonWeapons =
[
  {name: 'Battered Axe',
   rarity: 'common',
   atk: 10,
   agi: 3,
   crit: 1
 },
   {name: 'Gladius',
    rarity: 'common',
    atk: 8,
    agi: 7,
    crit: 1
  },
  {name: 'Shortbow',
   rarity: 'common',
   atk: 4,
   agi: 10,
   crit: 10
 },
 {name: 'Brass Knuckles',
  rarity: 'common',
  atk: 4,
  agi: 10,
  crit: 10
 }
]

let uncommonWeapons =
[
   {name: 'Refined Axe',
    rarity: 'uncommon',
    atk: 17,
    agi: 8,
    crit: 3
    },
     {name: 'Sharpened Shortsword',
      rarity: 'uncommon',
      atk: 14,
      agi: 11,
      crit: 3
    },
    {name: 'Composite Bow',
     rarity: 'uncommon',
     atk: 5,
     agi: 15,
     crit: 20
   },
   {name: 'Ruby Infused Knuckles',
    rarity: 'uncommon',
    atk: 15,
    agi: 13,
    crit: 6
  }
]

let rareWeapons =
[
  {name: 'Warmonger',
   rarity: 'rare',
   atk: 50,
   agi: 20,
   crit: 10
   },
   {name: 'Oathbreaker',
    rarity: 'rare',
    atk: 30,
    agi: 40,
    crit: 20
  },
  {name: "Siren's Cry",
   rarity: 'rare',
   atk: 15,
   agi: 50,
   crit: 30
  },
  {name: "Ancient Ebony Fist",
   rarity: 'rare',
   atk: 45,
   agi: 30,
   crit: 25
  }
]
/*Armor will be defined by the following criteria:
  1. Armor name
  2. Rarity
  3. Defense
  4. Magic Defense
  5. Magical resistance
*/

let commonArmor = [
  {name: 'Cotton Tunic',
   rarity: 'common',
   hp: 100,
   def: 5,
   mdef: 5,
   mres: 5},
  {name: 'Worn Vest',
   rarity: 'common',
   hp: 80,
   def: 3,
   mdef: 3,
   mres: 1
 }]

/* Enemies will be defined by the follow criteria
   1. Name
   2. Hit points
   3. Attack damage
   4. Defense
   5. Agility
   6. Magic attack
   7. Experience
   8. Img location
 */

 let tutorialEnemies = [
   {name: 'Sewer Rat',
    hp: 55,
    atk: 3,
    def: 2,
    agi: 2,
    matk: 0,
    exp: 3,
    img: 'rat.svg'},
   {name: 'Wild Wolf',
    hp: 75,
    atk: 4,
    def: 1,
    agi: 3,
    matk: 0,
    exp: 6,
    img: 'wolf.svg'},
    {name: 'Phantombug',
     hp: 45,
     atk: 3,
     def: 3,
     agi: 3,
     matk: 0,
     exp: 4,
     img: 'rat.svg'},
    {name: 'Frightcat',
     hp: 70,
     atk: 5,
     def: 2,
     agi: 3,
     matk: 0,
     exp: 8,
     img: 'wolf.svg'}
 ]

 let easyEnemies = [
   {name: 'Ogre',
    hp: 200,
    atk: 10,
    def: 14,
    agi: 5,
    matk: 0,
    exp: 15,
    img: 'ogre.svg'},
   {name: 'Goblin',
    hp: 125,
    atk: 8,
    def: 10,
    agi: 6,
    matk: 0,
    exp: 11,
    img: 'goblin.svg'
  }
 ]

 let bosses = [
   {name: 'Crimsonfall',
    hp: 15000,
    atk: 200,
    def: 150,
    agi: 10,
    matk: 0,
    exp: 1000,
    img: 'ogre.svg'
  }
 ]
enemy = {monster: tutorialEnemies[Math.floor(Math.random() * tutorialEnemies.length)]}

//Main function of game. Will determine character selection.
function main(){
  var playerSelected = "N";
  loadGame();

  //Target the button that is clicked to load the class
  $("#select1").click(function() {
    selectCharacter($("#select1 span").html());
  });
  $("#select2").click(function() {
    selectCharacter($("#select2 span").html());
  });
  $("#select3").click(function() {
    selectCharacter($("#select3 span").html());
  });
  $("#select4").click(function() {
    selectCharacter($("#select4 span").html());
  });

  // When the user clicks the x within the modal, close it
  $("#equipClose").click(function() {
    $('#itemList').css('display', 'none');
  })

  //Load enemy stats
  loadEnemyStats(enemy);
  $("#equip").click(function() {
    equipCharacter();
    calcPlayerDamage();
  });
  $("#unequip").click(function() {
    unequipCharacter();
    calcPlayerDamage();
  });
  $("#fightButton").click(function() {
    if (fightFlag === false) {
      beginFight();
    }
  });
  $("#enemyLevelButton").click(function() {
    if (enemyFlag === false) {
      increaseEnemyLevel();
    }
  });
  $("#bossButton").click(function() {
    if (enemyFlag === false) {
      fightBoss();
    }
  });
  prepareCanvas(document.getElementById("canvasDiv"), 490, 220);
}

function loadGame(){
  setTimeout(function(){
      $('body').addClass('loaded');
      $('h1').css('color','#222222');
  }, 3000);
  $('#characterSelect').show();
  $('.battle').hide();
  for(var i = 0; i < playerClass.length; i++) {
    $('#select' + (i + 1) +' span').html(playerClass[i].name);
  };
}

function selectCharacter(selection){
  this.select = selection;
  var pClass = [];
  switch (this.select) {
    case 'Fighter':
      this.weapon = commonWeapons[0];
      this.armor = commonArmor[0];
      pClass = playerClass[0];
      playerPos = 0;
      weapons.push(commonWeapons[0]);
      /* name: commonWeapons.name(0),
         rarity: commonWeapons.rarity(0),
         atk: commonWeapons.atk(0),
         agi: commonWeapons.agi(0),
         crit: commonWeapons.crit(0)
      });*/
      break;
    case 'Squire':
      this.weapon = commonWeapons[1];
      this.armor = commonArmor[1];
      pClass = playerClass[1];
      playerPos = 1;
      weapons.push(commonWeapons[1]);
      break;
    case 'Ranger':
      this.weapon = commonWeapons[2];
      this.armor = commonArmor[1];
      pClass = playerClass[2];
      playerPos = 2;
      weapons.push(commonWeapons[2]);
      break;
      case 'Monk':
        this.weapon = commonWeapons[3];
        this.armor = commonArmor[0];
        pClass = playerClass[3];
        playerPos = 3;
        weapons.push(commonWeapons[3]);
        break;
    default:
      this.weapon = commonWeapons[0];
      this.armor = commonArmor[0];
      weapons.push(commonWeapons[0]);
      break;
    }
   player = {class: pClass, weapon: this.weapon, armor: this.armor};
   equipFlag = false;
    $("#characterSelect").hide();
    $(".battle").show();
    loadPlayerStats(player);
}

function loadPlayerStats(player){
    $("#player h2").html(player.class.name);
    $("#pLvl span").html(player.class.level);
    $("#pHp span").html(player.class.hp);
    $("#pAtk span").html(player.class.atk);
    $("#pDef span").html(player.class.def);
    $("#pAgi span").html(player.class.agi);
}

function loadEnemyStats(enemy){
  $("#enemy h2").html(enemy.monster.name);
  $("#eHp span").html(enemy.monster.hp);
  $("#enemy-img").attr("src", "assets/images/" + enemy.monster.img);
}

function equipCharacter(){
  //Build a list of items to select. Begin by emptying the items.
  $("#items").empty();

  //Select the itemList using jQuery and make the display inline-block to show on screen.
  $("#itemList").css("display", "inline-block");

  //Convert the following row/cell logic to loop into building each entry
  //from the weapons array.
  var wepTable = document.getElementById("items");
  for (var i = 0; i < weapons.length; i++) {
    var wepRow = wepTable.insertRow(i);
    var cell1 = wepRow.insertCell(0);
    cell1.innerHTML = weapons[i].name;
  };

  if (equipFlag === false) {
    player.class.atk += player.weapon.atk;
    player.class.agi += player.weapon.agi;
    player.class.crit += player.weapon.crit;
    player.class.hp += player.armor.hp;
    player.class.def += player.armor.def;
    $("#battleText").prepend("<p style='color:blue'>You equipped your " + player.weapon.name + " and " + player.armor.name + ".</p>");
    equipFlag = true;
    loadPlayerStats(player);

  }
}

function unequipCharacter(){
  if (equipFlag === true) {
    player.class.atk -= player.weapon.atk;
    player.class.agi -= player.weapon.agi;
    player.class.crit -= player.weapon.crit;
    player.class.hp -= player.armor.hp;
    player.class.def -= player.armor.def;
    $("#battleText").prepend("<p style='color:blue'>You un-equipped your " + player.weapon.name + " and " + player.armor.name +  ".</p>");
    equipFlag = false;
    loadPlayerStats(player);
  }
}

function calcEnemyDamage(){
  enemyDamage = Math.round((Math.random() * enemy.monster.atk) * 4) - player.class.def;
  if (enemyDamage < 0) {
    enemyMiss = true;
    enemyDamage = 0;
  }
}

function calcPlayerDamage(){
  critChance = Math.floor(Math.random() * 100);
  if (critChance > (100 - player.class.crit)) {
      playerDamage = (Math.round((Math.random() * player.class.atk) + (player.class.atk * 1.5)) - enemy.monster.def);
      xIsCrit = true;
  } else {
    playerDamage = (Math.round((Math.random() * player.class.atk) + ((player.class.atk / 2) * .3)) - enemy.monster.def);
    xIsCrit = false;
  };

  if (playerDamage < 0) {
    playerMiss = true;
    playerDamage = 0;
  }
}

function enemyAttack(playerHp, maxPlayerHp, enemyAgi){
  this.player.hp = playerHp;
  this.player.maxHp = maxPlayerHp;
  this.enemy.agi = enemyAgi
    if (this.player.hp === 0 || this.player.hp < 0){
      endGame('enemy');
    } else {
    calcEnemyDamage();
    this.player.hp -= enemyDamage;
    $("#playerHpBar").attr("style", "width:" + Math.floor(((this.player.hp / this.player.maxHp) * 100)) + "%");
    $("#battleText").prepend("<p style='color:red'>Enemy hits YOU for " + enemyDamage + " points of damage.</p>");
    enemyTimeout = setTimeout(enemyAttack, this.enemy.agi, this.player.hp, this.player.maxHp, this.enemy.agi);
    return enemyTimeout;
  }
}

function playerAttack(enemyHp, maxEnemyHp, playerAgi){
  this.enemy.hp = enemyHp;
  this.enemy.maxHp = maxEnemyHp;
  this.player.agi = playerAgi;
    if (this.enemy.hp === 0 || this.enemy.hp < 0){
      endGame('player');
    } else {
    calcPlayerDamage();
    this.enemy.hp -= playerDamage;
    $("#enemyHpBar").attr("style", "width:" + Math.floor(((this.enemy.hp / this.enemy.maxHp) * 100)) + "%");
    if (xIsCrit ? $("#battleText").prepend("<p style='color:green'>Critical Hit!! YOU hit enemy for " + playerDamage + " points of damage.</p>") : $("#battleText").prepend("<p style='color:green'>YOU hit enemy for " + playerDamage + " points of damage.</p>"));
    playerTimeout = setTimeout(playerAttack, this.player.agi, this.enemy.hp, this.enemy.maxHp, this.player.agi);
    return playerTimeout;
  }
}

function beginFight(){
  let maxPlayerHp = player.class.hp;
  let playerHp = maxPlayerHp;
  let playerAgi = Math.floor(4500 / player.class.agi);
  let enemyHp = enemy.monster.hp;
  let maxEnemyHp = enemyHp;
  let enemyAgi = Math.floor(3500 / enemy.monster.agi);

  //Set fight and enemy flags to true to disable buttons during fight
  fightFlag = true;
  enemyFlag = true;
  setTimeout(enemyAttack, enemyAgi, playerHp, maxPlayerHp, enemyAgi);
  setTimeout(playerAttack, playerAgi, enemyHp, maxEnemyHp, playerAgi);
}

function increaseEnemyLevel(){
  enemy = {monster: easyEnemies[Math.floor(Math.random() * tutorialEnemies.length)]};
  loadEnemyStats(enemy);
}

function fightBoss(){
  enemy = {monster: bosses[Math.floor(Math.random() * bosses.length)]};
  loadEnemyStats(enemy);
}

function endGame(winner){
  this.winner = winner;
  switch (this.winner) {
    case 'player':
      drop = Math.floor(Math.random() * 100);
      switch (true) {
        case (drop > 90):
          if (player.weapon.rarity === 'uncommon' || player.weapon.rarity === 'common') {
            $("#battleText").prepend("<p style='color:purple'>" + enemy.monster.name + " dropped a RARE " + rareWeapons[playerPos].name + "!</p>");
            unequipCharacter();
            player.weapon = rareWeapons[playerPos];
            weapons.push(rareWeapons[playerPos]);
          }
          break;
          case (drop > 50):
            $("#battleText").prepend("<p style='color:orange'>" + enemy.monster.name + " dropped a " + uncommonWeapons[playerPos].name + "!</p>");
            if (player.weapon.rarity === 'rare') {
              unequipCharacter();
              $("#battleText").prepend("<p style='color:green'> You currently possess a better weapon.</p>");
            } else if (player.weapon.rarity === 'uncommon') {
              unequipCharacter();
              $("#battleText").prepend("<p style='color:green'> You currently possess this weapon.</p>");
            } else {
              unequipCharacter();
              player.weapon = uncommonWeapons[playerPos];
              weapons.push(uncommonWeapons[playerPos]);
            }
            break;
        }
      alert("You win!!");
      resetGame();
      setTimeout(gainExperience(), 1000);
      break;
    case 'enemy':
      alert("You lose..");
      resetGame();
      break;
    default:
      break;
    }
}

function resetGame() {
    clearTimeout(enemyTimeout);
    clearTimeout(playerTimeout);
    fightFlag = false;
    enemyFlag = false;
    if(equipFlag ? unequipCharacter() : $("#battleText").prepend("<p style='color:pink'>Let's play!"));
    enemy = {monster: tutorialEnemies[Math.floor(Math.random() * tutorialEnemies.length)]}
    loadEnemyStats(enemy);
    $("#playerHpBar").attr("style", "width:100%");
    $("#enemyHpBar").attr("style", "width:100%");
}

function gainExperience() {
  $("#battleText").prepend("<p style='color:blue'>You gained " + enemy.monster.exp + " experience points.");
  expForLevel = player.class.level * 10;
  experience += enemy.monster.exp;
  $("#playerExpBar").attr("style", "width:" + Math.floor(((experience / expForLevel) * 100)) + "%")
  if (experience > expForLevel) {
    $("#battleText").prepend("<p style='color:blue'>You leveled up!!!");
    player.class.level += 1;
    player.class.atk += Math.floor(player.weapon.atk / 2);
    player.class.agi += Math.floor(player.weapon.agi / 2);
    player.class.crit += player.weapon.crit;
    player.class.hp += player.armor.hp * 3;
    player.class.def += Math.floor(player.armor.def / 2);
    $("#battleText").prepend("<p style='color:blue'> Level --> " + player.class.level);
    $("#battleText").prepend("<p style='color:blue'> HP --> " + player.class.hp);
    $("#battleText").prepend("<p style='color:blue'> ATK --> " + player.class.atk);
    $("#battleText").prepend("<p style='color:blue'> DEF --> " + player.class.def);
    $("#battleText").prepend("<p style='color:blue'> AGI --> " + player.class.agi);
    $("#battleText").prepend("<p style='color:blue'> CRIT --> " + player.class.crit);
  }
  loadPlayerStats(player);
}

function prepareCanvas(canvasDiv, canvasWidth, canvasHeight)
{
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'canvas');
	canvasDiv.appendChild(canvas);

	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d"); // Grab the 2d canvas context
	// Note: The above code is a workaround for IE 8and lower. Otherwise we could have used:
	//     context = document.getElementById('canvas').getContext("2d");

	loadImage("leftArm");
	loadImage("legs");
	loadImage("torso");
	loadImage("rightArm");
	loadImage("head");
	loadImage("hair");
}

function loadImage(name) {

  images[name] = new Image();
  images[name].onload = function() {
	  resourceLoaded();
  }
  images[name].src = "assets/images/" + name + ".png";
}

function resourceLoaded() {

  numResourcesLoaded += 1;
  if(numResourcesLoaded === totalResources) {

	setInterval(redraw, 1000 / fps);
  }
}

function redraw() {

  canvas.width = canvas.width; // clears the canvas

  drawEllipse(x + 40, y + 29, 160 - breathAmt, 6); // Shadow

  context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);
  context.drawImage(images["legs"], x, y);
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);

  drawEllipse(x + 47, y - 68 - breathAmt, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68 - breathAmt, 8, curEyeHeight); // Right Eye
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

function updateBreath() {

  if (breathDir === 1) {  // breath in
	breathAmt -= breathInc;
	if (breathAmt < -breathMax) {
	  breathDir = -1;
	}
  } else {  // breath out
	breathAmt += breathInc;
	if(breathAmt > breathMax) {
	  breathDir = 1;
	}
  }
}

function updateBlink() {

  eyeOpenTime += blinkUpdateTime;

  if(eyeOpenTime >= timeBtwBlinks){
	blink();
  }
}

function blink() {

  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
	eyeOpenTime = 0;
	curEyeHeight = maxEyeHeight;
  } else {
	setTimeout(blink, 10);
  }
}
$(document).ready(main);

/*class beginFight extends React.component {
  constructor() {
    super()

     this.maxPlayerHp = player.class.hp;
     this.playerHp = maxPlayerHp;
     this.playerAgi = Math.floor(4500 / player.class.agi);
     this.enemyHp = enemy.monster.hp;
     this.maxEnemyHp = enemyHp;
     this.enemyAgi = Math.floor(3500 / enemy.monster.agi);
  }

  handleButtonClick() {
    setTimeout(enemyAttack, this.enemyAgi, this.playerHp, this.maxPlayerHp, this.enemyAgi);
    setTimeout(playerAttack, this.playerAgi, this.enemyHp, this.maxEnemyHp, this.playerAgi);
  }

  render() {
    return
      <div class="col equipButton" id="equip"><span>Equip</span></div>
      <div class="col equipButton" id="unequip"><span>Unequip</span></div>
      <div class="col equipButton" id="fightButton">Fight</div>
      <div class="col equipButton" id="enemyLevelButton"><span>Harder enemy</span></div>;

  }
}*/
//React.render(<beginFight />, document.getElementById('buttonRow'));
