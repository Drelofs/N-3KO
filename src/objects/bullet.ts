import { Physics } from "phaser";

export class Bullet extends Phaser.Physics.Arcade.Sprite {

    private particles:Phaser.GameObjects.Particles.ParticleEmitterManager

    constructor(scene: Phaser.Scene, x:number, y:number, direction:number) {      
        super(scene, x, y, "bullet")

        this.setScale(0.6) 
        this.flipX = direction == -1 ? true : false
        
         
        this.scene.physics.add.existing(this) 
        
        this.setSize(this.displayWidth + 20, this.displayHeight + 20)

        this.setVelocity((200 * direction),0)
        this.setAccelerationX(400 * direction) 
        
        // this.on('destroy', this.onBeforeDestroy)

        let body = this.body as Phaser.Physics.Arcade.Body
        body.setAllowGravity(false)
        // this.setAllow
    }

    // particles added to scene instead of bullet. use container to group particles and bullet
    private addParticles(tint) {
        this.particles = this.scene.add.particles('pixel')

        let emitter = this.particles.createEmitter({
            lifespan: 200,
            speed: -100,
            tint: tint,
            maxParticles: 25,
            scale: { start: 1, end: 0 },
            blendMode: 0
        });

        emitter.startFollow(this)
    }

    public update(): void {
        if (this.x > 1300 || this.x < -300) {
            this.destroy()
        }
    }

}
