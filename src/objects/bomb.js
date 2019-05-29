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
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb(scene, x, y) {
        var _this = _super.call(this, scene, x, y, "bomb") || this;
        _this.scene.physics.add.existing(_this);
        _this.setBounce(0.6);
        _this.setCollideWorldBounds(true);
        _this.setVelocity(Phaser.Math.Between(-200, 200), 30);
        _this.setAngularVelocity(30);
        return _this;
    }
    return Bomb;
}(Phaser.Physics.Arcade.Sprite));
exports.Bomb = Bomb;
