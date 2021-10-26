class SignInForm{
    constructor(){
        this.name = "";
        this.uniqueID = "";
        this.password = "";
        this.choice = "";
        this.numberOfPlayers = 1;
        this.secretKey = "";
        this.uniqueIDLabel = createElement("Label","Enter your unique ID :");
        this.uniqueIDInput = createInput();
        this.passwordLabel = createElement("Label","Enter your password :");
        this.passwordInput = createInput();
        this.submitButton = createButton("Submit");
        

    }

    positionElements(){
        this.uniqueIDLabel.position(width/2-100,height/2-50);
        this.uniqueIDInput.position(width/2-100,height/2-30);
        this.passwordLabel.position(width/2-100,height/2);
        this.passwordInput.position(width/2-100,height/2+20);
        this.submitButton.position(width/2-100, height/2+50);
    }

    hide(){
        this.uniqueIDLabel.hide();
        this.uniqueIDInput.hide();
        this.passwordLabel.hide();
        this.passwordInput.hide();
        this.submitButton.hide();
    }

    handleMousePressed(){
        this.submitButton.mousePressed(()=>{
            userId = this.uniqueIDInput.value();
            

            var uid = this.uniqueIDInput.value();
            var password = this.passwordInput.value();
            var database_uid;
            var database_password;

            database.ref("users").once("value",(data)=>{
                var k = data.val();
                var usersKeys = Object.keys(k);
                console.log(usersKeys);
                for(var i=0; i<usersKeys.length; i++){
                    if(usersKeys[i] == userId){
                       // alert("Account exists!");
                        database_uid = userId;
                        this.uniqueID = userId;
                        

                        database.ref("users/"+userId+"/password").once("value",(data)=>{
                            database_password = data.val();
                            if(password == database_password){
                                alert("Success!");
                                this.password = password;

                                database.ref("users/"+userId+"/name").once("value",(data)=>{
                                    this.name = data.val();
                                });

                                display = "online_friends";
                                this.hide();
                            }


                            else{
                                alert("Wrong Password");
                                display = "signin";
                            }
                        })

                    }


                }
            });



        });

    }

    updateChoice(choice){
        this.choice = choice;
        database.ref("users/"+this.uniqueID+"/").update({
            choice:choice
        })
    }

    updatePlayerCount(numberOfPlayers){
        this.numberOfPlayers = numberOfPlayers;
        database.ref("users/"+this.uniqueID+"/").update({
            numberOfPlayers:numberOfPlayers
        })
    }

    updateSecretKey(secretKey){
        this.secretKey = secretKey;
        database.ref("users/"+this.uniqueID+"/").update({
            secretKey:secretKey
        })
    }

    display(){
        this.positionElements();
        this.handleMousePressed();
    }
}