class StartPlayer{
    constructor(secretKey, startpath, numberOfPlayers){
        this.secretKey = secretKey;
        this.path=startpath;
        this.numberOfPlayers=numberOfPlayers;
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

    hide(){
        this.nameLabel.hide();
        this.nameInput.hide();
        this.submitButton.hide();

    }

    handleMousePressed(){
        if(this.numberOfPlayers == "two"){
            x = width/4;
        }
        else if(this.numberOfPlayers == "three"){
            x = width/3;
        }
        else if(this.numberOfPlayers == "four"){
            x = width/8;
        }


        this.submitButton.mousePressed(()=>{
            database.ref(this.path+"/player1").update({
                playerCount : 1,
                secretKey:this.secretKey,
                name:this.nameInput.value(),
                positionX:int(x),
                positionY:height-200,
                rank:this.rank,
                score:this.score,
                fuel:this.fuel,
                life:this.life

            });

            database.ref(this.path).update({
                playerCount:1,
                gameState:0
            })
            this.hide();
            var message = `
      Hello ${this.nameInput.value()}
      </br>wait for other player to join...
      </br> The secret key = ${this.secretKey}`;
      this.greeting.html(message);
            this.greeting.position(width/2-150,height/2);
        });
        
        // game = new Game( this.secretKey );


    }

    display(){
        this.positionElements();
        this.handleMousePressed();
    }
}