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
var platform_1 = require("../objects/platform");
var movingplatform_1 = require("../objects/movingplatform");
var NextScene = /** @class */ (function (_super) {
    __extends(NextScene, _super);
    function NextScene() {
        var _this = _super.call(this, { key: "NextScene" }) || this;
        _this.collectedScraps = 0;
        return _this;
    }
    NextScene.prototype.init = function () {
        console.log("dit is de nextscene");
    };
    NextScene.prototype.create = function () {
        this.add.image(0, 0, 'city').setOrigin(0, 0);
        // 11 STARS
        this.scraps = this.physics.add.group({
            key: 'scrap',
            repeat: 11,
            setXY: { x: 12, y: 30, stepX: 70 },
        });
        // TODO add player
        this.player = new player_1.Player(this);
        this.platforms = this.add.group({ runChildUpdate: true });
        this.platforms.addMultiple([
            new platform_1.Platform(this, 800, 574, "ground"),
            new platform_1.Platform(this, 200, 150, "ice"),
            new movingplatform_1.MovingPlatform(this, 300, 300, "platform"),
            new platform_1.Platform(this, 500, 200, "platform"),
            new movingplatform_1.MovingPlatform(this, 600, 400, "platform")
        ], true);
        this.scoreField = this.add.text(200, 20, +this.collectedScraps + ' STARS COLLECTED', { fontFamily: 'Arial Black', fontSize: 20, color: '#000000' }).setOrigin(0.5).setStroke('#2ac9be', 2);
        // define collisions for bouncing, and overlaps for pickups
        this.physics.add.collider(this.scraps, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.scraps, this.collectScraps, null, this);
    };
    NextScene.prototype.collectScraps = function (player, scrap) {
        this.scraps.remove(scrap, true, true);
        this.registry.values.score++;
        this.collectedScraps++;
        // TO DO check if we have all the scraps, then go to the end scene
        this.scoreField.text = this.collectedScraps + ' STARS COLLECTED';
        if (this.collectedScraps == 12) {
            this.scene.start('NextScene');
        }
    };
    NextScene.prototype.update = function () {
        this.player.update();
    };
    return NextScene;
}(Phaser.Scene));
exports.NextScene = NextScene;
