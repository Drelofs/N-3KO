import { Player } from "../objects/player"
import { Platform } from "../objects/platform"
import { Bomb } from "../objects/bomb"
import { MovingPlatform } from "../objects/movingplatform"

export class GameScene2 extends Phaser.Scene {

    private player : Player
    private platforms: Phaser.GameObjects.Group
    private bombs: Phaser.GameObjects.Group
    private stars: Phaser.Physics.Arcade.Group
    private collectedStars = 0
    private scoreField

    constructor() {
        super({ key: "GameScene2" })
    }

    init(): void {

    }

    create(): void {
        this.add.image(0, 0, 'sky').setOrigin(0, 0)      
    
        // 22 STARS
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 22,
            setXY: { x: 12, y: 30, stepX: 70 },
        })
        this.bombs = this.add.group()
        this.bombs.add(new Bomb(this, 20, 20), true)
        // TODO add player
        this.player = new Player(this)

        this.platforms = this.add.group({ runChildUpdate: true })
        this.platforms.addMultiple([
            new Platform(this, 800, 574, "ground"),
            // new Platform(this, 500, 420, "platform"),
            new MovingPlatform(this, 300, 320, "platform"),
        ], true)
        
        this.scoreField = this.add.text(200, 20, + this.collectedStars+ ' stars collected', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2)
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.stars, this.platforms)
        this.physics.add.collider(this.player, this.platforms)
        this.physics.add.collider(this.bombs, this.platforms)
        
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this)

        this.physics.world.bounds.width = 1600
        this.physics.world.bounds.height = 600

        this.cameras.main.setSize(800, 600)          // canvas size
        this.cameras.main.setBounds(0, 0, 1600, 600) // world size
        this.cameras.main.startFollow(this.player)

        // if(this.collectedStars == 23){
        //     this.scene.start('NextScene')
        // }

    }

    private hitBomb(player:Player, bomb){
        this.scene.start("EndScene")
    }

    private collectStar(player : Player , star) : void {
        this.stars.remove(star, true, true)
        this.registry.values.score++
        this.collectedStars++


        // TO DO check if we have all the stars, then go to the end scene
        this.scoreField.text = this.collectedStars+ ' stars collected'
    
    }

    update(){
        this.player.update()
    }

}
