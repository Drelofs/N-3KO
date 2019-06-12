import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"
import { isAbsolute } from "path";
import { Arcade } from "../../arcade/arcade"



export class GameScene extends Phaser.Scene {

    private arcade : Arcade
    private joystickListener: EventListener
    private player : Player
    private platforms: Phaser.GameObjects.Group
    private scraps: Phaser.Physics.Arcade.Group
    private collectedScraps = 0
    private scoreField 
    private enemies: Phaser.GameObjects.Group
    private bgtile: Phaser.GameObjects.TileSprite

    private lives = 9
    private livesField

    constructor() {
        super({ key: "GameScene" })

        this.arcade = new Arcade()
        
        // The game must wait for de joysticks to connect
        document.addEventListener("joystick0button0", () => this.playerOneFire())
    }

    private playerOneFire() {
        console.log("Fire");
        
    }

    init(): void {
        console.log("dit is de gamescene")

    }

    create(): void {
        this.bgtile = this.add.tileSprite(0, 0, 1800, 900, 'WASTELAND1')
        this.bgtile.setOrigin(0,0)

       
        // 11 SCRAPS
        this.scraps = this.physics.add.group({
            key: 'scrap',
            repeat: 20,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.enemies = this.add.group()
        for (let i =0; i <1; i++){
            this.enemies.add(new enemy(this, 700, 755), true)
        }

        // TODO add player and enemy
        
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            // new Platform(this, 800, 870, "ground"),
            new Platform(this, 800, 870, "platform"),
            new Platform(this, 200, 700, "platform"),
            // new MovingPlatform(this, 900, 400, "platform")
        ], true)

        this.scoreField = this.add.text(200, 20,  + this.collectedScraps+ ' SCRAPS COLLECTED', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)
        this.livesField = this.add.text(900, 300,  + this.lives+ ' LIVES LEFT', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)

        this.physics.world.bounds.width = 1440 * 2
        this.physics.world.bounds.height = 900

        this.cameras.main.setSize(1440,900) //canvas
        this.cameras.main.setBounds(0,0,1440 * 2,900) //game
        this.cameras.main.startFollow(this.player)

    }

    private hitEnemy(player: Player, enemy) {
        
        this.registry.values.lives--
        this.lives--
        this.livesField.text = this.lives+ ' Lives Left'

        if (this.lives === 0) {
            this.collectedScraps = 0;
            this.scene.start("EndScene")
        }
    }


    private collectScraps(player : Player , scraps) : void {
        this.scraps.remove(scraps, true, true)
        this.registry.values.score++
        this.collectedScraps++

        // TO DO check if we have all the stars, then go to the end scene
        this.scoreField.text = this.collectedScraps+ ' SCRAPS COLLECTED'
        
        if(this.collectedScraps == 7){
            this.scene.start('GameScene2')
           
        }
    }

    // private gameLoop() : void {

    //     for(let joystick of this.arcade.Joysticks){
    //         joystick.update()

    //         // example: read directions as true / false
    //         if(joystick.Left)  console.log('LEFT')
    //         if(joystick.Right) console.log('RIGHT')
    //         if(joystick.Up)    console.log('UP')
    //         if(joystick.Down)  console.log('Down')
    //     }

    //     requestAnimationFrame(() => this.gameLoop())
    // }

    

    update(){
        this.player.update()
        this.bgtile.tilePositionX += 1

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
