export class Player extends Phaser.Physics.Arcade.Sprite {

    private cursors: Phaser.Input.Keyboard.CursorKeys

    constructor(scene) {
        super(scene, 0, 500, "neko")

        this.cursors = this.scene.input.keyboard.createCursorKeys()
        
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.1)
        this.setDragX(800)
    }

    public update(): void {
        
        if (this.cursors.left.isDown) {
            this.setVelocityX(-250)
            this.flipX = true
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(250)
            this.flipX = false
        } 
        

        // jump when the body is touching the floor
        let grounded = this.body.touching.down 
        if (this.cursors.up.isDown && grounded) {
            this.setVelocityY(-800)
        }
        
    }
}
