import { Player } from "../objects/player"
import { Bomb } from "../objects/bomb"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private collectedStars = 0
    private scoreField 
    private bombs: Phaser.GameObjects.Group

    constructor() {
        super({ key: "GameScene" })
    }

    init(): void {
        console.log("dit is de gamescene")

    }

    create(): void {
        this.add.image(0, 0, 'WASTELAND1').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.bombs = this.add.group()
        for (let i =0; i <1; i++){
            this.bombs.add(new Bomb(this, 350, 20), true)
        }

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 870, "ground"),
            new Platform(this, 2400, 870, "ground"),
            new Platform(this, 550, 250, "ice"),
            new Platform(this, 200, 350, "platform"),
            new MovingPlatform(this, 900, 400, "platform")
        ], true)

        this.scoreField = this.add.text(200, 20,  + this.collectedStars+ ' SCRAPS COLLECTED', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

        this.physics.world.bounds.width = 1440 * 2
        this.physics.world.bounds.height = 900

        this.cameras.main.setSize(1440,900) //canvas
        this.cameras.main.setBounds(0,0,1440 * 2,900) //game
        this.cameras.main.startFollow(this.player)

    }

    private hitBomb(player: Player, bomb) {
        this.scene.start("EndScene")
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedStars++

        // TO DO check if we have all the stars, then go to the end scene
        this.scoreField.text = this.collectedStars+ ' SCRAPS COLLECTED'
        
        if(this.collectedStars == 12){
            this.scene.start('NextScene')
        }
    }

    update(){
        this.player.update()
    }

}
