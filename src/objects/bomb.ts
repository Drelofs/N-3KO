export class enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "enemy")

        

        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true);

        // if (this.cursors.left.isDown || this.left == 1)  {
        //     this.setVelocityX(-300)
        //     this.flipX = true
        //     if(this.cursors.shift.isDown) {
        //         this.setVelocityX(-400)
        //     } 
        // } else if (this.cursors.right.isDown) {
        //     this.setVelocityX(300)
        //     this.flipX = false
        //     if(this.cursors.shift.isDown) {
        //         this.setVelocityX(400)
        //     }      
        //  } 
        
        this.setBounce(0)

        this.setVelocity(-100);
        this.setAngularVelocity(0);
    }

    public update(): void {
        console.log(this.getBounds());
        console.log("Test test")
    }
}
