var database;
var backgroundImg;
var onlineSprite, friendsSprite;
var display = "main";
var userId;
var b;
var signUpForm, signInForm;
var finalKey;
function preload(){
    backgroundImg = loadImage("assets/background.png");
    titleImg = loadImage("assets/title.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    b =   createSprite(width/2, height/2);
    b.addImage("bg", backgroundImg);
    title = createSprite(width/2, height/2-250);
    title.addImage("title", titleImg);
    title.scale = 0.7;

    // playOnline = createSprite(width/2-220,height/2-50, 200,80);
    
    // playWithFriends = createSprite(width/2+185,height/2-50, 200,80);

    signin = createSprite(width/2-220,height/2-50, 200,80);
    signin.shapeColor = "blue";

    signup = createSprite(width/2+185,height/2-50, 200,80);
    signup.shapeColor = "red";
    
    onlineSprite = createSprite(width/2-220,height/2-50, 200,80);
    onlineSprite.shapeColor = "brown";
    onlineSprite.visible = false;
    
    friendsSprite = createSprite(width/2+185,height/2-50, 200,80);
    friendsSprite.shapeColor = "violet";
    friendsSprite.visible = false;

    two = createSprite(width/2-250,height/2, 200,50);
    three = createSprite(width/2,height/2, 200,50);
    four = createSprite(width/2+250,height/2, 200,50);

    two.shapeColor = "lightblue";
    three.shapeColor = "blue";
    four.shapeColor = "darkblue";

    two.visible = false;
    three.visible = false;
    four.visible = false;


    
}

function draw(){
    background(0);

    // var result = "";
    // var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // var charactersLength = characters.length;
    // for (var i = 0; i < charactersLength; i++) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    // console.log(result.slice(0,5));
    

    if(display == "main"){
        if(mousePressedOver(signup)){
            
            signup.visible=false;
            signin.visible=false;
            display = "signup";
        }
        else if(mousePressedOver(signin)){
            
            signup.visible=false;
            signin.visible=false;
            display = "signin";
        }
    }
    else if(display == "signup"){
        signUpForm = new SignUpForm();
        signUpForm.display();
        display = "displayedSignUp";
    }
    
    else if(display == "signin"){
        signInForm = new SignInForm();
        signInForm.display();
        display = "displayedSignIn";
    }
    else if(display == "online_friends"){
        signup.visible=false;
        signin.visible=false;
        onlineSprite.visible = true;
        friendsSprite.visible = true;

        if(mousePressedOver(onlineSprite)){
            
            signup.visible=false;
            signin.visible=false;
            signInForm.updateChoice("online");
            
            display = "choices";
        }
        else if(mousePressedOver(friendsSprite)){
            
            signup.visible=false;
            signin.visible=false;
            

            var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    var charactersLength = characters.length;
    for (var i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      finalKey = result.slice(0,5);
    }


    signInForm.updateChoice("friends");
    signInForm.updateSecretKey(finalKey);
            display = "choices";
        }
        
    }

    else if(display == "choices"){
        signup.visible=false;
        signin.visible=false;
        onlineSprite.visible=false;
        friendsSprite.visible=false;
        two.visible = true;
        three.visible = true;
        four.visible = true;

        if(mousePressedOver(two)){
            signInForm.updatePlayerCount(2);
        }
        else if(mousePressedOver(three)){
            signInForm.updatePlayerCount(3);
        }
        else if(mousePressedOver(four)){
            signInForm.updatePlayerCount(4);
        }
    }

    
    drawSprites();
}