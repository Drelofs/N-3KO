export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 0, 500, "NEKO_IDLE1")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(800)

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

        //JUMP

        this.scene.anims.create({
            key: 'JUMP',
            frames: [
                { key: 'NEKO_IDLE1', frame :""},
                { key: 'NEKO_IDLE2', frame :"", duration: 50 }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.play("IDLE")
    }

    public update(): void {
        
        if (this.cursors.left.isDown) {
            this.setVelocityX(-300)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(300)
            this.flipX = false
        } 
        

        // jump when the body is touching the floor
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-500)

            this.play("JUMP")
        }
        
    }
}
