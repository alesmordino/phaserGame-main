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
var playerstate;
(function (playerstate) {
    playerstate[playerstate["idle"] = 0] = "idle";
    playerstate[playerstate["destra"] = 1] = "destra";
    playerstate[playerstate["sinistra"] = 2] = "sinistra";
    playerstate[playerstate["sopra"] = 3] = "sopra";
    playerstate[playerstate["sotto"] = 4] = "sotto";
    playerstate[playerstate["diagonalesottodestra"] = 5] = "diagonalesottodestra";
    playerstate[playerstate["diagonalesottosinistra"] = 6] = "diagonalesottosinistra";
    playerstate[playerstate["diagonalesopradestra"] = 7] = "diagonalesopradestra";
    playerstate[playerstate["diagonalesoprasinistra"] = 8] = "diagonalesoprasinistra";
})(playerstate || (playerstate = {}));
var movingPad = /** @class */ (function (_super) {
    __extends(movingPad, _super);
    function movingPad(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'walk') || this;
        _this._speed = 200; // Velocità del personaggio
        _this._playerstate = playerstate.idle;
        _this.gamepad = null;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setOrigin(0.5, 0.5);
        _this.setDepth(2);
        _this.body.setSize(35, 58);
        _this.body.setOffset(13, 13);
        _this.setDebug(true, true, 0x0000ff);
        _this.cursors = scene.input.keyboard.createCursorKeys();
        if (!scene.anims.exists("player-running-sinistra")) {
            scene.anims.create({
                key: "player-running-sinistra",
                frames: scene.anims.generateFrameNumbers("walk", { start: 9, end: 17 }),
                frameRate: 9,
                repeat: -1
            });
        }
        if (!scene.anims.exists("player-running-destra")) {
            scene.anims.create({
                key: "player-running-destra",
                frames: scene.anims.generateFrameNumbers("walk", { start: 27, end: 35 }),
                frameRate: 9,
                repeat: -1
            });
        }
        if (!scene.anims.exists("player-running-sopra")) {
            scene.anims.create({
                key: "player-running-sopra",
                frames: scene.anims.generateFrameNumbers("walk", { start: 0, end: 8 }),
                frameRate: 9,
                repeat: -1
            });
        }
        if (!scene.anims.exists("player-running-sotto")) {
            scene.anims.create({
                key: "player-running-sotto",
                frames: scene.anims.generateFrameNumbers("walk", { start: 18, end: 26 }),
                frameRate: 9,
                repeat: -1
            });
        }
        if (!scene.anims.exists("player-idle")) {
            scene.anims.create({
                key: "player-idle",
                frames: [{ key: "walk", frame: 18 }],
                frameRate: 9
            });
        }
        if (!scene.anims.exists("player-walk")) {
            scene.anims.create({
                key: "player-walk",
                frames: scene.anims.generateFrameNumbers("walk", { start: 0, end: 35 }),
                frameRate: 9,
                repeat: -1
            });
        }
        if (_this.scene.input.gamepad) {
            _this.scene.input.gamepad.once('connected', function (pad) {
                _this.gamepad = pad;
            });
        }
        return _this;
    }
    movingPad.prototype.setGamepad = function (pad) {
        this.gamepad = pad;
    };
    movingPad.prototype.update = function (cursors, gamepad) {
        var speed = 200;
        var velocityX = 0;
        var velocityY = 0;
        if (gamepad) {
            var leftStickX = gamepad.leftStick.x;
            var leftStickY = gamepad.leftStick.y;
            velocityX = leftStickX * speed;
            velocityY = leftStickY * speed;
        }
        else if (cursors) {
            if (cursors.left.isDown) {
                velocityX = -speed;
            }
            else if (cursors.right.isDown) {
                velocityX = speed;
            }
            if (cursors.up.isDown) {
                velocityY = -speed;
            }
            else if (cursors.down.isDown) {
                velocityY = speed;
            }
        }
        this.setVelocity(velocityX, velocityY);
        if (velocityX !== 0 || velocityY !== 0) {
            this.anims.play("player-walk", true);
        }
        else {
            this.anims.stop();
            this.setFrame(0);
        }
    };
    return movingPad;
}(phaser_1["default"].Physics.Arcade.Sprite));
exports["default"] = movingPad;
