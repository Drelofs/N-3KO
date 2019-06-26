import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"
import { Arcade } from "../arcade/arcade"
import { Bullet } from "../objects/bullet"
import { Platform } from "../objects/platform"
import { threadId } from "worker_threads";
import { Neko } from "../app"

export class GameScene3 extends Phaser.Scene {

    private arcade : Arcade
    private joystickListener: EventListener
    private player : Player
    private hills: Phaser.GameObjects.Group
    private platform: Phaser.GameObjects.Group
    private scraps: Phaser.Physics.Arcade.Group
    private bulletGroup: Phaser.GameObjects.Group
    private scoreField
    private enemies: Phaser.GameObjects.Group
    private bgtile: Phaser.GameObjects.TileSprite
    private lives = 2
    private livesField

    private timer : Phaser.Time.TimerEvent
    private hitTimeout = false
 

    constructor() {
        super({ key: "GameScene3" })
     
    }

    public friendlyBullet() {
        this.bulletGroup.add(new Bullet(this, this.player.x+20,  this.player.y, this.player.direction), true)
        let config = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        let laser = this.scene.scene.sound.add('laser', config);
        laser.play();
        
    }

    init(): void {
        let g = this.game as Neko
        this.arcade = g.arcade
        
    }

    create(): void {
        this.bgtile = this.add.tileSprite(0, 0, 1800, 900, 'BACKGROUND3')
        this.bgtile.setOrigin(0,0)

        this.bulletGroup = this.add.group({ runChildUpdate: true})

        let config = {
            mute: false,
            volume: 20,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        let music = this.scene.scene.sound.add('meow', config);
        music.play();
        
        
       
        // 11 SCRAPS
        this.scraps = this.physics.add.group({
            key: 'scrap',
            repeat: 12,
            setXY: { x: 150, y: 30, stepX: 100 },
        })

        this.enemies = this.add.group()
        for (let i =0; i <2; i++){
            this.enemies.add(new enemy(this, 650*i+250, 255), true)
        }

        // TODO add player and enemy
        
        this.player = new Player(this)


        this.platform = this.add.group({ runChildUpdate: true})
        this.hills = this.add.group({ runChildUpdate: true })

        //PLATFORM  
        // const platform : Platform = (this.platform.children.entries[0]) as Platform
        this.physics.add.collider(this.player, this.platform)
        this.platform.add(new Platform(this, 1200, 800, 'FLAT3'), true)
        this.platform.add(new Platform(this, 100, 800, 'MEDIUM2'), true)
        this.platform.add(new Platform(this, 900, 400, 'AIR2'), true)
        this.platform.add(new Platform(this, 200, 250, 'AIR4'), true)

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platform)
        this.physics.add.collider(this.player, this.platform)
        this.physics.add.collider(this.enemies, this.platform)
        
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)


        this.physics.add.overlap(this.bulletGroup, this.enemies, this.killEnemy, null, this)

        this.physics.world.bounds.width = 1800
        this.physics.world.bounds.height = 900

        // this.cameras.main.setSize(1440,900) //canvas
        this.cameras.main.setBounds(0,0,1800,900) //game
        this.cameras.main.startFollow(this.player)

        this.player.setCollideWorldBounds(true)

    }

    private setTimer() {
        this.hitTimeout = false
    }

    private hitEnemy(player: Player, enemy: enemy, ) {
        if(this.hitTimeout == false) {
            this.registry.values.lives--
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
                yoyo:true,
                repeat:4
            })
        }
    
        // Game over. Reset scraps & Lives
        if (this.registry.values.lives === 0) {
            this.registry.values.scraps = 0;
            this.scene.start("EndScene")
            this.lives = 2
        }
    }

    private killEnemy(bullet: Bullet, enemy : enemy) {
        console.log("enemy geraakt!")
        console.log(bullet)
        console.log(enemy)
        this.enemies.remove(enemy, true, true)
    }


    private collectScraps(player : Player , scraps) : void {
        this.scraps.remove(scraps, true, true)
        // this.registry.values.score++
        this.registry.values.scraps++

        let config = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        let bell = this.scene.scene.sound.add('bell', config);
        bell.play();
        
        
        // TO DO check if we have all the stars, then go to the end scene
        // this.scoreField.text = this.registry.values.scraps+ ' SCRAPS COLLECTED'
        
        if(this.registry.values.scraps == 42){
            this.scene.start('GameScene2')
        //    this.registry.values.scraps = 0
        }
    }
    update(){
        this.player.update()
        // this.bgtile.tilePositionX += 1

    }

}
