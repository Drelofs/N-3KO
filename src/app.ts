import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { LogoScene } from "./scenes/logo-scene"
import { LoadingScene } from "./scenes/loading-scene"
import { StartScene } from "./scenes/start-scene"
import { UI } from "./scenes/ui-scene"
import { GameScene } from "./scenes/game-scene"
import { EndScene } from "./scenes/end-scene"
import { GameScene2 } from "./scenes/game-scene2"
import { GameScene3 } from "./scenes/game-scene3"
import { Collectibles } from "./scenes/collectibles"
import { Arcade } from "./arcade/arcade"

const config: GameConfig = {
    width: 1440,
    height: 900,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, LogoScene, LoadingScene, UI, StartScene, GameScene, EndScene, GameScene2, GameScene3, Collectibles],
    input: {
        keyboard: true,
        gamepad: true
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false, 
            gravity: { y: 400 }
        }
    },
    render: { pixelArt: true }
};

export class Neko extends Phaser.Game {
    public arcade:Arcade
    constructor(config: GameConfig) {
        super(config)
        this.arcade = new Arcade()
    }
}

window.addEventListener("load", () => new Neko(config))