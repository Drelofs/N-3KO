export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 200, 500, "NEKO_IDLE1")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(false)
        this.setBounce(0.1)
        this.setDragX(800)

        this.createAnimations()
        this.play("IDLE", true)

    }


    public update(): void {
        console.log(this.y)

        if(this.y > 1000) {
            console.log("ik ben buiten beeld jongens!")
            this.scene.scene.start("EndScene")
        }

     //WALK
        if (this.cursors.left.isDown) {
            this.setVelocityX(-300)
            this.flipX = true
            if(this.cursors.space.isDown) {
                this.setVelocityX(-400)
                this.play("RUN", true)
            } else {
                this.play("WALK", true)
            }
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(300)
            this.flipX = false
            if(this.cursors.space.isDown) {
                this.setVelocityX(400)
                this.play("RUN", true)
            } else {
                this.play("WALK", true)
            }
         } else {
           this.play("IDLE", true)
        }

        
        // jump when the body is touching the floor
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-500)
            this.play("JUMP", true)
        }
        // this.play("WALK", true)
        
    }

    private createAnimations(){

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
            repeat: -1
        });

    }
}
