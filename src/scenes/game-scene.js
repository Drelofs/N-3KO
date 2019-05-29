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
var player_1 = require("../objects/player");
var bomb_1 = require("../objects/bomb");
var platform_1 = require("../objects/platform");
var movingplatform_1 = require("../objects/movingplatform");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this, { key: "GameScene" }) || this;
        _this.collectedScraps = 0;
        return _this;
    }
    GameScene.prototype.init = function () {
        console.log("dit is de gamescene");
    };
    GameScene.prototype.create = function () {
        this.add.image(0, 0, 'WASTELAND1').setOrigin(0, 0);
        // 11 SCRAPS
        this.scraps = this.physics.add.group({
            key: 'scrap',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        });
        this.bombs = this.add.group();
        for (var i = 0; i < 1; i++) {
            this.bombs.add(new bomb_1.Bomb(this, 350, 20), true);
        }
        // TODO add player
        this.player = new player_1.Player(this);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new platform_1.Platform(this, 800, 870, "ground"),
            new platform_1.Platform(this, 2400, 870, "ground"),
            new platform_1.Platform(this, 550, 250, "ice"),
            new platform_1.Platform(this, 200, 350, "platform"),
            new movingplatform_1.MovingPlatform(this, 900, 400, "platform")
        ], true);
        this.scoreField = this.add.text(200, 20, +this.collectedScraps + ' SCRAPS COLLECTED', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
        this.physics.world.bounds.width = 1440 * 2;
        this.physics.world.bounds.height = 900;
        this.cameras.main.setSize(1440, 900); //canvas
        this.cameras.main.setBounds(0, 0, 1440 * 2, 900); //game
        this.cameras.main.startFollow(this.player);
    };
    GameScene.prototype.hitBomb = function (player, bomb) {
        this.scene.start("EndScene");
    };
    GameScene.prototype.collectScraps = function (player, scraps) {
        this.scraps.remove(scraps, true, true);
        this.registry.values.score++;
        this.collectedScraps++;
        // TO DO check if we have all the stars, then go to the end scene
        this.scoreField.text = this.collectedScraps + ' SCRAPS COLLECTED';
        if (this.collectedScraps == 1) {
            this.scene.start('NextScene');
        }
    };
    GameScene.prototype.update = function () {
        this.player.update();
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
