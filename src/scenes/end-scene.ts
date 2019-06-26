import { UI } from "./ui-scene"

export class EndScene extends Phaser.Scene {

    constructor() {
        super({key: "EndScene"})
    }

    init(): void {
        this.scene.remove("UIScene")
    }

    preload(): void {
    }

    create(): void {
        // change this to a nice game over image

        this.add.image(0, 0, 'gameover').setOrigin(0, 0)

        // add text here

        this.add.text(600, 300, 'GAME OVER, MAN!', { fontFamily: 'Arial Black', fontSize: 70, color: '#ffffff' }).setOrigin(0.5).setStroke('#7b89e1', 16)

        let btn1 = this.add.text(600,850, 'start', { fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff' }).setOrigin(0.5).setStroke('#ffff0000', 16)
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
            this.scene.add("UIScene", new UI ("UIScene"), true)
            this.registry.set("scraps", 0)
            this.registry.set("lives", 2)
            this.scene.start('GameScene')
        })
    }
}
