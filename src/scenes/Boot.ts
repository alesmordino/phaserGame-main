import Phaser from "phaser";
import { GameData } from "../GameData";

export default class Boot extends Phaser.Scene {
  private _logo: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private logo: Phaser.GameObjects.Image;
  private sprite: Phaser.GameObjects.Sprite;
  private plane: Phaser.GameObjects.Image;
  private plane1: Phaser.GameObjects.Image;
  private plane2: Phaser.GameObjects.Image;
  private pallaGrande: Phaser.GameObjects.Image;
  private fish: Phaser.GameObjects.Image;
  private gioca: Phaser.GameObjects.Image;
  private suggeritore: Phaser.GameObjects.Image;
  private music: Phaser.Sound.BaseSound;
  private creditiImage: Phaser.GameObjects.Image;
  private backButton: Phaser.GameObjects.Image;
  private animationsPlayed: boolean = false;

  constructor() {
    super({ key: "Boot" });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.load.image("credititesti", "assets/images/creditiTesti.jpeg");
    this.load.image("back", "assets/images/back.png");
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
    this.load.image('crediti', 'assets/images/crediti.png');
    this.load.image('autoplay', 'assets/images/autoplay.png');
    this.load.audio('colonna', 'assets/sounds/colonna.mp3');
  }

  create(): void {
    // Initialize music
    this.music = this.sound.add('colonna', { loop: true });
    this.music.play();

    // Initialize credit button and back button
    this.creditiImage = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'credititesti')
      .setVisible(false)
      .setDepth(5);
    
    this.backButton = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 90, 'back')
      .setInteractive()
      .setScale(0.5)
      .setVisible(false)
      .setDepth(5);

    // Hide crediti image when back button is clicked
    this.backButton.on('pointerdown', () => {
      this.creditiImage.setVisible(false);
      this.backButton.setVisible(false);
    });

    // Add game objects
    this._logo = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.3);
    this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "animation").setVisible(false).setOrigin(0.5, 0.5);
    this.bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1").setVisible(false).setScale(0.55);
    this.suggeritore = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "suggeritore").setVisible(false).setScale(0.15).setAlpha(0.3);
    this.plane = this.add.image(0, this.cameras.main.height, 'plane').setScale(0.4).setDepth(1).setVisible(false);
    this.plane1 = this.add.image(this.cameras.main.width / 1.5, -this.cameras.main.height, 'plane1').setScale(0.45).setDepth(1).setVisible(false);
    this.plane2 = this.add.image(-this.cameras.main.width, this.cameras.main.height / 2 - 150, 'plane2').setScale(0.45).setDepth(1).setVisible(false);
    this.pallaGrande = this.add.image(this.cameras.main.width - 200, this.cameras.main.height - 300, 'pallagrande').setScale(1.4).setDepth(1).setVisible(false);
    this.fish = this.add.image(150, this.cameras.main.height - 150, 'fish').setScale(1.2).setDepth(2).setAlpha(2).setVisible(false);

    // Animation Tweens
    this.tweens.add({
      targets: this._logo,
      scale: 1.45,
      duration: 3000,
      ease: "Sine.easeInOut",
    });

    // Animation Definitions
    this.anims.create({
      key: "playAnimation",
      frames: this.anims.generateFrameNumbers("animation", { start: 0, end: 6 }),
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

    // After a delay, play animations
    this.time.delayedCall(3500, () => {
      this._logo.setVisible(false);
      this.sprite.setVisible(true);
      this.sprite.anims.play("playAnimation");

      this.sprite.once("animationcomplete", () => {
        this.sprite.anims.play("playAnimation1");

        this.sprite.once("animationcomplete", () => {
          console.log("Animations completed");
          this.animationsPlayed = true;
          this.startPlayBG();
        });
      });
    });
  }

  private startPlayBG(): void {
    this.bg.setVisible(true);
    this.bg.anims.play("playBG");

    this.bg.once("animationcomplete", () => {
      this.bg.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
      this.pallaGrande.setVisible(true);
      this.tweens.add({
        targets: this.pallaGrande,
        y: this.cameras.main.height - 450,
        duration: 1000,
        ease: 'Bounce.easeInOut',
        yoyo: true,
        repeat: -1
      });

      this.suggeritore.setVisible(true).setAlpha(0.3);
      this.tweens.add({
        targets: this.suggeritore,
        scale: 0.25,
        alpha: 1,
        duration: 4000,
        ease: 'Sine.easeInOut',
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
        onYoyo: () => this.fish.setVisible(false),
        onRepeat: () => this.fish.setVisible(true)
      });

      this.logo = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 300, "logoH").setScale(0.8);
      this.gioca = this.add.image(this.cameras.main.width / 2 + 5, this.cameras.main.height / 2 - 50, 'gioca')
        .setScale(0.7)
        .setDepth(2)
        .setVisible(true)
        .setInteractive();

      this.gioca.on('pointerdown', () => this.scene.start('GamePlay'));
      this.gioca.on('pointerover', () => {
        this.tweens.add({
          targets: this.gioca,
          scale: 1.1,
          duration: 200,
          ease: 'Linear'
        });
      });
      this.gioca.on('pointerout', () => {
        this.tweens.add({
          targets: this.gioca,
          scale: 0.7,
          duration: 200
        });
      });

      // Add autoplay.png in the bottom-left corner
      const autoplayButton = this.add.image(50, this.cameras.main.height - 50, 'autoplay')
        .setInteractive()
        .setScale(0.5)
        .setDepth(5);

      autoplayButton.on('pointerdown', () => {
        autoplayButton.setVisible(false); // Hide autoplay button

        // Display mappatura controller.png in the bottom-left corner
        const controllerImage = this.add.image(100, this.cameras.main.height - 90, 'mappatura controller')
          .setScale(0.5)
          .setDepth(5);

        // Add back.png in the bottom-right corner
        const backButton = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 90, 'back')
          .setInteractive()
          .setScale(0.5)
          .setDepth(5);

        backButton.on('pointerdown', () => {
          controllerImage.setVisible(false); // Hide controller image
          backButton.setVisible(false); // Hide back button
          autoplayButton.setVisible(true); // Show autoplay button again
        });
      });

      // Add crediti.png in the bottom-right corner after playBG
      const creditiButton = this.add.image(this.cameras.main.width - 100, this.cameras.main.height - 90, 'crediti')
        .setInteractive()
        .setScale(0.5)
        .setDepth(5)
        .setVisible(true);

      creditiButton.on('pointerdown', () => {
        this.creditiImage.setVisible(true);
        this.backButton.setVisible(true);
      });

      this.startPlaneAnimations();
    });
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

  update(): void {}
}
