import { UI } from "./ui-scene"
import { Arcade } from "../arcade/arcade"
import { Neko } from "../app"

export class StartScene extends Phaser.Scene {

    private arcade : Arcade
    private nextGameListener : EventListener
    private collectibleListener : EventListener

    constructor() {
        super({key: "StartScene"})
    }

    init(): void {
    }

    preload(): void {
    }

    create(): void {
        let g = this.game as Neko
        this.arcade = g.arcade


        this.add.image(0, 0, 'startscreen').setOrigin(0, 0)


        // add code here to switch to the GameScene, after a mouse click
        let btn1 = this.add.text(600,850, 'start', { fontFamily: 'Arial Black', fontSize: 40, color: '#ffffff' }).setOrigin(0.5).setStroke('#ffff0000', 16)
        btn1.setInteractive()
        btn1.on('pointerdown', (pointer) => {
            this.scene.start('GameScene')
            this.scene.add("UIScene", new UI ("UIScene"), true)

            this.registry.set("scraps", 0)

            this.scene.start('GameScene')
        })

        let btn2 = this.add.image(100, 800, 'trophy')
        btn2.setInteractive()
        btn2.on('pointerdown', (pointer) => {
            this.scene.start('Collectibles')
        })

        this.nextGameListener = () => this.nextGame()
        document.addEventListener("joystick0button0", this.nextGameListener)

        this.collectibleListener = () => this.showCollectibles()
        document.addEventListener("joystick0button1", this.collectibleListener)

        console.log("number of joysticks")
        console.log(this.arcade.Joysticks)
    }

    private nextGame(){
        document.removeEventListener("joystick0button0", this.nextGameListener)
        this.scene.start('GameScene')
    }

    private showCollectibles(){
        this.scene.start('Collectibles')
    }

    public update(){
        for (let joystick of this.arcade.Joysticks) {
            joystick.update()
        }
    }
}
