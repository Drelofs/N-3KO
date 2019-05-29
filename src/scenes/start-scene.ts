export class StartScene extends Phaser.Scene {

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        this.add.image(0, 0, 'WASTELAND1').setOrigin(0, 0)

        // add another image here
        this.add.image(530, 500, 'NEKO_IDLE1').setOrigin(0, 0)

        // add text here
        this.add.text(600, 300, 'N-3KO', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.image(600,400, 'start')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
        this.scene.start('GameScene')
        })
    }
}
