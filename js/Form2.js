class Form2{
    constructor(){
        this.enterName = createElement("h3","Enter your name");
        this.input1 = createInput("").attribute("placeholder", "Enter your name");
        this.enterKey = createElement("h3","Enter the shared key: ");
        this.input2 = createInput("").attribute("placeholder", "Enter your key");
        this.submitButton = createButton("Submit");
    }
   
    setElementsPosition() {
        this.enterName.position(width/2-100, height/2-150);
        this.input1.position(width / 2 - 110, height / 2-100);
        this.enterKey.position(width/2-100, height/2-50);
        this.input2.position(width / 2 - 110, height / 2);
        this.submitButton.position(width / 2 - 100, height / 2 + 50);
      }
      setElementsStyle() {
        this.enterName.class("form1title");
        this.input1.class("form1input");
        this.enterKey.class("form1title");
        this.input2.class("form1input");
        this.submitButton.class("form1button");
      }
      hide() {
        this.enterName.hide();
        this.input1.hide();
        this.enterKey.hide();
        this.input2.hide();
        this.submitButton.hide();
      }
      handleMousePressed(){
          this.submitButton.mousePressed(()=>{
            console.log("form2 submit clicked");
            player = new Player(this.input1.value());
            player.checkKey(this.input2.value(), this.input1.value());
           // player.addPlayer();
          });
      }

      
      display() {
        this.setElementsPosition();
        this.setElementsStyle();
        this.handleMousePressed();
      }
}