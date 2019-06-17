import { GameScene } from "../scenes/game-scene";

export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys
    private left = 0
    private GameScene : GameScene
    

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

        // document.addEventListener("button0", () => this.handleFireButton())


    }

    private handleFireButton():void{
        this.GameScene.friendlyBullet()
    }


    public update(): void {
        if(this.y > 1000) {
            console.log("ik ben buiten beeld jongens!")
            this.scene.scene.start("EndScene")
        }
        if(this.scene.input.keyboard.checkDown(this.cursors.space, 500)){
            this.handleFireButton()
            console.log("Fire")
        }
        //GEDRAG
        if (this.cursors.left.isDown || this.left == 1)  {
            this.setVelocityX(-300)
            this.flipX = true
            if(this.cursors.space.isDown) {
                this.setVelocityX(-400)
            } 
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(300)
            this.flipX = false
            if(this.cursors.space.isDown) {
                this.setVelocityX(400)
            }      
         } 
        
        if (this.cursors.up.isDown && this.body.touching.down) {
            this.setVelocityY(-500)
        }
        

        //ANIMATIES
        if (!this.body.touching.down) {
            this.play("JUMP", true)
        } else if(this.cursors.left.isDown || this.cursors.right.isDown) {
            if (this.cursors.space.isDown) {
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
