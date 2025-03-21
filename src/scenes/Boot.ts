import Phaser from "phaser";
import { setupCamera, startFaceMesh } from "./FaceTracking";
import { GameData } from "../GameData";

declare global {
  interface Window {
    mostFrequentEmotion: string;
    currentEmotion: string;
  }
}

export default class Boot extends Phaser.Scene {
  private lastEmotion: string = "neutro";
  private emozioneBoot: string = "neutro";
  private _logo: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private sprite: Phaser.GameObjects.Sprite;
  private plane: Phaser.GameObjects.Image;
  private plane1: Phaser.GameObjects.Image;
  private plane2: Phaser.GameObjects.Image;
  private pallaGrande: Phaser.GameObjects.Image;
  private fish: Phaser.GameObjects.Image;
  private gioca: Phaser.GameObjects.Image;
  private crediti: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "Boot" });
  }

  preload(): void {
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
    this.load.image('crediti', 'assets/images/crediti.png');
  }

  create(): void {
    this._logo = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.3);
    this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "animation").setVisible(false).setOrigin(0.5, 0.5);
    this.bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1").setVisible(false).setScale(0.55);
    
    this.plane = this.add.image(0, this.cameras.main.height, 'plane').setScale(0.45).setDepth(1).setVisible(false);
    this.plane1 = this.add.image(this.cameras.main.width / 1.5, -this.cameras.main.height, 'plane1').setScale(0.45).setDepth(1).setVisible(false);
    this.plane2 = this.add.image(-this.cameras.main.width, this.cameras.main.height / 2 - 150, 'plane2').setScale(0.45).setDepth(1).setVisible(false);
    
    this.pallaGrande = this.add.image(this.cameras.main.width - 200, this.cameras.main.height - 300, 'pallagrande').setScale(1.4).setDepth(1).setVisible(false);
    this.fish = this.add.image(150, this.cameras.main.height - 150, 'fish').setScale(1.2).setDepth(2).setAlpha(2).setVisible(false);

    this.tweens.add({
        targets: this._logo,
        scale: 1.45,
        duration: 3000,
        ease: "Sine.easeInOut",
    });

    this.anims.create({
        key: "playAnimation",
        frames: this.anims.generateFrameNumbers("animation", { start: 0, end: 6 }) ,
        frameRate: 2,
        repeat: 0,
    });

    this.anims.create({
        key: "playAnimation1",
        frames: this.anims.generateFrameNumbers("animation1", { start: 0, end: 6 }),
        frameRate: 2,
        repeat: 0,
    });

    this.anims.create({
        key: "playBG",
        frames: this.anims.generateFrameNumbers("bg1", { start: 0, end: 4 }),
        frameRate: 3,
        repeat: 0,
    });

    this.time.delayedCall(3500, () => {
        this._logo.setVisible(false);
        this.sprite.setVisible(true);
        this.sprite.anims.play("playAnimation");

        this.sprite.once("animationcomplete", () => {
            this.sprite.anims.play("playAnimation1");

            this.sprite.once("animationcomplete", () => {
                console.log("Animazione completata");
                this.bg.setVisible(true);
                this.bg.anims.play("playBG");

                this.bg.once("animationcomplete", () => {
                    this.bg.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
                    this.pallaGrande.setVisible(true);
                    this.tweens.add({
                        targets: this.pallaGrande,
                        y: this.cameras.main.height - 400,
                        duration: 1000,
                        ease: 'Bounce.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });

                    this.fish.setVisible(true);
                    this.tweens.add({
                        targets: this.fish,
                        alpha: 0.2,
                        duration: 1000,
                        ease: 'Linear',
                        yoyo: true,
                        repeat: -1,
                        onYoyo: () => {
                            this.fish.setVisible(false);
                        },
                        onRepeat: () => {
                            this.fish.setVisible(true);
                        }
                    });

                    this.gioca = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 50, 'gioca').setScale(0.9).setDepth(2).setVisible(true).setInteractive();
                    this.crediti = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 25, 'crediti').setScale(0.9).setDepth(2).setVisible(true);
                    this.gioca.on('pointerdown', () => {
                        this.scene.start('GamePlay');
                    });
                      
                    this.startPlaneAnimations();
                });
            });
        });
    });

    setupCamera().then(startFaceMesh);
  }

  startPlaneAnimations(): void {
    this.plane.setPosition(0, this.cameras.main.height).setVisible(true);
    this.tweens.add({
        targets: this.plane,
        x: this.cameras.main.width,
        y: 0,
        duration: 4000,
        ease: 'Linear',
        onComplete: () => {
            this.plane.setVisible(false);
            this.plane1.setPosition(this.cameras.main.width / 1.5, -this.cameras.main.height).setVisible(true);
            this.tweens.add({
                targets: this.plane1,
                y: this.cameras.main.height + this.plane1.height,
                duration: 4000,
                ease: 'Linear',
                onComplete: () => {
                    this.plane1.setVisible(false); 
                    this.plane2.setPosition(-this.cameras.main.width, this.cameras.main.height / 2 - 150).setVisible(true);
                    this.tweens.add({
                        targets: this.plane2,
                        x: this.cameras.main.width + this.plane2.width,
                        duration: 4000,
                        ease: 'Linear',
                        onComplete: () => {
                            this.plane2.setVisible(false); 
                            this.time.delayedCall(1000, () => {
                                this.startPlaneAnimations();
                            });
                        }
                    });
                }
            });
        }
    });
  }

  update(): void {
    if (window.currentEmotion && window.currentEmotion !== this.lastEmotion) {
      this.lastEmotion = window.currentEmotion;
      console.log("Emozione aggiornata:", this.lastEmotion);
    }

    if (window.mostFrequentEmotion && window.mostFrequentEmotion !== this.emozioneBoot) {
      this.emozioneBoot = window.mostFrequentEmotion;
      console.log("Emozione più rilevata:", this.emozioneBoot);
    }
  }
}