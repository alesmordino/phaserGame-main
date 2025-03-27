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
exports.__esModule = true;
var phaser_1 = require("phaser");
var finaleLevelManBall = /** @class */ (function (_super) {
    __extends(finaleLevelManBall, _super);
    function finaleLevelManBall() {
        var _this = _super.call(this, { key: "finaleLevelManBall" }) || this;
        _this.gamepad = null;
        _this.collisionCount = 0;
        return _this;
    }
    finaleLevelManBall.prototype.preload = function () {
        this.load.image('black', 'assets/images/black.png');
        this.load.image('pallapiccola', 'assets/images/pallapiccola.png');
        this.load.spritesheet('walk', 'assets/images/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.physics.world.createDebugGraphic();
    };
    finaleLevelManBall.prototype.create = function () {
        this.blackScreen = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'black');
        this.pallaPiccola = this.physics.add.sprite(this.cameras.main.width / 2 - 100, this.cameras.main.height / 2, 'pallapiccola');
        this.pallaPiccola.setScale(0.5).setDepth(1).setCollideWorldBounds(true);
        this.walkFrame = this.add.sprite(this.cameras.main.width / 2 + 100, this.cameras.main.height / 2, 'walk', 27);
        this.walkFrame.setScale(1).setDepth(1);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.hitbox = this.physics.add.sprite(this.cameras.main.width / 2 + 100, this.cameras.main.height / 2, null);
        this.hitbox.body.setSize(30, 60);
        this.hitbox.setImmovable(true);
        this.hitbox.setVisible(false);
        this.hitbox.setDebug(true, true, 0xff0000);
        this.physics.add.collider(this.pallaPiccola, this.hitbox, this.handleCollision, undefined, this);
    };
    finaleLevelManBall.prototype.handleCollision = function () {
        this.collisionCount++;
        if (this.collisionCount < 3) {
            var randomX = phaser_1["default"].Math.Between(50, this.cameras.main.width - 50);
            var randomY = phaser_1["default"].Math.Between(50, this.cameras.main.height - 50);
            this.hitbox.setPosition(randomX, randomY);
            this.walkFrame.setPosition(randomX, randomY);
        }
        else {
            this.pallaPiccola.setVisible(false);
            this.pallaPiccola.body.enable = false;
        }
    };
    finaleLevelManBall.prototype.update = function () {
        var _this = this;
        if (this.input.gamepad) {
            this.input.gamepad.once('connected', function (pad) {
                _this.gamepad = pad;
                console.log('Gamepad connected:', pad.id);
            });
            this.input.gamepad.once('disconnected', function (pad) {
                _this.gamepad = null;
                console.log('Gamepad disconnected:', pad.id);
            });
        }
        var velocityX = 0;
        var velocityY = 0;
        var speed = 200;
        if (this.gamepad) {
            var _a = this.gamepad.leftStick, x = _a.x, y = _a.y;
            velocityX = x * speed;
            velocityY = y * speed;
        }
        else {
            if (this.cursors.left.isDown) {
                velocityX = -speed;
            }
            else if (this.cursors.right.isDown) {
                velocityX = speed;
            }
            if (this.cursors.up.isDown) {
                velocityY = -speed;
            }
            else if (this.cursors.down.isDown) {
                velocityY = speed;
            }
        }
        this.pallaPiccola.setVelocity(velocityX, velocityY);
        if (velocityX !== 0 || velocityY !== 0) {
            this.pallaPiccola.anims.play("player-walk", true);
        }
        else {
            this.pallaPiccola.anims.stop();
            this.pallaPiccola.setFrame(0);
        }
    };
    return finaleLevelManBall;
}(phaser_1["default"].Scene));
exports["default"] = finaleLevelManBall;
