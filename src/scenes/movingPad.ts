import Phaser from "phaser";

enum playerstate {
  idle,
  destra,
  sinistra,
  sopra,
  sotto,
  diagonalesottodestra,
  diagonalesottosinistra,
  diagonalesopradestra,
  diagonalesoprasinistra
}
export interface IPlayer {
  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, gamepad: Phaser.Input.Gamepad.Gamepad): void;
}

export default class movingPad extends Phaser.Physics.Arcade.Sprite implements IPlayer {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _speed: number = 200; // Velocità del personaggio
  private _playerstate: playerstate = playerstate.idle;
  private gamepad: Phaser.Input.Gamepad.Gamepad | null = null;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'walk');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 0.5);
    this.setDepth(2);
    this.body.setSize(35, 58);
    this.body.setOffset(13, 13);
    this.setDebug(true, true, 0x0000ff);

    this.cursors = scene.input.keyboard.createCursorKeys();

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

    if (this.scene.input.gamepad) {
      this.scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
        this.gamepad = pad;
      });
    }
  }

  setGamepad(pad: Phaser.Input.Gamepad.Gamepad) {
    this.gamepad = pad;
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys, gamepad: Phaser.Input.Gamepad.Gamepad): void {
    const speed = 200;
    let velocityX = 0;
    let velocityY = 0;

    if (gamepad) {
      const leftStickX = gamepad.leftStick.x;
      const leftStickY = gamepad.leftStick.y;

      velocityX = leftStickX * speed;
      velocityY = leftStickY * speed;
    } else if (cursors) {
      if (cursors.left.isDown) {
        velocityX = -speed;
      } else if (cursors.right.isDown) {
        velocityX = speed;
      }

      if (cursors.up.isDown) {
        velocityY = -speed;
      } else if (cursors.down.isDown) {
        velocityY = speed;
      }
    }

    this.setVelocity(velocityX, velocityY);

    if (velocityX !== 0 || velocityY !== 0) {
      this.anims.play("player-walk", true);
    } else {
      this.anims.stop();
      this.setFrame(0);
    }
  }
}