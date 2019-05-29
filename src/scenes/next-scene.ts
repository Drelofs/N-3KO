import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { MovingPlatform } from "../objects/movingplatform"

export class NextScene extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private scraps: Phaser.Physics.Arcade.Group
    private collectedScraps = 0
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
        this.scraps = this.physics.add.group({
            key: 'scrap',
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

        this.scoreField = this.add.text(200, 20,  + this.collectedScraps+ ' STARS COLLECTED', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2)
        
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this)
    }

    private collectScraps(player : Player , scrap) : void {
        this.scraps.remove(scrap, true, true)
        this.registry.values.score++
        this.collectedScraps++

        // TO DO check if we have all the scraps, then go to the end scene
        this.scoreField.text = this.collectedScraps+ ' STARS COLLECTED'
        
        if(this.collectedScraps == 12){
            this.scene.start('NextScene')
        }
    }

    update(){
        this.player.update()
    }

}
