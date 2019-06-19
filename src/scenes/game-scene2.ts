import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene2 extends Phaser.Scene {

    private player : Player
    // private hills: Phaser.GameObjects.Group
    private platforms: Phaser.GameObjects.Group
    private scraps: Phaser.Physics.Arcade.Group
    private collectedScraps = 0
    private scoreField
    private enemies: Phaser.GameObjects.Group

    private lives = 9
    private livesField

    private timer : Phaser.Time.TimerEvent
    private hitTimeout = false

    // Collect a roboAnimal
    private roboAnimal = {
        collected: false
    }

    private imageArray

    constructor() {
        super({ key: "GameScene2" })
    }

    init(): void {
        console.log("dit is de GameScene2")
    }

    create(): void {
        this.add.image(0, 0, 'level_ice').setOrigin(0, 0)
         
    
        // 11 STARS
        this.scraps = this.physics.add.group({
            key: 'scrap',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.enemies = this.add.group()
        for (let i =0; i <1; i++){
            this.enemies.add(new enemy(this, 700, 255), true)
        }

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 870, "ground"),
            // new Platform(this, 400, 300, "HILL1"),
            // new Platform(this, 200, 150, "ice"),
            // new MovingPlatform(this, 300, 300, "platform"),
            // new Platform(this, 500, 200, "platform"),
            // new MovingPlatform(this, 600, 400, "platform")
        ], true)

        this.scoreField = this.add.text(200, 20,  + this.collectedScraps+ ' SCRAPS COLLECTED',
        { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2)

        this.livesField = this.add.text(1340, 20,  + this.lives+ ' LIVES LEFT', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.enemies, this.platforms)
        
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)
    }

    private setTimer() {
        this.hitTimeout = false
    }

    private hitEnemy(player: Player, enemy: enemy, ) {
        if(this.hitTimeout == false) {
            this.registry.values.lives--
            this.lives--
            this.livesField.text = this.lives + ' Lives Left'
            this.hitTimeout = true
            this.timer = this.time.addEvent({
                delay: 2000,
                callback: () => this.setTimer(),
                repeat: 0,
            })
            this.add.tween({
                targets: this.player,
                ease: 'Sine.easeInOut',
                duration: 200,
                alpha: 0.4,
                color: 0xff0000,
                yoyo:true,
                repeat:4
            })
        }
        
        // Game over. Reset scraps & Lives
        if (this.lives === 0) {
            this.collectedScraps = 0;
            this.scene.start("EndScene")
            this.lives = 9
        }
    }

    private collectScraps(player : Player , scrap) : void {
        this.scraps.remove(scrap, true, true)
        // this.registry.values.score++
        this.collectedScraps++

        // TO DO check if we have all the scraps, then go to the end scene
        this.scoreField.text = this.collectedScraps+ ' SCRAPS COLLECTED'

        if(this.collectedScraps == 7){
            // this.scene.start('GameScene2')
           this.collectedScraps = 0

            this.add.image(900, 0, 'raElephant').setOrigin(0, 0);
            this.roboAnimal.collected = true;
            this.add.text(870, 200, 'You earned a RoboAnimal!')
        }
    }
    update(){
        this.player.update()
    }

}
