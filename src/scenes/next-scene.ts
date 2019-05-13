import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class NextScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private collectedStars = 0
    private scoreField 

    constructor() {
        super({ key: "NextScene" })
    }

    init(): void {
        console.log("dit is de nextscene")
    }

    create(): void {
        this.add.image(0, 0, 'city').setOrigin(0, 0)      
    
        // 11 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 574, "ground"),
            new Platform(this, 200, 150, "ice"),
            new MovingPlatform(this, 300, 300, "platform"),
            new Platform(this, 500, 200, "platform"),
            new MovingPlatform(this, 600, 400, "platform")
        ], true)

        this.scoreField = this.add.text(200, 20,  + this.collectedStars+ ' STARS COLLECTED', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedStars++

        // TO DO check if we have all the stars, then go to the end scene
        this.scoreField.text = this.collectedStars+ ' STARS COLLECTED'
        
        if(this.collectedStars == 12){
            this.scene.start('NextScene')
        }
    }

    update(){
        this.player.update()
    }

}
