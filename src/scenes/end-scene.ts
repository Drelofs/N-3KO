export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image

        this.add.image(0, 0, 'WASTELAND1').setOrigin(0, 0)

        // add text here

        this.add.text(400, 300, 'GAME OVER, MAN!', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#FFFFF', 16)

        let btn1 = this.add.image(400,400, 'start')
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
            // add code here to switch to the GameScene, after a mouse click
        })
    }
}
