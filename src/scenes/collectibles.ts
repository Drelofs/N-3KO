import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"
import { Hill } from "../objects/hill"
import { Arcade } from "../../arcade/arcade"



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
        this.bgtile = this.add.tileSprite(0, 0, 1800, 900, 'WASTELAND1')
        this.bgtile.setOrigin(0,0)
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
