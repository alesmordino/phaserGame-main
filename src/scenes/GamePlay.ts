import playerr from '../scenes/moving';
import movingPad from '../scenes/movingPad';
import { IPlayer } from '../scenes/IPlayer';
import { completeLevel } from '../scenes/levelManBall';
import { completeLevel1 } from '../scenes/casino';
import { completeLevel2} from '../scenes/arcade';

export default class GamePlay extends Phaser.Scene {
  private player: playerr | movingPad;
  private _voth = 0;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private world: Phaser.Tilemaps.TilemapLayer;
  private collisions: Phaser.Tilemaps.TilemapLayer;
  private centerHitbox: Phaser.Physics.Arcade.Sprite;
  private centerHitbox1: Phaser.Physics.Arcade.Sprite;
  private centerHitbox2: Phaser.Physics.Arcade.Sprite;
  private centerHitbox3: Phaser.Physics.Arcade.Sprite;
  private centerHitbox4: Phaser.Physics.Arcade.Sprite;
  private centerHitbox5: Phaser.Physics.Arcade.Sprite;
  private centerHitbox6: Phaser.Physics.Arcade.Sprite;
  private centerHitbox7: Phaser.Physics.Arcade.Sprite;
  private centerHitbox8: Phaser.Physics.Arcade.Sprite;
  private centerHitbox9: Phaser.Physics.Arcade.Sprite;
  private centerHitbox10: Phaser.Physics.Arcade.Sprite;
  private centerHitbox11: Phaser.Physics.Arcade.Sprite;
  private centerHitbox12: Phaser.Physics.Arcade.Sprite;
  private centerHitbox13: Phaser.Physics.Arcade.Sprite;
  private centerHitbox14: Phaser.Physics.Arcade.Sprite;
  private hitboxFinale: Phaser.Physics.Arcade.Sprite;
  private gamepad: Phaser.Input.Gamepad.Gamepad | null = null;
  private pallaGrande: Phaser.GameObjects.Image;
  private pallaPiccola: Phaser.GameObjects.Image;
  private fish: Phaser.GameObjects.Image;
  private plane: Phaser.GameObjects.Image;
  private suggeritore: Phaser.GameObjects.Image;
  private lastPosition: { x: number, y: number } = { x: 470, y: 930 };

  constructor() {
    super({
      key: "GamePlay",
    });
  }

  preload() {
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
    this.load.image('suggeritore', 'assets/images/suggeritore.png');

    this.physics.world.createDebugGraphic();
  }

  create() {
    this.player = new playerr(this, this.lastPosition.x, this.lastPosition.y);
    this.map = this.make.tilemap({ key: "level-1" });
    this.tileset = this.map.addTilesetImage("tilemap-extruded");
    this.world = this.map.createLayer("world", this.tileset, 0, 0);
    if (this.world) {
      this.world.setDepth(1).setAlpha(1);
    } else {
      console.error("Layer 'world' non trovato!");
    }

    this.collisions = this.map.createLayer("collisions", this.tileset, 0, 0);
    if (this.collisions) {
      this.collisions.setDepth(0).setAlpha(1);
      this.collisions.setCollisionByProperty({ collide: true }); 
    } else {
      console.error("Layer 'collisions' non trovato!");
    }

    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;
    this.cameras.main.setBounds(0, 0, mapHeight, mapWidth);
    this.player.setCollideWorldBounds(true);

    this.cameras.main.setScroll(mapWidth / 2 - this.cameras.main.width / 2, mapHeight / 2 - this.cameras.main.height / 2);
    this.cameras.main.setZoom(1);

    this.suggeritore = this.add.image(this.cameras.main.width - 45, 60, 'suggeritore');
    this.suggeritore.setScale(0.2).setDepth(2).setAlpha(0.8);

    this.tweens.add({
      targets: this.suggeritore,
      scale: 0.25,
      alpha: 1,
      duration: 2000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });



    this.centerHitbox = this.physics.add.sprite(573, 140, null).setOrigin(0.5, 0.5);
    this.centerHitbox.body.setSize(20, 80); 
    this.centerHitbox.setImmovable(true);
    this.centerHitbox.setVisible(false); 
    this.centerHitbox.setDebug(true, true, 0xff0000);

    const fogliaanomala = this.add.image(this.centerHitbox.x, this.centerHitbox.y, 'lampros');
    fogliaanomala.setOrigin(0.43, 0.54).setDepth(1).setDisplaySize(46,126 );
    this.time.addEvent({
      delay: 500,
      callback: () => {
        fogliaanomala.setVisible(!fogliaanomala.visible);
      },
      loop: true
    });

    this.centerHitbox1 = this.physics.add.sprite(93, 630, null).setOrigin(0.5, 0.5);
    this.centerHitbox1.body.setSize(20, 80); 
    this.centerHitbox1.setImmovable(true);
    this.centerHitbox1.setVisible(false); 
    this.centerHitbox1.setDebug(true, true, 0xff0000);

    const fogliaanomala1 = this.add.image(this.centerHitbox1.x, this.centerHitbox1.y, 'lampblu');
    fogliaanomala1.setOrigin(0.5, 0.71).setDepth(1).setDisplaySize(55, 67);
    this.time.addEvent({
      delay: 800,
      callback: () => {
        fogliaanomala1.setVisible(!fogliaanomala1.visible);
      },
      loop: true
    });

    this.centerHitbox2 = this.physics.add.sprite(873, 630, null).setOrigin(0.5, 0.5);
    this.centerHitbox2.body.setSize(20, 80); 
    this.centerHitbox2.setImmovable(true); 
    this.centerHitbox2.setVisible(false); 
    this.centerHitbox2.setDebug(true, true, 0xff0000);

    const fogliaanomala2 = this.add.image(this.centerHitbox2.x, this.centerHitbox2.y, 'lamprosa');
    fogliaanomala2.setOrigin(0.48, 0.77).setDepth(1).setDisplaySize(57, 61);
    this.time.addEvent({
      delay: 600,
      callback: () => {
        fogliaanomala2.setVisible(!fogliaanomala2.visible);
      },
      loop: true
    });

    this.centerHitbox3 = this.physics.add.sprite(440, 140, null).setOrigin(0.5, 0.5);
    this.centerHitbox3.body.setSize(20, 80);
    this.centerHitbox3.setImmovable(true); 
    this.centerHitbox3.setVisible(false);
    this.centerHitbox3.setDebug(true, true, 0xff0000);

    const fogliaanomala3 = this.add.image(this.centerHitbox3.x, this.centerHitbox3.y, 'lampverdee');
    fogliaanomala3.setOrigin(0.488, 0.475).setDepth(1).setDisplaySize(43, 118);
    this.time.addEvent({
      delay: 800,
      callback: () => {
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
    this.pallaPiccola.setScale(0.8).setDepth(1); 
    this.pallaPiccola.setVisible(false); 

    let isLargeBall = true;
    this.time.addEvent({
      delay: 1000,
      callback: () => {
          if (isLargeBall) {
              this.pallaGrande.setVisible(true);
              this.pallaPiccola.setVisible(false);
          } else {
              this.pallaGrande.setVisible(false);
              this.pallaPiccola.setVisible(true);
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
    this.physics.add.collider(this.player, this.centerHitbox10, () => {
      this.lastPosition = { x: this.player.x, y: this.player.y };
      this.scene.stop("GamePlay");
      this.scene.start("finaleLevelManBall");
    });


    this.centerHitbox11 = this.physics.add.sprite(770, 480, null).setOrigin(0.5, 0.5);
    this.centerHitbox11.body.setSize(40, 40); 
    this.centerHitbox11.setImmovable(true);
    this.centerHitbox11.setVisible(false); 
    this.centerHitbox11.setDebug(true, true, 0xff0000);

    this.plane = this.add.image(this.centerHitbox11.x, this.centerHitbox11.y, 'plane').setOrigin(0.5, 0.5);
    this.plane.setScale(0.2).setDepth(1); 

    this.tweens.add({
      targets: [this.centerHitbox11,this.plane],
      x: 570,
      y: 320,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.physics.add.collider(this.player, this.centerHitbox11, () => {
      this.lastPosition = { x: this.player.x, y: this.player.y };
      this.scene.stop("GamePlay");
      this.scene.start("arcade");
    });

    this.centerHitbox12 = this.physics.add.sprite(240, 480,null).setOrigin(0.5, 0.5);
    this.centerHitbox12.body.setSize(40, 40); 
    this.centerHitbox12.setImmovable(true); 
    this.centerHitbox12.setVisible(false); 
    this.centerHitbox12.setDebug(true, true, 0xff0000);

    this.fish = this.add.image(this.centerHitbox12.x, this.centerHitbox12.y, 'fish').setOrigin(0.5, 0.5);
    this.fish.setScale(0.8).setDepth(1); 

    this.tweens.add({
      targets: [this.centerHitbox12,this.fish],
      x: 450,
      y: 320,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
    });

    this.physics.add.collider(this.player, this.centerHitbox12, () => {
      this.lastPosition = { x: this.player.x, y: this.player.y };
      this.scene.stop("GamePlay");
      this.scene.start("SceltaIAScene");
    });

    this.centerHitbox14 = this.physics.add.sprite(440, 820, null).setOrigin(0.5, 0.5);
    this.centerHitbox14.body.setSize(20, 80); 
    this.centerHitbox14.setImmovable(true); 
    this.centerHitbox14.setVisible(false);
    this.centerHitbox14.setDebug(true, true, 0xff0000);

    const fogliaanomala4= this.add.image(this.centerHitbox14.x, this.centerHitbox14.y, 'lampbinc');
    fogliaanomala4.setOrigin(0.52, 0.47).setDepth(1).setScale(1, 1);
    this.time.addEvent({
      delay: 500,
      callback: () => {
        fogliaanomala4.setVisible(!fogliaanomala4.visible);
      },
      loop: true
    });
    this.hitboxFinale = this.physics.add.sprite(360, 765, null).setOrigin(0.5, 0.5);
    this.hitboxFinale.body.setSize(40, 40); 
    this.hitboxFinale.setImmovable(true); 
    this.hitboxFinale.setVisible(false); 
    this.hitboxFinale.setDebug(true, true, 0xff0000);

    this.tweens.add({
      targets: [this.hitboxFinale],
      x: 210,
      y: 605,
      duration: 5000,
      ease: 'Sine.easeInOut',
      yoyo: true,
      repeat: -1
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

    let imageDisplayed = false;
    if(completeLevel) {
      if (!imageDisplayed) {
        const image = this.add.image(788,798, 'spicchiodxgiu');
        image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(472, 452);
        imageDisplayed = true;
      }
    }

    let imageDisplayed1 = false;
    if(completeLevel1){
      if (!imageDisplayed1) {
        const image = this.add.image(232,253, 'spicchiosxsu');
        image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(464, 505);
        imageDisplayed1 = true;
        }
    }

    let imageDisplayed2 = false;
    if(completeLevel2){
      if (!imageDisplayed2) {
        const image = this.add.image(789,253.5, 'spicchiodxsu');
        image.setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(471, 507);
        imageDisplayed2 = true;
      }
    }
  }

  update(time: number, delta: number): void {
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
    } else {
      console.error('Gamepad input system is not initialized properly.');
    }
    if (this.gamepad && (Math.abs(this.gamepad.leftStick.x) > 0.1 || Math.abs(this.gamepad.leftStick.y) > 0.1)) {
      // Il controller è collegato e viene utilizzato
      const { x, y } = this.gamepad.leftStick;
  
      this.player.setVelocityX(x * 200);
      this.player.setVelocityY(y * 200);
  
      // Determina la direzione e riproduce l'animazione appropriata
      if (x > 0) {
        this.player.anims.play("player-running-destra", true); // Movimento a destra
      } else if (x < 0) {
        this.player.anims.play("player-running-sinistra", true); // Movimento a sinistra
      } else if (y > 0) {
        this.player.anims.play("player-running-sotto", true); // Movimento verso il basso
      } else if (y < 0) {
        this.player.anims.play("player-running-sopra", true); // Movimento verso l'alto
      }
    } else {
      // Usa i comandi da tastiera
      (this.player as playerr).update();
    }
    if (this._voth == 0) {
      this.player.setFrame(0);
      this.time.delayedCall(2000, () => {
        this._voth = 1;
      });
    }
    if (this._voth == 1 && this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0) 
    {
      this.player.anims.play("player-idle", true);
    }
    if (completeLevel) {
      this.centerHitbox10.setVisible(false);
      this.pallaGrande.setVisible(false);
      this.pallaPiccola.setVisible(false);
      this.centerHitbox10.body.enable = false;
    }
    if(completeLevel1){
      this.centerHitbox12.setVisible(false);
      this.centerHitbox12.body.enable = false;
      this.fish.setVisible(false);
    }
    if(completeLevel2){
      this.centerHitbox11.setVisible(false);
      this.centerHitbox11.body.enable = false;
      this.plane.setVisible(false);
    }
  }
}