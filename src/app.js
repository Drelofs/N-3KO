"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("phaser");
var boot_scene_1 = require("./scenes/boot-scene");
var start_scene_1 = require("./scenes/start-scene");
var game_scene_1 = require("./scenes/game-scene");
var end_scene_1 = require("./scenes/end-scene");
var next_scene_1 = require("./scenes/next-scene");
var config = {
    width: 1440,
    height: 900,
    parent: "game",
    resolution: window.devicePixelRatio,
    scene: [boot_scene_1.BootScene, start_scene_1.StartScene, game_scene_1.GameScene, end_scene_1.EndScene, next_scene_1.NextScene],
    input: {
        keyboard: true
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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game(config) {
        var _this = _super.call(this, config) || this;
        console.log("Gebruik dit niet!!");
        return _this;
    }
    return Game;
}(Phaser.Game));
exports.Game = Game;
window.addEventListener("load", function () { return new Game(config); });
