export class Hill extends Phaser.Physics.Arcade.Sprite{

    protected scene: Phaser.Scene;

    private speed:number

    protected width: 100
    protected height: 100

    constructor(scene, x: number, y: number, texture:string, friction:number = 1) {
        super(scene, x, y, texture)

        this.scene.physics.add.existing(this)
        
        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        this.setGravity(0) 
        this.setImmovable(true)
    }
}