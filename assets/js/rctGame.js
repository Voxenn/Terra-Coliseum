
let enemies = []
let boss = []

let weapons = []
let armor = []

let player = {}
let equipment = []
let equipFlag = false
let enemyDamage = 0
let playerDamage = 0
let critChance = 0
let xIsCrit = false
let enemyMiss = false
let playerMiss = false
var playerPos = 0
var drop = 0
var enemyTimeout
var playerTimeout

/* Characters will be defined by the follow criteria
   1. Name
   2. Hit points
   3. Attack damage
   4. Defense
   5. Agility
   6. Critical chance
   7. Magic attack
   8. Image location
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
 img: 'swordman.svg'
},
{name: 'Squire',
 hp: 80,
 atk: 5,
 def: 3,
 agi: 5,
 crit: 1,
 matk: 0,
 level: 1,
 img: 'barbute.svg'},
 {name: 'Ranger',
 hp: 60,
 atk: 2,
 def: 5,
 agi: 9,
 crit: 50,
 matk: 0,
 level: 1,
 img: 'bowman.svg'}
]

/* Weapons will be defined by the following criteria:
  1. Weapon name
  2. Rarity
  3. Attack damage
  4. Agility
  5. Critical chance
*/

let commonWeapons = [
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
}]

let uncommonWeapons = [
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
 }]

let rareWeapons = [
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
}]
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
   7. Img location
 */

 let tutorialEnemies = [
   {name: 'Sewer Rat',
    hp: 55,
    atk: 3,
    def: 2,
    agi: 2,
    matk: 0,
    img: 'rat.svg'},
   {name: 'Wild Wolf',
    hp: 75,
    atk: 4,
    def: 1,
    agi: 3,
    matk: 0,
    img: 'wolf.svg'}
 ]

 let easyEnemies = [
   {name: 'Ogre',
    hp: 200,
    atk: 10,
    def: 14,
    agi: 5,
    matk: 0,
    img: 'ogre.svg'},
   {name: 'Goblin',
    hp: 125,
    atk: 8,
    def: 10,
    agi: 6,
    matk: 0,
    img: 'goblin.svg'
  }
 ]

 'use strict';

 const e = React.createElement;
 const f = React.createElement;
 class LikeButton extends React.Component {
   constructor(props) {
     super(props);
     this.state = { liked: false };
   }

   render() {
     if (this.state.liked) {
       return 'You liked this.';
     }

     return e(
       'button',
       { onClick: () => this.setState({ liked: true }) },
       'Like'
     );
   }
 }

/*var PlayerButtonComponent = React.createClass({
componentDidMount: function() {
  this.render
}

  render: function(){
    return(
      <div class="col equipButton" id="equip"><span>Equip</span></div>
      <div class="col equipButton" id="unequip"><span>Unequip</span></div>
      <div class="col equipButton" id="fightButton">Fight</div>
      <div class="col equipButton" id="enemyLevelButton"><span>Harder enemy</span></div>
    );
  }
});


   */
/*const beginFight = <div class="col equipButton" id="equip">Equip</div>;
var beginFight = React.createElement(
  "div",
  { className: "col equipButton", id: "equip" },
  React.createElement("span", null,"Equip")
);*/
class BeginFight extends React.Component {
 constructor(props) {
     super(props);

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
     return (<div>
       <div class="col equipButton" id="equip"><span>Equip</span></div>
             <div class="col equipButton" id="unequip"><span>Unequip</span></div>
             <div class="col equipButton" id="fightButton">Fight</div>
             <div class="col equipButton" id="enemyLevelButton"><span>Harder enemy</span></div>
         </div>);
		}
   }

 }
//const domContainer = document.querySelector('#buttonRow');
//ReactDOM.render(e(LikeButton), domContainer);*/
ReactDOM.render(<BeginFight />, document.getElementById('buttonRow'));
