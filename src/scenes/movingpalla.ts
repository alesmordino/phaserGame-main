export default class PallaPiccola extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _speed: number = 200; // Velocità della palla
  
    constructor(scene: Phaser.Scene, x: number, y: number) {
      super(scene, x, y, 'pallapiccola');
      scene.add.existing(this);
      scene.physics.add.existing(this);
  
      this.setOrigin(0.5, 0.5);
      this.setDepth(2);
      this.body.setSize(15, 15);
      this.setDebug(true, true, 0x00ff00);
    
      scene.anims.create({
        key: "palla-move",
        frames:[{ key: "pallapiccola", frame: 0 }] ,
        frameRate: 10,
        repeat: -1
      });
  
      scene.anims.create({
        key: "palla-idle",
        frames: [{ key: "pallapiccola", frame: 0 }],
        frameRate: 10
      });
    }
  
    update(): void {
      let velocityX = 0;
      let velocityY = 0;
      this.cursors = this.scene.input.keyboard.createCursorKeys();
  
      if (this.cursors.left.isDown) {
        velocityX -= this._speed;
        this.anims.play("palla-move", true);
      } else if (this.cursors.right.isDown) {
        velocityX += this._speed;
        this.anims.play("palla-move", true);
      }
  
      if (this.cursors.up.isDown) {
        velocityY -= this._speed;
        this.anims.play("palla-move", true);
      } else if (this.cursors.down.isDown) {
        velocityY += this._speed;
        this.anims.play("palla-move", true);
      }
  
      if (velocityX === 0 && velocityY === 0) {
        this.anims.play("palla-idle", true);
      }
  
      this.setVelocity(velocityX, velocityY);
    }
  }