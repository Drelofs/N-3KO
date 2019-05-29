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
var MovingPlatform = /** @class */ (function (_super) {
    __extends(MovingPlatform, _super);
    function MovingPlatform(scene, x, y, texture, friction) {
        if (friction === void 0) { friction = 1; }
        var _this = _super.call(this, scene, x, y, texture) || this;
        _this.scene.physics.add.existing(_this);
        var body = _this.body;
        body.setAllowGravity(false);
        _this.setGravity(0);
        _this.setImmovable(true);
        // moving platform
        _this.setVelocityX(50);
        // friction 0 to 1 (ice has low friction) // no effect?
        // this.setFrictionX(friction)
        _this.startPosition = x;
        return _this;
    }
    MovingPlatform.prototype.update = function () {
        if (this.x >= this.startPosition + 150) {
            this.setVelocityX(-50);
        }
        else if (this.x <= this.startPosition - 150) {
            this.setVelocityX(50);
        }
    };
    return MovingPlatform;
}(Phaser.Physics.Arcade.Sprite));
exports.MovingPlatform = MovingPlatform;
