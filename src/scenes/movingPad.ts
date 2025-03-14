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
  import { IPlayer } from "./IPlayer";
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
  
      if (this.scene.input.gamepad) {
        this.scene.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
          this.gamepad = pad;
        });
      }
    }
  
    setGamepad(pad: Phaser.Input.Gamepad.Gamepad) {
      this.gamepad = pad;
    }
  
    update(): void {
      if (this.gamepad) {
        const speed = 200;
        const pad = this.gamepad;
  
        if (pad.leftStick.x !== 0 || pad.leftStick.y !== 0) {
          this.setVelocity(pad.leftStick.x * speed, pad.leftStick.y * speed);
  
          if (pad.leftStick.x > 0 && pad.leftStick.y === 0) {
            this._playerstate = playerstate.destra;
            this.anims.play("player-running-destra", true);
          } else if (pad.leftStick.x < 0 && pad.leftStick.y === 0) {
            this._playerstate = playerstate.sinistra;
            this.anims.play("player-running-sinistra", true);
          } else if (pad.leftStick.y < 0 && pad.leftStick.x === 0) {
            this._playerstate = playerstate.sopra;
            this.anims.play("player-running-sopra", true);
          } else if (pad.leftStick.y > 0 && pad.leftStick.x === 0) {
            this._playerstate = playerstate.sotto;
            this.anims.play("player-running-sotto", true);
          } else if (pad.leftStick.x > 0 && pad.leftStick.y > 0) {
            this._playerstate = playerstate.diagonalesottodestra;
            this.anims.play("player-running-destra", true);
          } else if (pad.leftStick.x < 0 && pad.leftStick.y > 0) {
            this._playerstate = playerstate.diagonalesottosinistra;
            this.anims.play("player-running-sinistra", true); 
          } else if (pad.leftStick.x > 0 && pad.leftStick.y < 0) {
            this._playerstate = playerstate.diagonalesopradestra;
            this.anims.play("player-running-destra", true); 
          } else if (pad.leftStick.x < 0 && pad.leftStick.y < 0) {
            this._playerstate = playerstate.diagonalesoprasinistra;
            this.anims.play("player-running-sinistra", true); 
          }
        } else {
          this.setVelocity(0, 0);
          this._playerstate = playerstate.idle;
          this.anims.play("player-idle", true);
        }
      }
    }
  }