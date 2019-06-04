export class LogoScene extends Phaser.Scene {
    timedEvent

   constructor() {
       super({key: "LogoScene"})
       
   }

   init(): void {

   }

   preload(): void {
   }

   create(): void {

       let fade = true;

       //Adds studio logo to screen
       let image = this.add.image(200, 200, 'logo',).setOrigin(0, 0)
       let background = this.cameras.main.setBackgroundColor('#FFFFFF')
       //Sets alpha of logo to 0
       image.alpha = 0;
       
       //Every second, a function that changes the alpha of the logo is run 
       this.timedEvent = this.time.delayedCall(3000, switchFade,[], this);
       this.timedEvent = this.time.delayedCall(4000, goToScene,[], this);
         
       function switchFade(){
           if(fade==true){
               fade = false;
           } else {
               fade = true;
           }
       }

       function goToScene(){
           this.scene.start("LoadingScene")
       }

       function update(){
           
           if(fade == true){
               image.alpha += 0.2;
           } else {
               image.alpha -= 0.2;
           }

       }
       setInterval(()=> update(),125)

       function clamp(num, min, max) {
           return num <= min ? min : num >= max ? max : num;
       }

   }
}