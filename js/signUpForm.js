class SignUpForm{
    constructor(){
        this.name = "";
        this.uniqueID = "";
        this.password = "";
        this.confirmPassword = "";
        this.choice="";
        this.numberOfPlayers = 1;
        this.secretKey = "";
        this.nameLabel = createElement("Label","Enter your name :");
        this.nameInput = createInput();
        this.uniqueIDLabel = createElement("Label","Enter your unique ID :");
        this.uniqueIDInput = createInput();
        this.passwordLabel = createElement("Label","Enter your password :");
        this.passwordInput = createInput();
        this.confirmPasswordLabel = createElement("Label","Enter your password again to confirm :");
        this.confirmPasswordInput = createInput();
        this.submitButton = createButton("Submit");
    }

    positionElements(){
        this.nameLabel.position(width/2-100,height/2-100);
        this.nameInput.position(width/2-100,height/2-80);
        this.uniqueIDLabel.position(width/2-100,height/2-50);
        this.uniqueIDInput.position(width/2-100,height/2-30);
        this.passwordLabel.position(width/2-100,height/2);
        this.passwordInput.position(width/2-100,height/2+20);
        this.confirmPasswordLabel.position(width/2-100,height/2+50);
        this.confirmPasswordInput.position(width/2-100,height/2+70);
        this.submitButton.position(width/2-100, height/2+100);
    }

    hide(){
        this.nameLabel.hide();
        this.nameInput.hide();
        this.uniqueIDLabel.hide();
        this.uniqueIDInput.hide();
        this.passwordLabel.hide();
        this.passwordInput.hide();
        this.confirmPasswordLabel.hide();
        this.confirmPasswordInput.hide();
        this.submitButton.hide();
    }

    handleMousePressed(){
        this.submitButton.mousePressed(()=>{
            userId = this.uniqueIDInput.value();
            

            
            database.ref("users").once("value",(data)=>{
                var k = data.val();
                var usersKeys = Object.keys(k);
                var userValues = Object.values(k);
                console.log(k);
                console.log(usersKeys);
                for(var i=0; i<usersKeys.length; i++){
                    if(usersKeys[i] == userId){
                        alert("Account exists!");
                    }
                    else{

                        database.ref("users/"+this.uniqueIDInput.value()+"/").update({
                        name:this.nameInput.value(),
                        uniqueID:this.uniqueIDInput.value(),
                        password: this.passwordInput.value(),
                        choice:"",
                        numberOfPlayers:1,
                        secretKey: ""
                     });
                     
                     alert("Account registered successfully!");
                    }

                    display = "signin";


                }
            });


            
           
            this.hide();
        });
    }

    display(){
        this.positionElements();
        this.handleMousePressed();
    }

}


