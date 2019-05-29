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
        this.load.image('level_ice', require('../assets/level_ice.png'))
        this.load.image('platformOne', require('../assets/platform_one.jpg'))
        this.load.image('raElephant', require('../assets/RoboAnimals/raElephant.png'))
        
        
        // N-3KO
        this.load.image('NEKO_IDLE1', require('../assets/N-3KO_IDLE1.png'))
        this.load.image('NEKO_IDLE2', require('../assets/N-3KO_IDLE2.png'))

        this.load.image('NEKO_WALK1', require('../assets/N-3KO_WALK1.png'))
        this.load.image('NEKO_WALK2', require('../assets/N-3KO_WALK2.png'))
        this.load.image('NEKO_WALK3', require('../assets/N-3KO_WALK3.png'))
        this.load.image('NEKO_WALK4', require('../assets/N-3KO_WALK4.png'))

        this.load.image('NEKO_RUN1', require('../assets/N-3KO_RUN1.png'))
        this.load.image('NEKO_RUN2', require('../assets/N-3KO_RUN2.png'))
        this.load.image('NEKO_RUN3', require('../assets/N-3KO_RUN3.png'))
        this.load.image('NEKO_RUN4', require('../assets/N-3KO_RUN4.png'))
        this.load.image('NEKO_RUN5', require('../assets/N-3KO_RUN5.png'))
        this.load.image('NEKO_RUN6', require('../assets/N-3KO_RUN6.png'))

        this.load.image('NEKO_JUMP1', require('../assets/N-3KO_JUMP1.png'))
        this.load.image('NEKO_JUMP2', require('../assets/N-3KO_JUMP2.png'))
        this.load.image('NEKO_JUMP3', require('../assets/N-3KO_JUMP3.png'))
        this.load.image('NEKO_JUMP4', require('../assets/N-3KO_JUMP4.png'))
        this.load.image('NEKO_JUMP5', require('../assets/N-3KO_JUMP5.png'))
        this.load.image('NEKO_JUMP6', require('../assets/N-3KO_JUMP6.png'))
        this.load.image('NEKO_JUMP7', require('../assets/N-3KO_JUMP7.png'))
        this.load.image('NEKO_JUMP8', require('../assets/N-3KO_JUMP8.png'))
        

        this.load.on('complete', () => {
            console.log("everything is loaded")
            
            // add code here to switch to the start scene
            this.scene.start("StartScene")
        })
    }
}