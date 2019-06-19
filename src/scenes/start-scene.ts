import { UI } from "./ui-scene"

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
        this.add.image(615, 500, 'NEKO_IDLE1').setOrigin(0, 0)

        // add text here
        this.add.text(700, 300, 'N-3KO', { fontFamily: 'Arial Black', fontSize: 70, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
        this.add.text(700, 370, 'The scrap collector', { fontFamily: 'Arial Black', fontSize: 40, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)

        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.text(700,450, 'start', { fontFamily: 'Arial Black', fontSize: 60, color: '#2ac9be' }).setOrigin(0.5).setStroke('#7df2ea', 16)
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
        this.scene.start('GameScene')
        this.scene.add("UIScene", new UI ("UIScene"), true)
        this.scene.start('GameScene')
        })

        let btn2 = this.add.image(100, 100, 'trophy')
        btn2.setInteractive()
        btn2.on('pointerdown', (pointer) => {
        this.scene.start('Collectibles')
        })
    }
}
