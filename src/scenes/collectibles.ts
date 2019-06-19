import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"
import { Hill } from "../objects/hill"
import { Arcade } from "../arcade/arcade"



export class Collectibles extends Phaser.Scene {

    private arcade : Arcade
    private joystickListener: EventListener
    private player : Player
    private hills: Phaser.GameObjects.Group
    private scraps: Phaser.Physics.Arcade.Group
    private collectedScraps = 0
    private scoreField
    private enemies: Phaser.GameObjects.Group
    private bgtile: Phaser.GameObjects.TileSprite

    private lives = 9
    private livesField

    private timer : Phaser.Time.TimerEvent
    private hitTimeout = false

    constructor() {
        super({ key: "Collectibles" })

        this.arcade = new Arcade()
        
    }

    init(): void {
        console.log("dit is de Collectiblescene")

    }

    create(): void {
        this.bgtile = this.add.tileSprite(0, 0, 1800, 900, 'pixels')
        this.bgtile.setOrigin(0,0)

        this.add.text(700, 60, 'COLLECT ALL ROBOANIMALS',
        { fontFamily: 'Arial Black', fontSize: 30, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        this.add.image(350,300, 'raElephant')
        this.add.image(650,300, 'raFox')
        this.add.image(950,300, 'raGiraffe')
        this.add.image(350,600, 'raGorilla')
        this.add.image(650,600, 'raHippo')
        this.add.image(950,600, 'raTurtle')

        let back = this.add.image(100,50, 'backArrow')
        back.setInteractive()
        back.on('pointerdown', (pointer) => {
        this.scene.start('StartScene')
        })
    }

   
    update(){

        for(let joystick of this.arcade.Joysticks){
            joystick.update()
                    
            // just log the values
            if(joystick.Left)  console.log('LEFT')
            if(joystick.Right) console.log('RIGHT')
            if(joystick.Up)    console.log('UP')
            if(joystick.Down)  console.log('Down')
            
            // use the values to set X and Y velocity of a player
            this.player.setVelocityX(joystick.X * 400)
            this.player.setVelocityY(joystick.Y * 400)
        }
    }
}
