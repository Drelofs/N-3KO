import { GameScene } from "./game-scene";

export class UI extends Phaser.Scene {

    private collectedScraps = 0
    private livesField : Phaser.GameObjects.Text
    private lives : number

    private scoreField: Phaser.GameObjects.Text

    constructor(key:string) {
        super(key)
    }

    create() {
        this.scoreField = this.add.text(200, 20,  + this.collectedScraps+ ' SCRAPS COLLECTED',
        { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        this.livesField = this.add.text(1340, 20,  + this.lives+ ' LIVES LEFT', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)
    }

    update(){
       this.scoreField.text =  this.registry.values.score + ' SCRAPS COLLECTED'
       this.livesField.text = 'Lives : ' + this.registry.values.lives
    }

    
}