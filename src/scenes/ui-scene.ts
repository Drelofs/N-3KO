import { GameScene } from "./game-scene";

export class UI extends Phaser.Scene {


    private livesField : Phaser.GameObjects.Text
    private lives : number

    private scoreField: Phaser.GameObjects.Text
    private roboAnimal = {
        collected: false
    }


    
    constructor(key:string) {
        super(key)

    }


    create() {
        
        this.scoreField = this.add.text(200, 20, this.registry.values.scraps + ' SCRAPS COLLECTED', 
            { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        

        this.livesField = this.add.text(1340, 20, "Lives : ", { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)
    
        this.add.image(1150, 600, 'raElephant').setOrigin(0, 0);
        this.roboAnimal.collected = true;
        this.add.text(1150, 550, 'RoboElephant Collected!')
    }
    update(){
       this.scoreField.text =  this.registry.values.scraps + ' SCRAPS COLLECTED'
       this.livesField.text = 'Lives : ' + this.registry.values.lives
    }

    
}