export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        this.load.image('sky', require('../assets/background.png'))
        this.load.image('WASTELAND1', require('../assets/WASTELAND1.jpg'))
        this.load.image('scrap', require('../assets/scrap.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('bmo', require('../assets/bmo.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('ground', require('../assets/platform_ground.png'))
        this.load.image('start', require('../assets/videogame.png'))
        this.load.image('cat', require('../assets/kittycat.png'))
        this.load.image('city', require('../assets/background_2.png'))
        this.load.image('neko', require('../assets/N-3KO_IDLE1.png'))

        this.load.on('complete', () => {
            console.log("everything is loaded")
            
            // add code here to switch to the start scene
            this.scene.start("StartScene")
        })
    }
}