class OnlineForm{
    constructor(numberOfPlayers){
        this.numberOfPlayers=numberOfPlayers;
        this.key=null;
        this.name = null;
        this.index = null;
        this.positionX = 0;
        this.positionY = 0;
        this.rank = 0;
        this.fuel = 185;
        this.life = 185;
        this.score = 0;

        this.nameLabel = createElement("Label","Enter your name :");
        this.nameInput = createInput();
        this.submitButton = createButton("Submit");
        this.greeting = createElement("h1");
    }

    positionElements(){
        this.nameLabel.position(width/2-100,height/2-100);
        this.nameInput.position(width/2-100,height/2-80);
        this.submitButton.position(width/2-100, height/2-50);
    }

    hide()
    {
        this.nameLabel.hide();
        this.nameInput.hide();
        this.submitButton.hide();

    }

     handleMousePressed(){
         gameState = 0;
         this.submitButton.mousePressed(()=>{
         //  database.ref("online/"+this.numberOfPlayers+"/lastKey").once("value",(data)=>{
              // this.key = data.val();
              //  console.log(this.key);
            //});
            
           // database.ref("online/"+this.numberOfPlayers+"/"+this.key).once("value",(data)=>{
            //    var pCount = data.val();
             //   player.index = playerCount;
              //  player.addPlayer();
              //  player.updateCount(playerCount);
           // });
      //  });

      console.log("inisde submit button");
      database.ref("friends/two/"+this.uniqueIDInput.value()+"/playerCount").once("value",(data)=>{
        var pCount = data.val();
        console.log("***");
        console.log(pCount);
        console.log("***");
        if(pCount <2){
            x=(width)-(width/2);
            database.ref("friends/two/"+this.uniqueIDInput.value()+"/player"+(pCount+1)).update({
                playerCount : pCount+1,
                name:this.nameInput.value(),
                positionX:int(x),
                positionY:height-200,
                rank:this.rank,
                score:this.score,
                fuel:this.fuel,
                life:this.life
            });
            if((pCount+1) == 2){
                gameState = 1;
            }
            database.ref("friends/two/"+this.uniqueIDInput.value()).update({
                playerCount:pCount+1,
                gameState:gameState
            })
            this.hide();
        
    }
})
         
 });


    
        

////////////////////////////////////////////////////////////////////


database.ref("friends/three/"+this.uniqueIDInput.value()+"/playerCount").once("value",(data)=>{
  var pCount = data.val();
  console.log("***");
  console.log(pCount);
  console.log("***");
  if(pCount <3){
      x=(width)-(width/2);
      database.ref("friends/two/"+this.uniqueIDInput.value()+"/player"+(pCount+1)).update({
          playerCount : pCount+1,
          name:this.nameInput.value(),
          positionX:int(x),
          positionY:height-200,
          rank:this.rank,
          score:this.score,
          fuel:this.fuel,
          life:this.life
      });
      if((pCount+1) == 3){
          gameState = 1;
      }
      database.ref("friends/two/"+this.uniqueIDInput.value()).update({
          playerCount:pCount+1,
          gameState:gameState
      })
      this.hide();

    }
});

         
 

///////////////////////////////////////////////////////////////////
 
database.ref("friends/three/"+this.uniqueIDInput.value()+"/playerCount").once("value",(data)=>{
  var pCount = data.val();
  console.log("***");
  console.log(pCount);
  console.log("***");
  if(pCount <3){
      x=(width)-(width/2);
      database.ref("friends/three/"+this.uniqueIDInput.value()+"/player"+(pCount+1)).update({
          playerCount : pCount+1,
          name:this.nameInput.value(),
          positionX:int(x),
          positionY:height-200,
          rank:this.rank,
          score:this.score,
          fuel:this.fuel,
          life:this.life
      });
      if((pCount+1) == 3){
          gameState = 1;
      }
      database.ref("friends/three/"+this.uniqueIDInput.value()).update({
          playerCount:pCount+1,
          gameState:gameState
      })
      this.hide();

 
    }
});
     

/////////////////////////////////////////////////////////
   
database.ref("friends/four/"+this.uniqueIDInput.value()+"/playerCount").once("value",(data)=>{
    var pCount = data.val();
    console.log("***");
    console.log(pCount);
    console.log("***");
    if(pCount <3){
        x=(width)-(width/2);
        database.ref("friends/four/"+this.uniqueIDInput.value()+"/player"+(pCount+1)).update({
            playerCount : pCount+1,
            name:this.nameInput.value(),
            positionX:int(x),
            positionY:height-200,
            rank:this.rank,
            score:this.score,
            fuel:this.fuel,
            life:this.life
        });
        if((pCount+1) == 4){
            gameState = 1;
        }
        database.ref("friends/four/"+this.uniqueIDInput.value()).update({
            playerCount:pCount+1,
            gameState:gameState
        })
        this.hide();
  
    }
      })
     }

    

 
    display()
    {
        this.positionElements();
        this.handleMousePressed();
    }
         }
        
