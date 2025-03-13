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
var playerr = /** @class */ (function (_super) {
    __extends(playerr, _super);
    function playerr(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'walk') || this;
        _this._speed = 200; // Velocità del personaggio
        _this._playerstate = playerstate.idle;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setOrigin(0.5, 0.5);
        _this.setDepth(2);
        _this.body.setSize(35, 58);
        _this.body.setOffset(13, 13);
        _this.setDebug(true, true, 0x0000ff);
        _this.cursors = scene.input.keyboard.createCursorKeys();
        scene.anims.create({
            key: "player-running-sinistra",
            frames: scene.anims.generateFrameNumbers("walk", { start: 9, end: 17 }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key: "player-running-destra",
            frames: scene.anims.generateFrameNumbers("walk", { start: 27, end: 35 }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key: "player-running-sopra",
            frames: scene.anims.generateFrameNumbers("walk", { start: 0, end: 8 }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key: "player-running-sotto",
            frames: scene.anims.generateFrameNumbers("walk", { start: 18, end: 26 }),
            frameRate: 9,
            repeat: -1
        });
        scene.anims.create({
            key: "player-idle",
            frames: [{ key: "walk", frame: 18 }],
            frameRate: 9
        });
        return _this;
    }
    playerr.prototype.update = function () {
        var moving = false;
        var velocityX = 0;
        var velocityY = 0;
        if (this.cursors.left.isDown) {
            velocityX -= this._speed;
            if (this.cursors.up.isDown) {
                velocityY -= this._speed;
                this._playerstate = playerstate.diagonalesoprasinistra;
                this.anims.play("player-running-sinistra", true);
            }
            else if (this.cursors.down.isDown) {
                velocityY += this._speed;
                this._playerstate = playerstate.diagonalesottosinistra;
                this.anims.play("player-running-sinistra", true);
            }
            else {
                this._playerstate = playerstate.sinistra;
                this.anims.play("player-running-sinistra", true);
            }
            moving = true;
        }
        else if (this.cursors.right.isDown) {
            velocityX += this._speed;
            if (this.cursors.up.isDown) {
                velocityY -= this._speed;
                this._playerstate = playerstate.diagonalesopradestra;
                this.anims.play("player-running-destra", true);
            }
            else if (this.cursors.down.isDown) {
                velocityY += this._speed;
                this._playerstate = playerstate.diagonalesottodestra;
                this.anims.play("player-running-destra", true);
            }
            else {
                this._playerstate = playerstate.destra;
                this.anims.play("player-running-destra", true);
            }
            moving = true;
        }
        else if (this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            velocityY -= this._speed;
            this._playerstate = playerstate.sopra;
            this.anims.play("player-running-sopra", true);
            moving = true;
        }
        else if (this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
            velocityY += this._speed;
            this._playerstate = playerstate.sotto;
            this.anims.play("player-running-sotto", true);
            moving = true;
        }
        var magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (magnitude > 0) {
            velocityX = (velocityX / magnitude) * this._speed;
            velocityY = (velocityY / magnitude) * this._speed;
        }
        this.setVelocity(velocityX, velocityY);
    };
    return playerr;
}(Phaser.Physics.Arcade.Sprite));
exports["default"] = playerr;
