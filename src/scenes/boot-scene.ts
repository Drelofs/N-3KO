import { Game } from "phaser";
import { LogoScene } from "./logo-scene";

export class BootScene extends Phaser.Scene {

    private graphics: Phaser.GameObjects.Graphics

    constructor() {
        super({ key: "BootScene" })
    }

    init(){
    }

    preload(): void {
        
        this.load.image('logo', require('../assets/SenpaiGames.png'))
        this.load.image('loading', require('../assets/loadingscreen.png'))
        this.load.image('scrap', require('../assets/scrap.png'))
        this.load.image('ice', require('../assets/platform_ice.png'))
        this.load.image('bomb', require('../assets/bomb.png'))
        this.load.image('bmo', require('../assets/bmo.png'))
        this.load.image('platform', require('../assets/platform_grass.png'))
        this.load.image('start', require('../assets/start.png'))
        this.load.image('trophy', require('../assets/trophy.png'))
        this.load.image('cat', require('../assets/kittycat.png'))
        this.load.image('backArrow', require('../assets/backArrow.png'))   
        this.load.image('ground', require('../assets/ground.jpg'))

        this.load.image('drone', require('../assets/drone.png'))

        //BACKGROUNDS
        this.load.image('sky', require('../assets/background.png'))
        this.load.image('WASTELAND1', require('../assets/WASTELAND1.jpg'))
        this.load.image('level_ice', require('../assets/level_ice.png'))
        this.load.image('pixels', require('../assets/pixelBackground.jpg'))
        this.load.image('startscreen', require('../assets/Startscreen1.jpg'))
        this.load.image('gameover', require('../assets/gameOver.jpg'))
        this.load.image('BACKGROUND3', require('../assets/background3.jpg'))

        //HILLS
        this.load.image('HILL1', require('../assets/HILL_1.png'))
        this.load.image('HILL2', require('../assets/HILL_2.png'))
        this.load.image('HILL3', require('../assets/HILL_3.png'))
        this.load.image('HILL4', require('../assets/HILL_4.png'))
        this.load.image('HILL5', require('../assets/HILL_5.png'))

        //PLATFORMS
        this.load.image('FLAT1', require('../assets/FLAT_PLATFORM1.png'))
        this.load.image('FLAT2', require('../assets/FLAT_PLATFORM2.png'))
        this.load.image('FLAT3', require('../assets/FLAT_PLATFORM3.png'))
        this.load.image('MEDIUM1', require('../assets/MEDIUM_PLATFORM1.png'))
        this.load.image('MEDIUM2', require('../assets/MEDIUM_PLATFORM2.png'))
        this.load.image('AIR1', require('../assets/AIR_PLATFORM1.png'))
        this.load.image('AIR2', require('../assets/AIR_PLATFORM2.png'))
        this.load.image('AIR3', require('../assets/AIR_PLATFORM3.png'))
        this.load.image('AIR4', require('../assets/AIR_PLATFORM4.png'))

        // RoboAnimals
        this.load.image('raElephant', require('../assets/RoboAnimals/collectibles/raElephant.png'))
        this.load.image('raFox', require('../assets/RoboAnimals/collectibles/raFox.png'))
        this.load.image('raGiraffe', require('../assets/RoboAnimals/collectibles/raGiraffe.png'))
        this.load.image('raGorilla', require('../assets/RoboAnimals/collectibles/raGorilla.png'))
        this.load.image('raHippo', require('../assets/RoboAnimals/collectibles/raHippo.png'))
        this.load.image('raTurtle', require('../assets/RoboAnimals/collectibles/raTurtle.png'))

        // Enemies
        this.load.image('enemy', require('../assets/ghoul.png'))
        
        // N-3KO Sprites
        //Idle sprites
        this.load.image('NEKO_IDLE1', require('../assets/N-3KO_IDLE1.png'))
        this.load.image('NEKO_IDLE2', require('../assets/N-3KO_IDLE2.png'))

        //Walking sprites
        this.load.image('NEKO_WALK1', require('../assets/N-3KO_WALK1.png'))
        this.load.image('NEKO_WALK2', require('../assets/N-3KO_WALK2.png'))
        this.load.image('NEKO_WALK3', require('../assets/N-3KO_WALK3.png'))
        this.load.image('NEKO_WALK4', require('../assets/N-3KO_WALK4.png'))

        //Running sprites
        this.load.image('NEKO_RUN1', require('../assets/N-3KO_RUN1.png'))
        this.load.image('NEKO_RUN2', require('../assets/N-3KO_RUN2.png'))
        this.load.image('NEKO_RUN3', require('../assets/N-3KO_RUN3.png'))
        this.load.image('NEKO_RUN4', require('../assets/N-3KO_RUN4.png'))
        this.load.image('NEKO_RUN5', require('../assets/N-3KO_RUN5.png'))
        this.load.image('NEKO_RUN6', require('../assets/N-3KO_RUN6.png'))

        //Jumping sprites
        this.load.image('NEKO_JUMP1', require('../assets/N-3KO_JUMP1.png'))
        this.load.image('NEKO_JUMP2', require('../assets/N-3KO_JUMP2.png'))
        this.load.image('NEKO_JUMP3', require('../assets/N-3KO_JUMP3.png'))
        this.load.image('NEKO_JUMP4', require('../assets/N-3KO_JUMP4.png'))
        this.load.image('NEKO_JUMP5', require('../assets/N-3KO_JUMP5.png'))
        this.load.image('NEKO_JUMP6', require('../assets/N-3KO_JUMP6.png'))
        this.load.image('NEKO_JUMP7', require('../assets/N-3KO_JUMP7.png'))
        this.load.image('NEKO_JUMP8', require('../assets/N-3KO_JUMP8.png'))

        //Lasers
        this.load.image('bullet', require('../assets/laser.png'))
        this.load.image('bullet1', require('../assets/laser1.png'))

        //Sound
        this.load.audio('meow', require ('../assets/audio/meow.mp3'))
        this.load.audio('laser', require ('../assets/audio/laser.mp3'))
        this.load.audio('bell', require ('../assets/audio/bell.mp3'))
        
        this.load.on('complete', () => {
            this.scene.start("StartScene")
        })
    }
}