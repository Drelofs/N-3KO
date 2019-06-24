import { Player } from "../objects/player"
import { enemy } from "../objects/bomb"
import { Arcade } from "../arcade/arcade"
import { Bullet } from "../objects/bullet"
import { Platform } from "../objects/platform"
import { threadId } from "worker_threads";
import { Neko } from "../app"

export class GameScene extends Phaser.Scene {

    private arcade : Arcade
    private joystickListener: EventListener
    private player : Player
    private hills: Phaser.GameObjects.Group
    private platform: Phaser.GameObjects.Group
    private scraps: Phaser.Physics.Arcade.Group
    private bulletGroup: Phaser.GameObjects.Group
    // private collectedScraps : number = 0
    private scoreField
    private enemies: Phaser.GameObjects.Group
    private bgtile: Phaser.GameObjects.TileSprite
    // private bullet : Bullet

    private lives = 2
    private livesField

    private timer : Phaser.Time.TimerEvent
    private hitTimeout = false

    
    // public get CollectedScraps() : number {
    //     return this.registry.values.scraps
    // }
    

    constructor() {
        super({ key: "GameScene" })
    }

    public friendlyBullet() {
        this.bulletGroup.add(new Bullet(this, this.player.x+20,  this.player.y, this.player.direction), true)
        
        console.log("Fire!")
    }

    init(): void {
        let g = this.game as Neko
        this.arcade = g.arcade
        
    }

    create(): void {
        this.bgtile = this.add.tileSprite(0, 0, 1800, 900, 'WASTELAND1')
        this.bgtile.setOrigin(0,0)

        this.bulletGroup = this.add.group({ runChildUpdate: true})

       
        // 11 SCRAPS
        this.scraps = this.physics.add.group({
            key: 'scrap',
            repeat: 20,
            setXY: { x: 12, y: 30, stepX: 70 },
        })

        this.enemies = this.add.group()
        for (let i =0; i <4; i++){
            this.enemies.add(new enemy(this, 250*i+250, 255), true)
        }

        // TODO add player and enemy
        
        this.player = new Player(this)


        this.platform = this.add.group({ runChildUpdate: true})
        this.hills = this.add.group({ runChildUpdate: true })

        //PLATFORM  
        // const platform : Platform = (this.platform.children.entries[0]) as Platform
        this.physics.add.collider(this.player, this.platform)
        this.platform.add(new Platform(this, 300, 800, 'FLAT1'), true)
        this.platform.add(new Platform(this, 900, 800, 'MEDIUM1'), true)
        this.platform.add(new Platform(this, 400, 400, 'AIR1'), true)
        this.platform.add(new Platform(this, 1300, 150, 'AIR2'), true)



        // //HILL1
        // const hill : Hill = (this.hills.children.entries[0]) as Hill

        // this.physics.add.collider(this.player, hill)
        // this.hills.add(new Hill(this, 400, 900, 'HILL2'), true);

        

        this.scoreField = this.add.text(200, 20,  + this.registry.values.scraps+ ' SCRAPS COLLECTED',
        { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        this.livesField = this.add.text(1340, 20,  + this.lives+ ' LIVES LEFT', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#FFFFFF', 2)

        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platform)
        this.physics.add.collider(this.player, this.platform)
        this.physics.add.collider(this.enemies, this.platform)
        
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this)
        this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, null, this)


        this.physics.add.overlap(this.bulletGroup, this.enemies, this.killEnemy, null, this)

        this.physics.world.bounds.width = 1440 * 2
        this.physics.world.bounds.height = 900

        this.cameras.main.setSize(1440,900) //canvas
        this.cameras.main.setBounds(0,0,1440 * 2,900) //game
        this.cameras.main.startFollow(this.player)

        this.player.setCollideWorldBounds(true)

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
                yoyo:true,
                repeat:4
            })
        }
        
        // Game over. Reset scraps & Lives
        if (this.lives === 0) {
            this.registry.values.scraps = 0;
            this.scene.start("EndScene")
            this.lives = 9
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
        
        
        // TO DO check if we have all the stars, then go to the end scene
        // this.scoreField.text = this.registry.values.scraps+ ' SCRAPS COLLECTED'
        
        if(this.registry.values.scraps == 20){
            this.scene.start('GameScene2')
           this.registry.values.scraps = 0
        }
    }
    update(){
        this.player.update()
        this.bgtile.tilePositionX += 1
        
        /*
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
        */
        
    }

}
