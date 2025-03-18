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
var moving_1 = require("../scenes/moving");
var movingPad_1 = require("../scenes/movingPad");
var levelManBall_1 = require("../scenes/levelManBall");
var casino_1 = require("../scenes/casino");
var arcade_1 = require("../scenes/arcade");
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super.call(this, {
            key: "GamePlay"
        }) || this;
        _this._voth = 0;
        _this.gamepad = null;
        return _this;
    }
    GamePlay.prototype.preload = function () {
        this.load.spritesheet("walk", "assets/images/walk.png", { frameWidth: 64, frameHeight: 64 });
        this.load.tilemapTiledJSON('level-1', 'assets/map/level-1.json');
        this.load.image('tilemap-extruded', 'assets/map/tilemap-extruded.png');
        this.load.image('lampros', 'assets/images/lamprosso.png');
        this.load.image('lampverdee', 'assets/images/lampverdee.png');
        this.load.image('lampblu', 'assets/images/lampblu.png');
        this.load.image('lamprosa', 'assets/images/lampros.png');
        this.load.image('lampbinc', 'assets/images/lampbinc.png');
        this.load.image('pallagrande', 'assets/images/pallagrande.png');
        this.load.image('pallapiccola', 'assets/images/pallapiccola.png');
        this.load.image('foglia', 'assets/images/foglia.png');
        this.load.image('spicchiodxgiu', 'assets/images/spicchiodestragiu.png');
        this.load.image('spicchiosxgiu', 'assets/images/spicchiosinistragiu.png');
        this.load.image('spicchiosxsu', 'assets/images/spicchiosinistrasu.png');
        this.load.image('spicchiodxsu', 'assets/images/spicchiodestrasu.png');
        this.load.image('fish', 'assets/images/fish.png');
        this.load.image('plane', 'assets/images/plane.png');
        this.physics.world.createDebugGraphic();
    };
    GamePlay.prototype.create = function () {
        var _this = this;
        this.player = new moving_1["default"](this, 470, 930);
        this.map = this.make.tilemap({ key: "level-1" });
        this.tileset = this.map.addTilesetImage("tilemap-extruded");
        this.world = this.map.createLayer("world", this.tileset, 0, 0);
        if (this.world) {
            this.world.setDepth(1).setAlpha(1);
        }
        else {
            console.error("Layer 'world' non trovato!");
        }
        this.collisions = this.map.createLayer("collisions", this.tileset, 0, 0);
        if (this.collisions) {
            this.collisions.setDepth(0).setAlpha(1);
            this.collisions.setCollisionByProperty({ collide: true });
        }
        else {
            console.error("Layer 'collisions' non trovato!");
        }
        var mapWidth = this.map.widthInPixels;
        var mapHeight = this.map.heightInPixels;
        this.cameras.main.setBounds(0, 0, mapHeight, mapWidth);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.setScroll(mapWidth / 2 - this.cameras.main.width / 2, mapHeight / 2 - this.cameras.main.height / 2);
        this.cameras.main.setZoom(1);
        if (this.input.gamepad) {
            this.input.gamepad.once('connected', function (pad) {
                _this.gamepad = pad;
                _this.player1 = new movingPad_1["default"](_this, 470, 930);
                console.log('Gamepad connected:', pad.id);
            });
            this.input.gamepad.once('disconnected', function (pad) {
                _this.gamepad = null;
                _this.player = new moving_1["default"](_this, 470, 930);
                console.log('Gamepad disconnected:', pad.id);
            });
        }
        else {
            console.error('Gamepad input system is not initialized properly.');
        }
        this.centerHitbox = this.physics.add.sprite(573, 140, null).setOrigin(0.5, 0.5);
        this.centerHitbox.body.setSize(20, 80);
        this.centerHitbox.setImmovable(true);
        this.centerHitbox.setVisible(false);
        this.centerHitbox.setDebug(true, true, 0xff0000);
        var fogliaanomala = this.add.image(this.centerHitbox.x, this.centerHitbox.y, 'lampros');
        fogliaanomala.setOrigin(0.43, 0.54).setDepth(1).setDisplaySize(46, 126);
        this.time.addEvent({
            delay: 500,
            callback: function () {
                fogliaanomala.setVisible(!fogliaanomala.visible);
            },
            loop: true
        });
        this.centerHitbox1 = this.physics.add.sprite(93, 630, null).setOrigin(0.5, 0.5);
        this.centerHitbox1.body.setSize(20, 80);
        this.centerHitbox1.setImmovable(true);
        this.centerHitbox1.setVisible(false);
        this.centerHitbox1.setDebug(true, true, 0xff0000);
        var fogliaanomala1 = this.add.image(this.centerHitbox1.x, this.centerHitbox1.y, 'lampblu');
        fogliaanomala1.setOrigin(0.5, 0.71).setDepth(1).setDisplaySize(55, 67);
        this.time.addEvent({
            delay: 800,
            callback: function () {
                fogliaanomala1.setVisible(!fogliaanomala1.visible);
            },
            loop: true
        });
        this.centerHitbox2 = this.physics.add.sprite(873, 630, null).setOrigin(0.5, 0.5);
        this.centerHitbox2.body.setSize(20, 80);
        this.centerHitbox2.setImmovable(true);
        this.centerHitbox2.setVisible(false);
        this.centerHitbox2.setDebug(true, true, 0xff0000);
        var fogliaanomala2 = this.add.image(this.centerHitbox2.x, this.centerHitbox2.y, 'lamprosa');
        fogliaanomala2.setOrigin(0.48, 0.77).setDepth(1).setDisplaySize(57, 61);
        this.time.addEvent({
            delay: 600,
            callback: function () {
                fogliaanomala2.setVisible(!fogliaanomala2.visible);
            },
            loop: true
        });
        this.centerHitbox3 = this.physics.add.sprite(440, 140, null).setOrigin(0.5, 0.5);
        this.centerHitbox3.body.setSize(20, 80);
        this.centerHitbox3.setImmovable(true);
        this.centerHitbox3.setVisible(false);
        this.centerHitbox3.setDebug(true, true, 0xff0000);
        var fogliaanomala3 = this.add.image(this.centerHitbox3.x, this.centerHitbox3.y, 'lampverdee');
        fogliaanomala3.setOrigin(0.488, 0.475).setDepth(1).setDisplaySize(43, 118);
        this.time.addEvent({
            delay: 800,
            callback: function () {
                fogliaanomala3.setVisible(!fogliaanomala3.visible);
            },
            loop: true
        });
        this.centerHitbox4 = this.physics.add.sprite(380, 93, null).setOrigin(0.5, 0.5);
        this.centerHitbox4.body.setSize(40, 50);
        this.centerHitbox4.setImmovable(true);
        this.centerHitbox4.setVisible(false);
        this.centerHitbox4.setDebug(true, true, 0xff0000);
        this.centerHitbox5 = this.physics.add.sprite(13, 400, null).setOrigin(0.5, 0.5);
        this.centerHitbox5.body.setSize(40, 60);
        this.centerHitbox5.setImmovable(true);
        this.centerHitbox5.setVisible(false);
        this.centerHitbox5.setDebug(true, true, 0xff0000);
        this.centerHitbox6 = this.physics.add.sprite(997, 410, null).setOrigin(0.5, 0.5);
        this.centerHitbox6.body.setSize(50, 50);
        this.centerHitbox6.setImmovable(true);
        this.centerHitbox6.setVisible(false);
        this.centerHitbox6.setDebug(true, true, 0xff0000);
        this.centerHitbox7 = this.physics.add.sprite(923, 660, null).setOrigin(0.5, 0.5);
        this.centerHitbox7.body.setSize(40, 48);
        this.centerHitbox7.setImmovable(true);
        this.centerHitbox7.setVisible(false);
        this.centerHitbox7.setDebug(true, true, 0xff0000);
        this.centerHitbox8 = this.physics.add.sprite(373, 997, null).setOrigin(0.5, 0.5);
        this.centerHitbox8.body.setSize(42, 42);
        this.centerHitbox8.setImmovable(true);
        this.centerHitbox8.setVisible(false);
        this.centerHitbox8.setDebug(true, true, 0xff0000);
        this.centerHitbox9 = this.physics.add.sprite(65, 675, null).setOrigin(0.5, 0.5);
        this.centerHitbox9.body.setSize(33, 43);
        this.centerHitbox9.setImmovable(true);
        this.centerHitbox9.setVisible(false);
        this.centerHitbox9.setDebug(true, true, 0xff0000);
        this.centerHitbox13 = this.physics.add.sprite(632, 990, null).setOrigin(0.5, 0.5);
        this.centerHitbox13.body.setSize(33, 55);
        this.centerHitbox13.setImmovable(true);
        this.centerHitbox13.setVisible(false);
        this.centerHitbox13.setDebug(true, true, 0xff0000);
        this.centerHitbox10 = this.physics.add.sprite(580, 765, null).setOrigin(0.5, 0.5);
        this.centerHitbox10.body.setSize(40, 40);
        this.centerHitbox10.setImmovable(true);
        this.centerHitbox10.setVisible(false);
        this.centerHitbox10.setDebug(true, true, 0xff0000);
        this.pallaGrande = this.add.image(this.centerHitbox10.x, this.centerHitbox10.y, 'pallagrande').setOrigin(0.5, 0.5);
        this.pallaGrande.setScale(1).setDepth(1);
        this.pallaPiccola = this.add.image(this.centerHitbox10.x, this.centerHitbox10.y, 'pallapiccola').setOrigin(0.5, 0.5);
        this.pallaPiccola.setScale(0.5).setDepth(1);
        this.pallaPiccola.setVisible(false);
        var isLargeBall = true;
        this.time.addEvent({
            delay: 1000,
            callback: function () {
                if (isLargeBall) {
                    _this.pallaGrande.setVisible(true);
                    _this.pallaPiccola.setVisible(false);
                }
                else {
                    _this.pallaGrande.setVisible(false);
                    _this.pallaPiccola.setVisible(true);
                }
                isLargeBall = !isLargeBall;
            },
            loop: true
        });
        this.tweens.add({
            targets: [this.centerHitbox10, this.pallaGrande, this.pallaPiccola],
            x: 790,
            y: 605,
            duration: 5000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.collisions);
        this.physics.add.collider(this.player, this.centerHitbox10, function () {
            _this.scene.stop("GamePlay");
            _this.scene.start("levelManBall");
        });
        this.centerHitbox11 = this.physics.add.sprite(770, 480, null).setOrigin(0.5, 0.5);
        this.centerHitbox11.body.setSize(40, 40);
        this.centerHitbox11.setImmovable(true);
        this.centerHitbox11.setVisible(false);
        this.centerHitbox11.setDebug(true, true, 0xff0000);
        this.plane = this.add.image(this.centerHitbox11.x, this.centerHitbox11.y, 'plane').setOrigin(0.5, 0.5);
        this.plane.setScale(0.2).setDepth(1);
        this.tweens.add({
            targets: [this.centerHitbox11, this.plane],
            x: 570,
            y: 320,
            duration: 5000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.centerHitbox11, function () {
            _this.scene.stop("GamePlay");
            _this.scene.start("arcade");
        });
        this.centerHitbox12 = this.physics.add.sprite(240, 480, null).setOrigin(0.5, 0.5);
        this.centerHitbox12.body.setSize(40, 40);
        this.centerHitbox12.setImmovable(true);
        this.centerHitbox12.setVisible(false);
        this.centerHitbox12.setDebug(true, true, 0xff0000);
        this.fish = this.add.image(this.centerHitbox12.x, this.centerHitbox12.y, 'fish').setOrigin(0.5, 0.5);
        this.fish.setScale(0.8).setDepth(1);
        this.tweens.add({
            targets: [this.centerHitbox12, this.fish],
            x: 450,
            y: 320,
            duration: 5000,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
        this.physics.add.collider(this.player, this.centerHitbox12, function () {
            _this.scene.stop("GamePlay");
            _this.scene.start("casino");
        });
        this.centerHitbox14 = this.physics.add.sprite(440, 820, null).setOrigin(0.5, 0.5);
        this.centerHitbox14.body.setSize(20, 80);
        this.centerHitbox14.setImmovable(true);
        this.centerHitbox14.setVisible(false);
        this.centerHitbox14.setDebug(true, true, 0xff0000);
        var fogliaanomala4 = this.add.image(this.centerHitbox14.x, this.centerHitbox14.y, 'lampbinc');
        fogliaanomala4.setOrigin(0.52, 0.47).setDepth(1).setScale(1, 1);
        this.time.addEvent({
            delay: 500,
            callback: function () {
                fogliaanomala4.setVisible(!fogliaanomala4.visible);
            },
            loop: true
        });
        this.physics.add.collider(this.player, this.collisions);
        this.physics.add.collider(this.player, this.centerHitbox);
        this.physics.add.collider(this.player, this.centerHitbox1);
        this.physics.add.collider(this.player, this.centerHitbox2);
        this.physics.add.collider(this.player, this.centerHitbox3);
        this.physics.add.collider(this.player, this.centerHitbox4);
        this.physics.add.collider(this.player, this.centerHitbox5);
        this.physics.add.collider(this.player, this.centerHitbox6);
        this.physics.add.collider(this.player, this.centerHitbox7);
        this.physics.add.collider(this.player, this.centerHitbox8);
        this.physics.add.collider(this.player, this.centerHitbox9);
        this.physics.add.collider(this.player, this.centerHitbox10);
        this.physics.add.collider(this.player, this.centerHitbox11);
        this.physics.add.collider(this.player, this.centerHitbox12);
        this.physics.add.collider(this.player, this.centerHitbox13);
        this.physics.add.collider(this.player, this.centerHitbox14);
        var imageDisplayed = false;
        if (levelManBall_1.completeLevel) {
            if (!imageDisplayed) {
                var image = this.add.image(788, 798, 'spicchiodxgiu');
                image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(472, 452);
                imageDisplayed = true;
            }
        }
        var imageDisplayed1 = false;
        if (casino_1.completeLevel1) {
            if (!imageDisplayed1) {
                var image = this.add.image(232, 253, 'spicchiosxsu');
                image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(464, 505);
                imageDisplayed1 = true;
            }
        }
        var imageDisplayed2 = false;
        if (arcade_1.completeLevel2) {
            if (!imageDisplayed2) {
                var image = this.add.image(789, 253.5, 'spicchiodxsu');
                image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(471, 507);
                imageDisplayed2 = true;
            }
        }
    };
    GamePlay.prototype.update = function (time, delta) {
        var _this = this;
        this.player.update();
        if (this.gamepad) {
            if (this.gamepad.leftStick.x !== 0 || this.gamepad.leftStick.y !== 0) {
                this.player.setVelocity(this.gamepad.leftStick.x * 200, this.gamepad.leftStick.y * 200);
            }
        }
        if (this._voth == 0) {
            this.player.setFrame(0);
            this.time.delayedCall(2000, function () {
                _this._voth = 1;
            });
        }
        if (this._voth == 1 && this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) {
            this.player.anims.play("player-idle", true);
        }
        if (levelManBall_1.completeLevel) {
            this.centerHitbox10.setVisible(false);
            this.pallaGrande.setVisible(false);
            this.pallaPiccola.setVisible(false);
            this.centerHitbox10.body.enable = false;
        }
        if (casino_1.completeLevel1) {
            this.centerHitbox12.setVisible(false);
            this.centerHitbox12.body.enable = false;
            this.fish.setVisible(false);
        }
        if (arcade_1.completeLevel2) {
            this.centerHitbox11.setVisible(false);
            this.centerHitbox11.body.enable = false;
            this.plane.setVisible(false);
        }
    };
    return GamePlay;
}(Phaser.Scene));
exports["default"] = GamePlay;
