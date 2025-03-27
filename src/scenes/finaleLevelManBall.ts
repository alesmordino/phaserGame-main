import Phaser from "phaser";
import { GameData } from "../GameData";

export default class finaleLevelManBall extends Phaser.Scene {
  private blackScreen: Phaser.GameObjects.Image;
  private pallaPiccola: Phaser.Physics.Arcade.Sprite;
  private walkFrame: Phaser.GameObjects.Sprite;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private gamepad: Phaser.Input.Gamepad.Gamepad | null = null;
  private hitbox: Phaser.Physics.Arcade.Sprite;
  private collisionCount: number = 0;

  constructor() {
    super({ key: "finaleLevelManBall" });
  }

  preload(): void {
    this.load.image('black', 'assets/images/black.png');
    this.load.image('pallapiccola', 'assets/images/pallapiccola.png');
    this.load.spritesheet('walk', 'assets/images/walk.png', { frameWidth: 64, frameHeight: 64 });
    this.physics.world.createDebugGraphic();

  }

  create(): void {
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

  }

  handleCollision(): void {
    this.collisionCount++;
    if (this.collisionCount < 3) {
      const randomX = Phaser.Math.Between(50, this.cameras.main.width - 50);
      const randomY = Phaser.Math.Between(50, this.cameras.main.height - 50);
      this.hitbox.setPosition(randomX, randomY);
      this.walkFrame.setPosition(randomX, randomY);
    } else {
      this.pallaPiccola.setVisible(false);
      this.pallaPiccola.body.enable = false;
    }
  }

  update(): void {

    if (this.input.gamepad) {
        this.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
          this.gamepad = pad;
          console.log('Gamepad connected:', pad.id);
        });
  
        this.input.gamepad.once('disconnected', (pad: Phaser.Input.Gamepad.Gamepad) => {
          this.gamepad = null;
          console.log('Gamepad disconnected:', pad.id);
        });
      }
    let velocityX = 0;
    let velocityY = 0;
    const speed = 200;

    if (this.gamepad) {
      const { x, y } = this.gamepad.leftStick;
      velocityX = x * speed;
      velocityY = y * speed;
    } else {
      if (this.cursors.left.isDown) {
        velocityX = -speed;
      } else if (this.cursors.right.isDown) {
        velocityX = speed;
      }

      if (this.cursors.up.isDown) {
        velocityY = -speed;
      } else if (this.cursors.down.isDown) {
        velocityY = speed;
      }
    }

    this.pallaPiccola.setVelocity(velocityX, velocityY);

    if (velocityX !== 0 || velocityY !== 0) {
      this.pallaPiccola.anims.play("player-walk", true);
    } else {
      this.pallaPiccola.anims.stop();
      this.pallaPiccola.setFrame(0);
    }
  }
}
