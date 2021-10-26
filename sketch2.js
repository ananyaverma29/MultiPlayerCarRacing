var canvas;
var backgroundImage, bgImg, car1_img, car2_img, track;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2,car3, car4;
var cars = [];
var car3_img, car4_img;
var  blastImg;
var blast;
var game2, game3, game4;
var obstacle1Image;
var obstacle2Image;
var fuelImg;
var lifeImage;
var powerCoinImage,t;
var player;
var gameState;
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/track.jpg");
  car3_img = loadImage("car3.png");
  car4_img = loadImage("car4.png");
  blastImg = loadImage("blast.png");
  fuelImg = loadImage("Fuel1.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
  lifeImage = loadImage("./assets/life.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game2 = new GamePlayer2();
  game2.getState();
  game2.start();
  game3 = new GamePlayer3();
  game3.getState();
  game3.start();
  game4 = new GamePlayer4();
  game4.getState();
  game4.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 2 && gameState == 1) {
    game2.update(1);
    game2.play();

  }

  else if(playerCount === 3 && gameState == 1)
  {
    game3.update(1);
    game3.play();

  }
  else if(playerCount === 4 && gameState == 1)
{
  game4.update(1);
  game4.play();
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
