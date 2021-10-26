class Player{
    constructor( name) {
      this.name = name;
      this.index = null;
      this.key = null;
    }
    generateRandomKey(){
        // database.ref("/keyNumber/").on("value", (data)=>{
        //     this.key = 1+data.val();
        // })

        // database.ref("/").update({
        //     keyNumber = this.key
        // })
        this.key =11;

    //     var result = "";
    // var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // var charactersLength = characters.length;
    // for (var i = 0; i < length; i++) {
    //   result += characters.charAt(Math.floor(Math.random() * charactersLength));
    // }
    }
    checkKey(keyValue, name){
       
        //      6/key:6
        database.ref("/keys/"+keyValue+"/key/").on("value", data => {
           keyFromDatabase = data.val();
           console.log(keyFromDatabase);
        });
        if(keyFromDatabase){
            console.log("(((((");
            console.log("key database "+keyFromDatabase);
            console.log("key value "+keyValue);
            console.log(")))))");
            database.ref("keys/"+keyValue+"/count").once("value", data=>{
                countFromDatabase = data.val();
                console.log("count "+countFromDatabase);
                this.index = countFromDatabase+1;
                this.key = keyFromDatabase;
                console.log("index "+this.index);
                console.log(this.key);
                this.updateKeyCount();
                this.addPlayer(this.index, this.name);
               
                
            })

        }
    }

    updateKeyCount(){
        database.ref("/keys/"+this.key+"/").update({
            count:this.index,
            key:this.key
        });
    }
    addPlayer(index, name){
        
        database.ref("/keys/"+this.key+"/player"+index+"/").update({
            name:name,
        });
        gameState = 5;
    }
    
}