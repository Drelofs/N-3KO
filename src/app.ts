import "phaser";
import { BootScene } from "./scenes/boot-scene"
import { LogoScene } from "./scenes/logo-scene"
import { LoadingScene } from "./scenes/loading-scene"
import { StartScene } from "./scenes/start-scene"
import { GameScene } from "./scenes/game-scene"
import { EndScene } from "./scenes/end-scene"
import { GameScene2 } from "./scenes/game-scene2"

const config: GameConfig = {
    width: 1440,
    height: 900,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [BootScene, LogoScene, LoadingScene, StartScene, GameScene, EndScene, GameScene2],
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
    render: { pixelArt: true } //!
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config)
    }
}

window.addEventListener("load", () => new Game(config))