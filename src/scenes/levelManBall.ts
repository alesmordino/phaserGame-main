import PallaPiccola from '../scenes/movingpalla';
export let completeLevel: boolean = false;

export default class levelManBall extends Phaser.Scene {
  private pallaPiccola: PallaPiccola;
  private tileset: Phaser.Tilemaps.Tileset;
  private world: Phaser.Tilemaps.TilemapLayer;
  private map: Phaser.Tilemaps.Tilemap;
  private teleporter: Phaser.Physics.Arcade.Sprite;
  private teleporter1: Phaser.Physics.Arcade.Sprite;
  private teleporter2: Phaser.Physics.Arcade.Sprite;
  private teleporter3: Phaser.Physics.Arcade.Sprite;
  private teleporter4: Phaser.Physics.Arcade.Sprite;
  private teleporter5: Phaser.Physics.Arcade.Sprite;
  private teleporter6: Phaser.Physics.Arcade.Sprite;
  private teleporter7: Phaser.Physics.Arcade.Sprite;
  private centerHitbox: Phaser.Physics.Arcade.Sprite;
  private centerHitbox1: Phaser.Physics.Arcade.Sprite;
  private centerHitbox2: Phaser.Physics.Arcade.Sprite;
  private centerHitbox3: Phaser.Physics.Arcade.Sprite;
  private interagisciText: Phaser.GameObjects.Text;
  private interagisciText1: Phaser.GameObjects.Text;
  private interagisciText2: Phaser.GameObjects.Text;
  private interagisciText3: Phaser.GameObjects.Text;
  private interagisciBox: Phaser.GameObjects.Rectangle;
  private interagisciBox1: Phaser.GameObjects.Rectangle;
  private interagisciBox2: Phaser.GameObjects.Rectangle;
  private interagisciBox3: Phaser.GameObjects.Rectangle;
  private image1: Phaser.GameObjects.Image;
  private image2: Phaser.GameObjects.Image;
  private image3: Phaser.GameObjects.Image;

  constructor() {
    super({
      key: "levelManBall",
    });
  }

  preload() {
    this.load.spritesheet("pallapiccola", "assets/images/pallapiccola.png", { frameWidth: 30, frameHeight: 30 });
    this.load.image('mappamanball', 'assets/map/mappamanball.png');
    this.load.tilemapTiledJSON('manball', 'assets/map/manballlevel.json');
    this.load.image('teleporter', 'assets/images/teleporter.png');
    this.load.image('1', 'assets/images/1.png');
    this.load.image('2', 'assets/images/2.png');
    this.load.image('3', 'assets/images/3.png');
    this.load.audio('music', 'assets/sounds/ludovico.mp3');
    this.load.audio('urlo', 'assets/sounds/urlo.mp3');
    this.load.audio('urlo1', 'assets/sounds/urlo1.mp3');
    this.load.audio('urlo2', 'assets/sounds/urlo2.mp3');
    this.load.video('anima', 'assets/images/anima.mp4');
    this.load.video('portabia', 'assets/images/portabia.mp4');
    this.load.video('portale', 'assets/images/portale.mp4');
    this.load.video('portave', 'assets/images/portave.mp4');
    this.physics.world.createDebugGraphic();
  }

  create() {
    this.pallaPiccola = new PallaPiccola(this, 75, 85);

    this.sound.play('music', { loop: true });

    this.map = this.make.tilemap({ key: "manball" });
    this.tileset = this.map.addTilesetImage("mappamanball", "mappamanball", 30, 30);
    this.world = this.map.createLayer("world", this.tileset, 0, 0);
    if (this.world) {
      this.world.setDepth(1).setAlpha(1);
    } else {
      console.error("Layer 'world' non trovato!");
    }

    // Crea gli oggetti di collisione dalla mappa
    const collisionLayer = this.map.getObjectLayer('collisions');
    collisionLayer.objects.forEach((object) => {
      if (object.rectangle) {
        const collisionObject = this.physics.add.sprite(object.x + object.width / 2, object.y + object.height / 2, null).setOrigin(0.5, 0.5);
        collisionObject.body.setSize(object.width, object.height);
        collisionObject.setImmovable(true);
        collisionObject.setVisible(false);
        collisionObject.setDebug(true, true, 0xff0000);
        this.physics.add.collider(this.pallaPiccola, collisionObject);
      }
    });

    // Mostra il video e riproduce il suono ogni 5 secondi
      this.time.addEvent({
        delay: 5000, // 5 secondi
        callback: () => {
        const video = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'anima');
        video.setDepth(3);
        video.setScale(0.5);
        video.play(true);
        this.sound.play('urlo');
  
        // Rimuovi il video dopo che è terminato
        this.time.delayedCall(500, () => {
          video.destroy();
          });
        },
        loop: true,
      });

    this.image1 = this.add.image(120, 50, '3');
    this.image1.setScrollFactor(0);
    this.image1.setDepth(2);
    this.image1.setDisplaySize(210,70);
    this.image1.setVisible(true);

    this.image2 = this.add.image(85, 50, '2');
    this.image2.setScrollFactor(0);
    this.image2.setDepth(2);
    this.image2.setDisplaySize(140,70);
    this.image2.setVisible(true);

    this.image3 = this.add.image(50, 50, '1');
    this.image3.setScrollFactor(0);
    this.image3.setDepth(2);
    this.image3.setDisplaySize(70,70);
    this.image3.setVisible(true);

    const mapWidth = this.map.widthInPixels;
    const mapHeight = this.map.heightInPixels;

    // Imposta i limiti della fotocamera in base alle dimensioni della mappa
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(this.pallaPiccola);
    this.cameras.main.setZoom(1);
    this.cameras.main.setBackgroundColor('#000000');

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.teleporter = this.physics.add.sprite(75, 180, 'teleporter');
    this.teleporter.setDisplaySize(20, 20);
    this.teleporter.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter, this.teleportPlayer, undefined, this);

    this.teleporter1 = this.physics.add.sprite(550, 80, 'teleporter');
    this.teleporter1.setDisplaySize(20, 20);
    this.teleporter1.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter1, this.teleportPlayer1, undefined, this);

    this.teleporter2 = this.physics.add.sprite(410, 80, 'teleporter');
    this.teleporter2.setDisplaySize(20, 20);
    this.teleporter2.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter2, this.teleportPlayer2, undefined, this);

    this.teleporter3 = this.physics.add.sprite(75, 850, 'teleporter');
    this.teleporter3.setDisplaySize(20, 20);
    this.teleporter3.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter3, this.teleportPlayer3, undefined, this);
    
    this.teleporter4 = this.physics.add.sprite(190, 980, 'teleporter');
    this.teleporter4.setDisplaySize(20, 20);
    this.teleporter4.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter4, this.teleportPlayer4, undefined, this);

    this.teleporter5 = this.physics.add.sprite(980, 910, 'teleporter');
    this.teleporter5.setDisplaySize(20, 20);
    this.teleporter5.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter5, this.teleportPlayer5, undefined, this);

    this.teleporter6 = this.physics.add.sprite(1023, 600, 'teleporter');
    this.teleporter6.setDisplaySize(20, 20);
    this.teleporter6.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter6, this.teleportPlayer6, undefined, this);

    this.teleporter7 = this.physics.add.sprite(140, 180, 'teleporter');
    this.teleporter7.setDisplaySize(20, 20);
    this.teleporter7.setVisible(false);
    this.physics.add.overlap(this.pallaPiccola, this.teleporter7, this.teleportPlayer7, undefined, this);
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.centerHitbox = this.physics.add.sprite(150, 940, null).setOrigin(0.5, 0.5);
    this.centerHitbox.body.setSize(55, 50); 
    this.centerHitbox.setImmovable(true);
    this.centerHitbox.setVisible(false); 
    this.centerHitbox.setDebug(true, true, 0xff0000);

    this.centerHitbox1 = this.physics.add.sprite(375, 100, null).setOrigin(0.5, 0.5);
    this.centerHitbox1.body.setSize(55, 50); 
    this.centerHitbox1.setImmovable(true);
    this.centerHitbox1.setVisible(false); 
    this.centerHitbox1.setDebug(true, true, 0xff0000);

    this.centerHitbox2 = this.physics.add.sprite(1017, 930, null).setOrigin(0.5, 0.5);
    this.centerHitbox2.body.setSize(30, 50); 
    this.centerHitbox2.setImmovable(true);
    this.centerHitbox2.setVisible(false); 
    this.centerHitbox2.setDebug(true, true, 0xff0000);

    this.centerHitbox3 = this.physics.add.sprite(695, 440, null).setOrigin(0.5, 0.5);
    this.centerHitbox3.body.setSize(40, 90); 
    this.centerHitbox3.setImmovable(true);
    this.centerHitbox3.setVisible(false); 
    this.centerHitbox3.setDebug(true, true, 0xff0000);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.physics.add.collider(this.pallaPiccola, this.centerHitbox);
    this.physics.add.collider(this.pallaPiccola, this.centerHitbox1);
    this.physics.add.collider(this.pallaPiccola, this.centerHitbox2);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.interagisciBox = this.add.rectangle(150, 940, 120, 30, 0x000000); // Nero
    this.interagisciBox.setVisible(false);
    this.interagisciText = this.add.text(100, 933, 'Interagisci', { fontSize: '16px', color: '#fff' }); // Testo bianco
    this.interagisciText.setVisible(false);

    this.interagisciBox1 = this.add.rectangle(375, 100, 120, 30, 0x000000); // Nero
    this.interagisciBox1.setVisible(false);
    this.interagisciText1 = this.add.text(325, 92, 'Interagisci', { fontSize: '16px', color: '#fff' }); // Testo bianco
    this.interagisciText1.setVisible(false);

    this.interagisciBox2= this.add.rectangle(1017, 930, 120, 30, 0x000000); // Nero
    this.interagisciBox2.setVisible(false);
    this.interagisciText2 = this.add.text(965, 925, 'Interagisci', { fontSize: '16px', color: '#fff' }); // Testo bianco
    this.interagisciText2.setVisible(false);

    this.interagisciBox3 = this.add.rectangle(150, 940, 120, 30, 0x000000); // Nero
    this.interagisciBox3.setVisible(false);
    this.interagisciText3 = this.add.text(100, 933, 'Interagisci', { fontSize: '16px', color: '#fff' }); // Testo bianco
    this.interagisciText3.setVisible(false);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    this.input.keyboard.on('keydown-J', () => {
      this.scene.stop('level-1');
      this.scene.get('GamePlay');
      this.scene.start('GamePlay');
    });
  }

  update(time: number, delta: number): void {
    this.pallaPiccola.update();
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

   const distance = Phaser.Math.Distance.Between(this.pallaPiccola.x, this.pallaPiccola.y, this.centerHitbox.x, this.centerHitbox.y);
    if (distance < 50) {
      this.interagisciBox.setVisible(true);
      this.interagisciText.setVisible(true);
      this.interagisciBox.setDepth(2);
      this.interagisciText.setDepth(2);
      if(this.input.keyboard.checkDown(this.input.keyboard.addKey('E'), 500)) 
      {
        this.interagisciBox.setVisible(false);
        this.interagisciText.setVisible(false);
        const doorVideo = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'portale');
        doorVideo.setDepth(4);
        doorVideo.setScale(this.cameras.main.zoom);
        doorVideo.play(true);
        this.sound.play('urlo1');
        // Rimuovi il video dopo che è terminato
        this.time.delayedCall(5000, () => {
          doorVideo.destroy();
        });
        if (this.image1.visible && this.image2.visible && this.image3.visible) {
          this.image1.setVisible(false);
        } else if (!this.image1.visible && this.image2.visible && this.image3.visible) {
          this.image2.setVisible(false);
        } else if (!this.image1.visible && !this.image2.visible && this.image3.visible) {
          this.image3.setVisible(false);
          console.log('game over');
          this.scene.stop('level-1');
          this.scene.start('GamePlay');
        }
      }
    } else {
      this.interagisciBox.setVisible(false);
      this.interagisciText.setVisible(false);
    }

    const distance1 = Phaser.Math.Distance.Between(this.pallaPiccola.x, this.pallaPiccola.y, this.centerHitbox1.x, this.centerHitbox1.y);
    if (distance1 < 50) {
      this.interagisciBox1.setVisible(true);
      this.interagisciText1.setVisible(true);
      this.interagisciBox1.setDepth(2);
      this.interagisciText1.setDepth(2);
      if(this.input.keyboard.checkDown(this.input.keyboard.addKey('E'), 500)) 
      {
        this.interagisciBox1.setVisible(false);
        this.interagisciText1.setVisible(false);
        const doorVideo = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'portabia');
        doorVideo.setDepth(4);
        doorVideo.setScale(this.cameras.main.zoom);
        doorVideo.play(true);
        this.sound.play('urlo1');
        // Rimuovi il video dopo che è terminato
        this.time.delayedCall(5000, () => {
          doorVideo.destroy();
        });
        // Controlla lo stato di visibilità delle immagini
        if (this.image1.visible && this.image2.visible && this.image3.visible) {
          this.image1.setVisible(false);
        } else if (!this.image1.visible && this.image2.visible && this.image3.visible) {
          this.image2.setVisible(false);
        } else if (!this.image1.visible && !this.image2.visible && this.image3.visible) {
          this.image3.setVisible(false);
          console.log('game over');
          this.scene.stop('level-1');
          this.scene.start('GamePlay');
        }
      }
    } else {
      this.interagisciBox1.setVisible(false);
      this.interagisciText1.setVisible(false);
    }

    const distance2 = Phaser.Math.Distance.Between(this.pallaPiccola.x, this.pallaPiccola.y, this.centerHitbox2.x, this.centerHitbox2.y);
    if (distance2 < 50) {
      this.interagisciBox2.setVisible(true);
      this.interagisciText2.setVisible(true);
      this.interagisciBox2.setDepth(2);
      this.interagisciText2.setDepth(2);
      if(this.input.keyboard.checkDown(this.input.keyboard.addKey('E'), 500)) 
      {
        this.interagisciBox2.setVisible(false);
        this.interagisciText2.setVisible(false);
        const doorVideo = this.add.video(this.cameras.main.centerX, this.cameras.main.centerY, 'portave');
        doorVideo.setDepth(4);
        doorVideo.setScale(this.cameras.main.zoom);
        doorVideo.play(true);
        this.sound.play('urlo1');
        // Rimuovi il video dopo che è terminato
        this.time.delayedCall(5000, () => {
          doorVideo.destroy();
        });

        if (this.image1.visible && this.image2.visible && this.image3.visible) {
          this.image1.setVisible(false);
        } else if (!this.image1.visible && this.image2.visible && this.image3.visible) {
          this.image2.setVisible(false);
        } else if (!this.image1.visible && !this.image2.visible && this.image3.visible) {
          this.image3.setVisible(false);
          console.log('game over');
          this.scene.stop('level-1');
          this.scene.start('GamePlay');
        }
      }
    } else {
      this.interagisciBox2.setVisible(false);
      this.interagisciText2.setVisible(false);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  // Funzione per teletrasportare il personaggio
  private teleportPlayer(): void {
    this.pallaPiccola.setPosition(1000, 1050); // Cambia la posizione del personaggio
  }
  private teleportPlayer1(): void {
    this.pallaPiccola.setPosition(400, 135); // Cambia la posizione del personaggio
  }
  private teleportPlayer2(): void {
    this.pallaPiccola.setPosition(180, 680); // Cambia la posizione del personaggio
  }
  private teleportPlayer3(): void {
    this.pallaPiccola.setPosition(180, 900); // Cambia la posizione del personaggio
  }
  private teleportPlayer4(): void {
    this.pallaPiccola.setPosition(1000, 130); // Cambia la posizione del personaggio
  }
  private teleportPlayer5(): void {
    this.pallaPiccola.setPosition(550, 120); // Cambia la posizione del personaggio
  }
  private teleportPlayer6(): void {
    this.pallaPiccola.setPosition(550, 120); // Cambia la posizione del personaggio
  }
  private teleportPlayer7(): void {
    this.pallaPiccola.setPosition(980, 850); // Cambia la posizione del personaggio
  }
}