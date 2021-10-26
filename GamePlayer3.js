class GamePlayer3{
    constructor(uniquekey, numberOfPlayers){
        this.uniquekey = uniquekey;
        this.numberOfPlayers = numberOfPlayers;
    }
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
    getInfo(){


        path = "friends/"+this.numberOfPlayers+"/"+uniquekey    
        /*
    uniqueKey {
            gameState:  1,
            player1:{
                name:"a",
                positionX:457,
                positionY:490
            },
            player2:{
                name:"a",
                positionX:457,
                positionY:490
            },
            playerCount:2

    }



        */

        database.ref(path).once("value", (data)=>{
            info = data.val()
              info.gameState  // 1
            info.playerCount   // 4
             xPos1 =  info.player1.positionX
             yPos1 =  info.player1.positionY
             xPos2 =  info.player2.positionX
             yPos2 =  info.player2.positionY
             xPos3 = info.player3.positionX
             yPos3 = info.player3.positionYz
             xPos4 = info.player4.positionX
             yPos4 = info.player4.positionY

             
             
            
        });

    }
    start() {
        player = new Player();
        Player.getPlayersInfo();
        player.getCarsAtEnd();
        car1 = createSprite(xPos1, yPos1)

        car2 = createSprite(xPos, yPos)

        car3 = createSprite(xPos,yPos)
        car1.addImage("car1", car1_img);
        car1.scale = 0.07;
    
       
        car2.addImage("car2", car2_img);
        car2.scale = 0.07;
        
        car3.addImage("car3", car3_img);
        car3.scale = 0.5;

        
    
        car1.addImage("Blast", blastImg);
        car2.addImage("Blast", blastImg);
        car3.addImage("Blast", blastImg);
        
    
        cars = [car1, car2,car3];
    
        fuels = new Group();
        powerCoins = new Group();
    
        obstacles = new Group();
    
        var obstaclesPositions = [
          { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
          { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
          { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
          { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
          { x: width / 2, y: height - 2800, image: obstacle2Image },
          { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
          { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
          { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
          { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
          { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
          { x: width / 2, y: height - 5300, image: obstacle1Image },
          { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
        ];
    
        
        this.addSprites(fuels, 4, fuelImg, 0.02);
    
        this.addSprites(powerCoins, 18, powerCoinImage, 0.09);
    
        this.addSprites(
          obstacles,
          obstaclesPositions.length,
          obstacle1Image,
          0.04,
          obstaclesPositions
        );
      }
    
      addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y;
    
          //C41 //SA
          if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            spriteImage = positions[i].image;
          } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(-height * 4.5, height - 400);
          }
          var sprite = createSprite(x, y);
          sprite.addImage("sprite", spriteImage);
    
          sprite.scale = scale;
          spriteGroup.add(sprite);
        }
      }
    
      handleElements() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");
    
        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 60, 40);
    
        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 50, 80);
    
        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 50, 130);

        this.leader3.class("leadersText");
        this.leader3.position(width/3-50, 180);

        this.leader4.class("leadersText");
        this.leader4.position(width/3-50, 230);
      }
    
      play() {
        this.handleElements();
        this.handleResetButton();
    
        Player.getPlayersInfo();
        player.getCarsAtEnd();
    
        if (allPlayers !== undefined) {
          image(track, 0, -height * 5, width, height * 6);
    
          this.showFuelBar();
          this.showLife();
          this.showLeaderboard();
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the cars in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
            var currentLife = allPlayers[plr].life;
            if(currentLife <=0)
            {
              cars[index-1].changeImage("Blast");
             cars[index-2].changeImage("Blast");
            }
            cars[index - 1].position.x = x;
            cars[index - 1].position.y = y;
            cars[index-2].position.x= x;
            cars[index - 2].positon.y = y;
            if (index === player.index) {
              stroke(10);
              fill("red");
              ellipse(x, y, 60, 60);
             
              this.handleFuel(index);
              this.handlePowerCoins(index);
              this.handleCarACollisionWithCarB(index);
              this.handleObstacleCollision(index);
              if(player.life<= 0)
              {
                this.blast = true;
                this.playerMoving = false;
              }
              // Changing camera position in y direction
              camera.position.y = cars[index - 1].position.y;
            }
          }
    
          if (this.playerMoving) {
            player.positionY += 5;
            player.update();
          }
    
          this.handlePlayerControls();
    
          const finshLine = height * 5 - 50;
    
          if (player.positionY > finshLine) {
            gameState = 2;
            player.rank += 1;
            Player.updateCarsAtEnd(player.rank);
            player.update();
            this.showRank();
          }
    
          drawSprites();
        }
      }
    

      showLife() {
        push();
        image(lifeImage, width / 2 - 130, height - player.positionY - 400, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 400, 185, 20);
        fill("#f50057");
        rect(width / 2 - 100, height - player.positionY - 400, player.life, 20);
        noStroke();
        pop();
      }
    
      showFuelBar() {
        push();
        image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
        fill("white");
        rect(width / 2 - 100, height - player.positionY - 350, 185, 20);
        fill("#ffc400");
        rect(width / 2 - 100, height - player.positionY - 350, player.fuel, 20);
        noStroke();
        pop();
      }
    
      showLeaderboard() {
        var leader1, leader2, leader3,leader4;
        var players = Object.values(allPlayers);
      for(var i=0; i<players.length; i++)
      {
         if(players[i].positionY<player[0].positionY)
         {
            t = players[i].positionY;
            players[i].positionY = players[0].positionY;
            players[0].positionY =t;
         }
      }
      for(i=0;i<players.length;i++)
      {
        leader1=
      
        players[0].rank +
        "&emsp;" +
        players[0].name +
        "&emsp;" +
        players[0].score;

      leader2 =
        players[1].rank +
        "&emsp;" +
        players[1].name +
        "&emsp;" +
        players[1].score;

        leader3 = 
        players[2].rank +
        "&emsp;" +
        players[2].name +
        "&emsp;" +
        players[2].score;
      }
    
        this.leader1.html(leader1);
        this.leader2.html(leader2);
        this.leader3.html(leader3);
      }
    
      handlePlayerControls() {
        if(!this.blast)
        {
        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
    
        if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          this.leftKeyActive = true;
          player.positionX -= 5;
          player.update();
        }
    
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
    
          this.leftKeyActive = false;
          player.positionX += 5;
    
          player.update();
        }
      }
      }
    
      handleFuel(index) {
       
        cars[index - 1].overlap(fuels, function(collector, collected) {
          player.fuel = 185;
      
          collected.remove();
        });
    
   
        if (player.fuel > 0 && this.playerMoving) {
          player.fuel -= 0.3;
        }
    
        if (player.fuel <= 0) {
          gameState = 2;
          this.gameOver();
        }
      }
    
      handlePowerCoins(index) {
        cars[index - 1].overlap(powerCoins, function(collector, collected) {
          player.score += 21;
          player.update();
         
          collected.remove();
        });
      }
    
      showRank() {
        swal({
          title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
          text: "You reached the finish line successfully",
          imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        });
      }
    
      gameOver() {
        swal({
          title: `Game Over`,
          text: "Oops you lost the race....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
    
    
    
      handleObstacleCollision(index)
      {
        if(cars[index-1].collide(obstacles))
        {
        if(this.leftKeyActive)  
        {
          player.positionX += 100;
        }
        else{
          player.positionX -= 100;
        }
          if(player.life>0)
          {
    
            player.life -= 185/4;
    
          }
          player.update();
        }
    
    
      }
    
      handleCarACollisionWithCarB(index)
      {
        if(index == 1)
        {
          if(cars[index-1].collide(cars[1]))
          {   
             if(this.leftKeyActive)
             {
                player.positionX += 100;
             }
             else{
               player.positionY -= 100;
             }
            
             if(player.life>0)
             {
               player.life -= 185/4;
               
             }
            player.update();
          }
        }
    
    
        if(index == 2)
        {
          if(cars[index-1].collide(cars[0]))
          {
             if(this.leftKeyActive)
             {
                player.positionX += 100;
             }
             else{
               player.positionY -= 100;
             }
            
             if(player.life>0)
             {
               player.life -= 185/4;
               
             }
            player.update();
          }
        }
        
    
    
    
      }
    
    
      end()
      {
        console.log("Game Over");
      }
    
    }
    
    


