export class enemy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x,y) {
        super(scene, x, y, "enemy")

        this.scene.physics.add.existing(this)
        this.setCollideWorldBounds(true);
        
        this.setBounce(0)

        this.setVelocity(-100);
        this.setAngularVelocity(0);
    }

    public update(): void {
    }
}
