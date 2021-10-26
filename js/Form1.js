class Form1{
    constructor(){
        this.enterName = createElement("h3","Enter your name");
        this.input = createInput("").attribute("placeholder", "Enter your name");
        this.submitButton = createButton("Submit");
    }
   
    setElementsPosition() {
        this.enterName.position(width/2-100, height/2-150);
        this.input.position(width / 2 - 110, height / 2-100);
        this.submitButton.position(width / 2 - 100, height / 2 - 50);
      }
      setElementsStyle() {
        this.enterName.class("form1title");
        this.input.class("form1input");
        this.submitButton.class("form1button");
      }
      hide() {
        this.enterName.hide();
        this.input.hide();
        this.submitButton.hide();
      }
      handleMousePressed(){
          this.submitButton.mousePressed(()=>{
            
            player = new Player(this.input.value());
            player.generateRandomKey();
            player.index=1;
            player.addPlayer(1,this.input.value());
            player.updateKeyCount();
          });
      }

      
      display() {
        this.setElementsPosition();
        this.setElementsStyle();
        this.handleMousePressed();
      }
}