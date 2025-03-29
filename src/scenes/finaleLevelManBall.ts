import Phaser from "phaser";
import { GameData } from "../GameData";
import playerr from '../scenes/moving';
import movingPad from '../scenes/movingPad';

export default class finaleLevelManBall extends Phaser.Scene {
  private blackScreen: Phaser.GameObjects.Image;
  private pallaPiccola: Phaser.Physics.Arcade.Sprite;
  private pallaGrande: Phaser.Physics.Arcade.Sprite;
  private isPallaPiccolaActive: boolean = true;
  private walkFrame: Phaser.GameObjects.Sprite;
  private player: playerr | movingPad;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private gamepad: Phaser.Input.Gamepad.Gamepad | null = null;
  private hitbox: Phaser.Physics.Arcade.Sprite;
  private collisionCount: number = 0;
  private bool: boolean = false;
  private portarossa: Phaser.Physics.Arcade.Sprite;
  private centerHitbox: Phaser.Physics.Arcade.Sprite;
  constructor() {
    super({ key: "finaleLevelManBall" });
  }

  preload(): void {
    this.load.image('black', 'assets/images/black.png');
    this.load.image('pallapiccola', 'assets/images/pallapiccola.png');
    this.load.image('pallagrande', 'assets/images/pallagrande.png');
    this.load.spritesheet('walk', 'assets/images/walk.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('portarossa', 'assets/images/porta_rossa.png')
    this.physics.world.createDebugGraphic();

  }

  create(): void {
    this.blackScreen = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'black');
    this.pallaGrande = this.physics.add.sprite(this.cameras.main.width / 2 - 200, this.cameras.main.height / 2, 'pallagrande').setOrigin(0.5, 0.5);
    this.pallaGrande.setScale(1).setDepth(1).setCollideWorldBounds(true).setVisible(false);

    this.pallaPiccola = this.physics.add.sprite(this.cameras.main.width / 2 - 200, this.cameras.main.height / 2, 'pallapiccola').setOrigin(0.5, 0.5);
    this.pallaPiccola.setScale(0.8).setDepth(1).setCollideWorldBounds(true).setVisible(true);

    this.physics.add.collider(this.pallaPiccola, this.hitbox, this.handleCollision, undefined, this);
    this.physics.add.collider(this.pallaGrande, this.hitbox, this.handleCollision, undefined, this);


    this.portarossa = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'portarossa');
    this.portarossa.setImmovable(true);
    this.portarossa.body.setSize(100, 100); // Hitbox della porta
    this.portarossa.setDebug(true, true, 0x00ff00);

    this.centerHitbox = this.physics.add.sprite(335,40, null).setOrigin(0.5, 0.5);
    this.centerHitbox.body.setSize(50, 50); 
    this.centerHitbox.setImmovable(true);
    this.centerHitbox.setVisible(false); 
    this.centerHitbox.setDebug(true, true, 0xff0000);

    if(this.bool == false){
    this.time.addEvent({
      delay: 3500,
      callback: () => {
          if (this.bool) return; // Prevent further alternation if bool is true

          if (this.isPallaPiccolaActive) {
              if (this.pallaPiccola.body) {
                  this.pallaPiccola.setVisible(false).body.enable = false;
              }
              if (this.pallaGrande.body) {
                  this.pallaGrande.setVisible(true).body.enable = true;
              }
          } else {
              if (this.pallaGrande.body) {
                  this.pallaGrande.setVisible(false).body.enable = false;
              }
              if (this.pallaPiccola.body) {
                  this.pallaPiccola.setVisible(true).body.enable = true;
              }
          }
          this.isPallaPiccolaActive = !this.isPallaPiccolaActive; 
      },
      loop: true 
    });
  }

    this.walkFrame = this.add.sprite(this.cameras.main.width / 2 + 100, this.cameras.main.height / 2, 'walk', 27);
    this.walkFrame.setScale(1).setDepth(1);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.hitbox = this.physics.add.sprite(this.cameras.main.width / 2 + 100, this.cameras.main.height / 2, null);
    this.hitbox.body.setSize(50, 50); 
    this.hitbox.setImmovable(true);
    this.hitbox.setVisible(false); 
    this.hitbox.setDebug(true, true, 0xff0000);

    this.physics.add.collider(this.pallaPiccola, this.hitbox, this.handleCollision, undefined, this);
    this.physics.add.collider(this.pallaPiccola, this.centerHitbox);
    this.physics.add.collider(this.pallaPiccola, this.portarossa);

    // Initialize the player based on input type
    if(this.bool){
    if (this.input.gamepad && this.input.gamepad.total > 0) {
        this.player = new movingPad(this, this.walkFrame.x, this.walkFrame.y); // Use movingPad for gamepad
    } else {
        this.player = new playerr(this, this.walkFrame.x, this.cameras.main.height / 2); // Use playerr for keyboard
    }
  }
  }

  handleCollision(): void {
    this.collisionCount++;
    if (this.collisionCount < 3) {
      const randomX = Phaser.Math.Between(50, this.cameras.main.width - 50);
      const randomY = Phaser.Math.Between(50, this.cameras.main.height - 50);
      this.hitbox.setPosition(randomX, randomY);
      this.walkFrame.setPosition(randomX, randomY);

      // Alternate between pallaPiccola and pallaGrande
      if (this.isPallaPiccolaActive) {
        if (this.pallaPiccola.body) {
          this.pallaPiccola.setVisible(false).body.enable = false;
        }
        if (this.pallaGrande.body) {
          this.pallaGrande.setVisible(true).body.enable = true;
        }
      } else {
        if (this.pallaGrande.body) {
          this.pallaGrande.setVisible(false).body.enable = false;
        }
        if (this.pallaPiccola.body) {
          this.pallaPiccola.setVisible(true).body.enable = true;
        }
      }
      this.isPallaPiccolaActive = !this.isPallaPiccolaActive;

    } else {
      this.bool = true;
      this.pallaPiccola.destroy(); // Remove pallaPiccola
      this.pallaGrande.destroy(); // Remove pallaGrande
      this.walkFrame.setVisible(false); // Make walkFrame the active player
      this.physics.world.enable(this.walkFrame); // Enable physics for walkFrame

      (this.walkFrame.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true); // Allow walkFrame to collide with world bounds

      // Initialize the player after 3 collisions
      if (this.input.gamepad && this.input.gamepad.total > 0) {
          this.player = new movingPad(this, this.walkFrame.x, this.walkFrame.y); // Use movingPad for gamepad
      } else {
          this.player = new playerr(this, this.walkFrame.x, this.walkFrame.y); // Use playerr for keyboard
      }
      this.physics.add.collider(this.walkFrame, this.hitbox);
    }

  }

  update(): void {
    if (this.input.gamepad) {
        this.input.gamepad.once('connected', (pad: Phaser.Input.Gamepad.Gamepad) => {
            this.gamepad = pad;
            if (this.player instanceof movingPad) {
                this.player.setGamepad(pad);
            }
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

    if (!this.bool) {
        // Handle input for pallaPiccola or pallaGrande
        const activeBall = this.isPallaPiccolaActive ? this.pallaPiccola : this.pallaGrande;

        if (this.gamepad && (Math.abs(this.gamepad.leftStick.x) > 0.1 || Math.abs(this.gamepad.leftStick.y) > 0.1)) {
            // Gamepad input
            const { x, y } = this.gamepad.leftStick;
            velocityX = x * speed;
            velocityY = y * speed;
        } else if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
            // Keyboard input
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

        activeBall.setVelocity(velocityX, velocityY);
        return; // Skip further processing for walkFrame
    }

    // Ensure player is defined before accessing its properties
    if (!this.player) {
        console.warn("Player is not initialized yet.");
        return;
    }

    // Handle input for walkFrame after 3 collisions
    if (this.gamepad && (Math.abs(this.gamepad.leftStick.x) > 0.1 || Math.abs(this.gamepad.leftStick.y) > 0.1)) {
        const { x, y } = this.gamepad.leftStick;
        velocityX = x * speed;
        velocityY = y * speed;

        if (x > 0) {
            this.player.anims.play("player-running-destra", true);
        } else if (x < 0) {
            this.player.anims.play("player-running-sinistra", true);
        } else if (y > 0) {
            this.player.anims.play("player-running-sotto", true);
        } else if (y < 0) {
            this.player.anims.play("player-running-sopra", true);
        }
    } else if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
        if (this.cursors.left.isDown) {
            velocityX = -speed;
            this.player.anims.play("player-running-sinistra", true);
        } else if (this.cursors.right.isDown) {
            velocityX = speed;
            this.player.anims.play("player-running-destra", true);
        } else if (this.cursors.up.isDown) {
            velocityY = -speed;
            this.player.anims.play("player-running-sopra", true);
        } else if (this.cursors.down.isDown) {
            velocityY = speed;
            this.player.anims.play("player-running-sotto", true);
        }
    } else {
        this.player.anims.play("player-idle", true);
    }

    this.player.setVelocityX(velocityX);
    this.player.setVelocityY(velocityY);
  }
}
