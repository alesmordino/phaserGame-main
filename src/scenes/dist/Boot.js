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
exports.emozioneBoot = void 0;
var phaser_1 = require("phaser");
var FaceTracking_1 = require("./FaceTracking");
exports.emozioneBoot = "neutro";
var Boot = /** @class */ (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        var _this = _super.call(this, { key: "Boot" }) || this;
        _this.lastEmotion = "neutro";
        return _this;
    }
    Boot.prototype.preload = function () {
        this.cameras.main.setBackgroundColor("#ffffff");
        this.load.image("logo", "assets/images/logoS.png");
        this.load.spritesheet("animation", "assets/images/spritesheet_1.png", { frameWidth: 1024, frameHeight: 1024 });
        this.load.spritesheet("animation1", "assets/images/spritesheet_2.png", { frameWidth: 1024, frameHeight: 1024 });
        this.load.spritesheet("bg1", "assets/images/bg1.png", { frameWidth: 2048, frameHeight: 2048 });
        this.load.image('plane', 'assets/images/plane.png');
        this.load.image('plane1', 'assets/images/plane1.png');
        this.load.image('plane2', 'assets/images/plane2.png');
        this.load.image('pallagrande', 'assets/images/pallagrande.png');
        this.load.image('fish', 'assets/images/fish.png');
        this.load.image('gioca', 'assets/images/gioca.png');
        this.load.image('suggeritore', 'assets/images/suggeritore.png');
        this.load.image('logoH', 'assets/images/logoGiocoHome.PNG');
    };
    Boot.prototype.create = function () {
        var _this = this;
        this._logo = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.3);
        this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "animation").setVisible(false).setOrigin(0.5, 0.5);
        this.bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1").setVisible(false).setScale(0.55);
        this.suggeritore = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "suggeritore").setVisible(false).setScale(0.15).setAlpha(0.3);
        this.plane = this.add.image(0, this.cameras.main.height, 'plane').setScale(0.4).setDepth(1).setVisible(false);
        this.plane1 = this.add.image(this.cameras.main.width / 1.5, -this.cameras.main.height, 'plane1').setScale(0.45).setDepth(1).setVisible(false);
        this.plane2 = this.add.image(-this.cameras.main.width, this.cameras.main.height / 2 - 150, 'plane2').setScale(0.45).setDepth(1).setVisible(false);
        this.pallaGrande = this.add.image(this.cameras.main.width - 200, this.cameras.main.height - 300, 'pallagrande').setScale(1.4).setDepth(1).setVisible(false);
        this.fish = this.add.image(150, this.cameras.main.height - 150, 'fish').setScale(1.2).setDepth(2).setAlpha(2).setVisible(false);
        this.tweens.add({
            targets: this._logo,
            scale: 1.45,
            duration: 3000,
            ease: "Sine.easeInOut"
        });
        this.anims.create({
            key: "playAnimation",
            frames: this.anims.generateFrameNumbers("animation", { start: 0, end: 6 }),
            frameRate: 2,
            repeat: 0
        });
        this.anims.create({
            key: "playAnimation1",
            frames: this.anims.generateFrameNumbers("animation1", { start: 0, end: 6 }),
            frameRate: 2,
            repeat: 0
        });
        this.anims.create({
            key: "playBG",
            frames: this.anims.generateFrameNumbers("bg1", { start: 0, end: 4 }),
            frameRate: 3,
            repeat: 0
        });
        this.time.delayedCall(3500, function () {
            _this._logo.setVisible(false);
            _this.sprite.setVisible(true);
            _this.sprite.anims.play("playAnimation");
            _this.sprite.once("animationcomplete", function () {
                _this.sprite.anims.play("playAnimation1");
                _this.sprite.once("animationcomplete", function () {
                    console.log("Animazione completata");
                    _this.bg.setVisible(true);
                    _this.bg.anims.play("playBG");
                    _this.bg.once("animationcomplete", function () {
                        _this.bg.setPosition(_this.cameras.main.width / 2, _this.cameras.main.height / 2);
                        _this.pallaGrande.setVisible(true);
                        _this.tweens.add({
                            targets: _this.pallaGrande,
                            y: _this.cameras.main.height - 450,
                            duration: 1000,
                            ease: 'Bounce.easeInOut',
                            yoyo: true,
                            repeat: -1
                        });
                        _this.suggeritore.setVisible(true);
                        _this.suggeritore.setVisible(true).setAlpha(0.3);
                        _this.tweens.add({
                            targets: _this.suggeritore,
                            scale: 0.25,
                            alpha: 1,
                            y: _this.cameras.main.height / 2 + 100,
                            duration: 4000,
                            ease: 'Sine.easeInOut',
                            onUpdate: function (tween) {
                                // Spostati indietro regolando la profondità (depth)
                                //this.suggeritore.setDepth(2 - tween.progress * 10); // Regola la profondità se necessario
                            },
                            onComplete: function () {
                                // Dopo un certo periodo di tempo, fai scomparire l'immagine
                                _this.suggeritore.setVisible(true);
                            }
                        });
                        _this.fish.setVisible(true);
                        _this.tweens.add({
                            targets: _this.fish,
                            alpha: 0.2,
                            duration: 1000,
                            ease: 'Linear',
                            yoyo: true,
                            repeat: -1,
                            onYoyo: function () {
                                _this.fish.setVisible(false);
                            },
                            onRepeat: function () {
                                _this.fish.setVisible(true);
                            }
                        });
                        _this.logo = _this.add.image(_this.cameras.main.width / 2, _this.cameras.main.height / 2 - 300, "logoH").setScale(0.8);
                        _this.gioca = _this.add.image(_this.cameras.main.width / 2 + 5, _this.cameras.main.height / 2 - 50, 'gioca').setScale(0.7).setDepth(2).setVisible(true).setInteractive();
                        _this.gioca.on('pointerdown', function () {
                            _this.scene.start('GamePlay');
                        });
                        _this.gioca.on('pointerover', function () {
                            _this.tweens.add({
                                targets: _this.gioca,
                                scale: 1.1,
                                duration: 200,
                                ease: 'Linear'
                            });
                        });
                        _this.gioca.on('pointerout', function () {
                            _this.tweens.add({
                                targets: _this.gioca,
                                scale: 0.9,
                                duration: 200,
                                ease: 'Linear'
                            });
                        });
                        _this.startPlaneAnimations();
                    });
                });
            });
        });
        FaceTracking_1.setupCamera().then(function () {
            FaceTracking_1.startFaceMesh();
        });
    };
    Boot.prototype.startPlaneAnimations = function () {
        var _this = this;
        this.plane.setPosition(0, this.cameras.main.height).setVisible(true);
        this.tweens.add({
            targets: this.plane,
            x: this.cameras.main.width,
            y: 0,
            duration: 4000,
            ease: 'Linear',
            onComplete: function () {
                _this.plane.setVisible(false);
                _this.plane1.setPosition(_this.cameras.main.width / 1.5, -_this.cameras.main.height).setVisible(true);
                _this.tweens.add({
                    targets: _this.plane1,
                    y: _this.cameras.main.height + _this.plane1.height,
                    duration: 4000,
                    ease: 'Linear',
                    onComplete: function () {
                        _this.plane1.setVisible(false);
                        _this.plane2.setPosition(-_this.cameras.main.width, _this.cameras.main.height / 2 - 150).setVisible(true);
                        _this.tweens.add({
                            targets: _this.plane2,
                            x: _this.cameras.main.width + _this.plane2.width,
                            duration: 4000,
                            ease: 'Linear',
                            onComplete: function () {
                                _this.plane2.setVisible(false);
                                _this.time.delayedCall(1000, function () {
                                    _this.startPlaneAnimations();
                                });
                            }
                        });
                    }
                });
            }
        });
    };
    Boot.prototype.update = function () {
        if (window.currentEmotion && window.currentEmotion !== this.lastEmotion) {
            this.lastEmotion = window.currentEmotion;
            console.log("Emozione aggiornata:", this.lastEmotion);
        }
        if (window.mostFrequentEmotion && window.mostFrequentEmotion !== exports.emozioneBoot) {
            exports.emozioneBoot = window.mostFrequentEmotion;
            console.log("Emozione più rilevata:", exports.emozioneBoot);
        }
    };
    return Boot;
}(phaser_1["default"].Scene));
exports["default"] = Boot;
