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

export default class playerr extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private _speed: number = 200; // Velocità del personaggio
  private _playerstate: playerstate = playerstate.idle;

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
  }

  update(): void {
    let moving = false;
    let velocityX = 0;
    let velocityY = 0;

    if (this.cursors.left.isDown) {
      velocityX -= this._speed;
      if (this.cursors.up.isDown) {
        velocityY -= this._speed;
        this._playerstate = playerstate.diagonalesoprasinistra;
        this.anims.play("player-running-sinistra", true);
      } else if (this.cursors.down.isDown) {
        velocityY += this._speed;
        this._playerstate = playerstate.diagonalesottosinistra;
        this.anims.play("player-running-sinistra", true);
      } else {
        this._playerstate = playerstate.sinistra;
        this.anims.play("player-running-sinistra", true);
      }
      moving = true;
    } else if (this.cursors.right.isDown) {
      velocityX += this._speed;
      if (this.cursors.up.isDown) {
        velocityY -= this._speed;
        this._playerstate = playerstate.diagonalesopradestra;
        this.anims.play("player-running-destra", true);
      } else if (this.cursors.down.isDown) {
        velocityY += this._speed;
        this._playerstate = playerstate.diagonalesottodestra;
        this.anims.play("player-running-destra", true);
      } else {
        this._playerstate = playerstate.destra;
        this.anims.play("player-running-destra", true);
      }
      moving = true;
    } else if (this.cursors.up.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
      velocityY -= this._speed;
      this._playerstate = playerstate.sopra;
      this.anims.play("player-running-sopra", true);
      moving = true;
    } else if (this.cursors.down.isDown && !this.cursors.left.isDown && !this.cursors.right.isDown) {
      velocityY += this._speed;
      this._playerstate = playerstate.sotto;
      this.anims.play("player-running-sotto", true);
      moving = true;
    }
    const magnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    if (magnitude > 0) {
      velocityX = (velocityX / magnitude) * this._speed;
      velocityY = (velocityY / magnitude) * this._speed;
    }

    this.setVelocity(velocityX, velocityY);
  }
}