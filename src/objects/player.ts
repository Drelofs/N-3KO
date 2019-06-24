import { GameScene } from "../scenes/game-scene";
import { Arcade } from "../arcade/arcade"
import { Neko } from "../app"

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private left = 0
    private GameScene : GameScene
    private arcade : Arcade
    private facing:number = 1

    
    public get direction() : number {
        return this.facing
    }
    

    constructor(scene) {
        super(scene, 0, 500, "NEKO_IDLE1")
        this.GameScene = scene as GameScene
        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(false)
        this.setBounce(0.1)
        this.setDragX(1000)

        this.createAnimations()
        this.play("IDLE", true)

        console.log("creating player")


        let g = this.scene.game as Neko
        this.arcade = g.arcade

        console.log("init joysticks")
        console.log(this.arcade)

        document.addEventListener("joystick0button0", () => this.handleFireButton())
    }

    private handleFireButton():void{
        this.GameScene.friendlyBullet()
    }

    private joystickInput():void {
        // console.log("reading joystick")
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
        if (this.arcade.Joysticks[0]) {
            if(this.arcade.Joysticks[0].Left){
                this.setVelocityX(-300)
                this.flipX = true
                this.facing = -1

            }
            else if(this.arcade.Joysticks[0].Right){
                this.setVelocityX(300)
                this.flipX = false
                this.facing = 1

            }
            if(this.arcade.Joysticks[0].Up && this.body.touching.down){
                this.setVelocityY(-500)
            }
            this.setVelocityX(this.arcade.Joysticks[0].X * 400)
            this.setVelocityY(this.arcade.Joysticks[0].Y * 400)
        }
    }

    private keyboardInput(){
         //GEDRAG
         if (this.cursors.left.isDown || this.left == 1)  {
            this.setVelocityX(-300)
            this.flipX = true
            this.facing = -1
            if(this.cursors.shift.isDown) {
                this.setVelocityX(-400)
            } 
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(300)
            this.flipX = false
            this.facing = 1
            if(this.cursors.shift.isDown) {
                this.setVelocityX(400)
            }      
         } 
        
        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-500)
        }
    }


    public update(): void {
        this.joystickInput()
        this.keyboardInput()

        if(this.y > 1000) {
            console.log("ik ben buiten beeld jongens!")
            this.scene.scene.start("EndScene")
        }
        if(this.scene.input.keyboard.checkDown(this.cursors.space, 500)){
            this.handleFireButton()
            console.log("Fire")
        }
       
        

        //ANIMATIES
        if (!this.body.touching.down) {
            this.play("JUMP", true)
        } else if(this.cursors.left.isDown || this.cursors.right.isDown || (this.arcade.Joysticks[0] && (this.arcade.Joysticks[0].Left || this.arcade.Joysticks[0].Right))) {
            if (this.cursors.shift.isDown) {
                this.play("RUN", true)
            } else {
                this.play("WALK", true)
            }
        } else {
            this.play("IDLE", true)
        }
        
        
    }

// ALL ANIMATIONS

    public createAnimations(){

        // N-3KO IDLE
        this.scene.anims.create({
            key: 'IDLE',
            frames: [
                { key: 'NEKO_IDLE1', frame :""},
                { key: 'NEKO_IDLE2', frame :"", duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        //WALK
        this.scene.anims.create({
            key: 'WALK',
            frames: [
                { key: 'NEKO_WALK1', frame :""},
                { key: 'NEKO_WALK2', frame :""},
                { key: 'NEKO_WALK3', frame :""},
                { key: 'NEKO_WALK4', frame :"", duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        //RUN
        this.scene.anims.create({
            key: 'RUN',
            frames: [
                { key: 'NEKO_RUN1', frame :""},
                { key: 'NEKO_RUN2', frame :""},
                { key: 'NEKO_RUN3', frame :""},
                { key: 'NEKO_RUN4', frame :""},
                { key: 'NEKO_RUN5', frame :""},
                { key: 'NEKO_RUN6', frame :"", duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        //JUMP
        this.scene.anims.create({
            key: 'JUMP',
            frames: [
                { key: 'NEKO_JUMP1', frame :""},
                { key: 'NEKO_JUMP2', frame :""},
                { key: 'NEKO_JUMP3', frame :""},
                { key: 'NEKO_JUMP4', frame :""},
                { key: 'NEKO_JUMP5', frame :""},
                { key: 'NEKO_JUMP6', frame :""},
                { key: 'NEKO_JUMP7', frame :""},
                { key: 'NEKO_JUMP8', frame :"", duration: 50 }
            ],
            frameRate: 8,
            repeat: 1
        });

    }
}
