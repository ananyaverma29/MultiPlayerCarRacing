var gameState = 0;
var logoScreen;
var form1, form2, player, playername;
var r = 6,keyFromDatabase, countFromDatabase;
function preload(){


}

function setup(){
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    logoScreen = createSprite(width/2, height/2, width, height);
    logoScreen.shapeColor = "brown";

    playButton = createSprite(width/2-200,height/2,100,100);
    playButton.shapeColor = "blue";
    playButton.visible = false;

    keyButton = createSprite(width/2+200, height/2, 100, 100);
    keyButton.shapeColor = "green";
    keyButton.visible = false;
}

function draw(){
    background(0);
    console.log(gameState);

    if(gameState == 0){
        background("violet");
        if(mousePressedOver(logoScreen)){
            gameState=1;
        }
    }
    else if(gameState == 1){
        logoScreen.visible = false;
        background("indigo");
        playButton.visible = true;
        keyButton.visible = true;

        if(mousePressedOver(playButton)){
            console.log("play clicked");
            gameState=2;
        }
        else if(mousePressedOver(keyButton)){
            gameState=3;
        }

    }
    else if(gameState == 2){
        playButton.visible = false;
        keyButton.visible = false;
        form1 = new Form1();
        form1.display();
        gameState = 4;
    }
    else if(gameState == 3){
        playButton.visible = false;
        keyButton.visible = false;
        form2 = new Form2();
        form2.display();
        gameState = 4;
    }
    else if(gameState == 5){
        form1.hide();
        form2.hide();
    }

    drawSprites();
}