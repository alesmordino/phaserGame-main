import playerr from '../scenes/moving';
import movingPad from '../scenes/movingPad';
import { IPlayer } from '../scenes/IPlayer';

export let completeLevel2: Boolean = false;
export default class arcade extends Phaser.Scene {
  private map!: Phaser.Tilemaps.Tilemap;
  private music: Phaser.Sound.BaseSound;
  private tileset!: Phaser.Tilemaps.Tileset;
  private worldLayer!: Phaser.Tilemaps.TilemapLayer;
  private collisionLayer!: Phaser.Tilemaps.TilemapLayer;
  private player: playerr | movingPad; // Usa la classe playerr per il player
  private timerText!: Phaser.GameObjects.Text; // Testo per il timer
  private earthquakeIntensity: number = 0; // Intensità del terremoto
  private gamepad: Phaser.Input.Gamepad.Gamepad | null = null;
  private _voth = 0;
  private start: Phaser.GameObjects.Image;
  private frase: Phaser.GameObjects.Image;
  private clicked: boolean = false;
  private haivinto: Phaser.GameObjects.Image;
  private black: Phaser.GameObjects.Image;

  constructor() {
    super("arcade");
  }

  preload() {
    // Carica la mappa e il tileset
    this.load.image("vinto", "assets/images/vinto.png");
    this.load.tilemapTiledJSON("arcadeMap", "assets/map/arcade.json"); // File JSON della mappa
    this.load.image("arcadeTileset", "assets/map/cabinato_comp.png"); // Immagine del tileset
    this.load.image("aereo", "assets/images/aereo_alladestra_rosso.png");
    this.load.image("aereo1", "assets/images/aereo_alto_sin.png");
    this.load.image("aereo2", "assets/images/aereo_rosso_basso_sin.png");
    this.load.image("aereo3", "assets/images/aereo_rosso_destra_basso.png");
    this.load.image("aereo4", "assets/images/aereo_sotto_rosso_sin.png");
    this.load.image("aereo5", "assets/images/aereo_verde_destra.png");
    this.load.image("aereo6", "assets/images/aero__rosso_destraalto.png");
    this.load.image("aereo7", "assets/images/areo_arcade.png");
    this.load.image("bottonesin", "assets/images/bottone_sinistra.png");
    this.load.image("bottoneve", "assets/images/bottone_verde.png");
    this.load.image("palladx", "assets/images/palla_destra.png");
    this.load.image("pallasx", "assets/images/palla_sinstra.png");
    this.load.image("pallinolev", "assets/images/pallino_leva.png");
    this.load.image("pallinosx", "assets/images/pallino_leva_sin.png");
    this.load.image("aereo8", "assets/images/verde_piccolo_destra.png");
    this.load.image("scritta", "assets/images/cabina/IISFERMI.png");
    this.load.spritesheet("walk", "assets/images/walk.png");
    this.load.image("blackScreen", "assets/images/black.png");
    this.load.image("plane", "assets/images/plane.png");
    this.load.image("suggeritore", "assets/images/suggeritore.png");
    this.load.image("frase", "assets/images/frase.png");
    this.load.audio('colonna', 'assets/sounds/arcade.mp3');

    this.physics.world.createDebugGraphic();

  }

  create() {
    this.music = this.sound.add('colonna', { loop: true });
    this.music.play();
    // Crea la mappa
    this.start = this.add.image(this.cameras.main.width - 90, 60,"suggeritore").setDepth(7).setScale(0.25);
    this.frase = this.add.image(this.cameras.main.width - 250, 75, "frase").setDepth(7);
    this.map = this.make.tilemap({ key: "arcadeMap" });
    this.tileset = this.map.addTilesetImage("cabinato_comp", "arcadeTileset");
    this.haivinto = this.add.sprite(this.cameras.main.width/2, this.cameras.main.height/2,"vinto" )
    this.worldLayer = this.map.createLayer("world", this.tileset, 0, 0);
    this.worldLayer.setDepth(1);

    this.collisionLayer = this.map.createLayer("collisions", this.tileset, 0, 0);
    this.collisionLayer.setDepth(0);

    this.collisionLayer.setCollisionByProperty({ collide: true });

    // Aggiungi il player
    this.player = new playerr(this, 100, 100);
    this.player.setVelocity(600);
    this.player.setDepth(3);
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.setBackgroundColor(0x000000);

    // Disabilita il movimento del player finché il livello non inizia
    this.player.setActive(false).setVisible(false);
    this.input.once("pointerdown", () => {
      if (!this.clicked) {
          this.clicked = true;
          if (this.frase && this.frase.active) {
              this.frase.destroy();
          }
          this.startLevel();
      }
  });

    this.physics.add.collider(this.player, this.collisionLayer);

    // Timer per il livello
    this.timerText = this.add.text(16, 16, "Tempo: 3:00", {
      font: "24px Arial",
      color: "#ffffff",
    }).setDepth(10);
  }

  update(time: number, delta: number):void{
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
      
          this.player.setVelocityX(x * 350);
          this.player.setVelocityY(y * 350);
      
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
  }

  startLevel() {
    // Attiva il player
    this.player.setActive(true).setVisible(true);

    // Inizia il timer di 3 minuti
    let timeLeft = 180; // 3 minuti in secondi
    const timerEvent = this.time.addEvent({
      delay: 1000, // Ogni secondo
      loop: true,
      callback: () => {
        timeLeft--;

        // Aggiorna il testo del timer
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        this.timerText.setText(`Tempo: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);

        if (timeLeft % 10 === 0 && timeLeft > 0) {
          this.cameras.main.shake(100, 1);
        }

        // Inizia il terremoto negli ultimi 30 secondi
        if (timeLeft <= 30) {
          this.earthquakeIntensity += 0.5; // Incrementa l'intensità del terremoto
          this.cameras.main.shake(100, this.earthquakeIntensity / 100); // Effetto di terremoto
        }

        if (timeLeft <= 0) {
            this.start.setVisible(false);
            timerEvent.remove();
            this.haivinto.setVisible(true).setDepth(8);
            this.time.delayedCall(2000, () => {
                completeLevel2 = true;
                this.scene.stop("arcade");
                this.scene.start("GamePlay")
            })
            // Ferma il movimento del player
            this.player.setActive(false).setVisible(false);
            this.worldLayer.setDepth(0); // Nascondi il layer della mappa
            this.collisionLayer.setDepth(0); // Nascondi il layer delle collisioni
            const blackScreen = this.add.image(0, 0, "blackScreen").setOrigin(0).setDepth(3).setDisplaySize(1200, 1200);
          }
      },
    });

    // Aggiungi un tasto che decrementa il timer di 30 secondi ogni clic
    this.input.keyboard.on("keydown-B", () => {
        timeLeft = Math.max(0, timeLeft - 30); // Decrementa il timer di 30 secondi, ma non va sotto 0
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        this.timerText.setText(`Tempo: ${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
    });
    //////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////////////////

   const aereo = this.physics.add.image(200, 200, "aereo");
   aereo.setImmovable(true);
   aereo.body.setSize(30, 20); 
   aereo.setDepth(3);
   
   const aereoTween = this.tweens.add({
       targets: aereo,
       x: {
           getStart: () => aereo.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo, () => {
       aereoTween.stop();
       aereo.setPosition(463, 527);
       aereo.setImmovable(true);
   });

   const aereo1 = this.physics.add.image(200, 200, "aereo1");
   aereo1.setImmovable(true);
   aereo1.body.setSize(30, 20); 
   aereo1.setDepth(3);
   
   const aereoTween1 = this.tweens.add({
       targets: aereo1,
       x: {
           getStart: () => aereo1.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo1.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo1, () => {
       aereoTween1.stop();
       aereo1.setPosition(395, 513);
       aereo1.setImmovable(true);
   });

   const aereo2 = this.physics.add.image(200, 200, "aereo2");
   aereo2.setImmovable(true);
   aereo2.body.setSize(30, 20); 
   aereo2.setDepth(3);
   
   const aereoTween2 = this.tweens.add({
       targets: aereo2,
       x: {
           getStart: () => aereo2.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo2.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo2, () => {
       aereoTween2.stop();
       aereo2.setPosition(390, 625);
       aereo2.setImmovable(true);
   });

   const aereo3 = this.physics.add.image(200, 200, "aereo3");
   aereo3.setImmovable(true);
   aereo3.body.setSize(30, 20); 
   aereo3.setDepth(3);
   
   const aereoTween3 = this.tweens.add({
       targets: aereo3,
       x: {
           getStart: () => aereo3.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo3.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo3, () => {
       aereoTween3.stop();
       aereo3.setPosition(639, 625);
       aereo3.setImmovable(true);
   });

   const aereo4 = this.physics.add.image(200, 200, "aereo4");
   aereo4.setImmovable(true);
   aereo4.body.setSize(30, 20); 
   aereo4.setDepth(3);
   
   const aereoTween4 = this.tweens.add({
       targets: aereo4,
       x: {
           getStart: () => aereo4.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo4.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo4, () => {
       aereoTween4.stop();
       aereo4.setPosition(394, 563);
       aereo4.setImmovable(true);
   });

   const aereo5 = this.physics.add.image(200, 200, "aereo5");
   aereo5.setImmovable(true);
   aereo5.body.setSize(30, 20); 
   aereo5.setDepth(3);
   
   const aereoTween5 = this.tweens.add({
       targets: aereo5,
       x: {
           getStart: () => aereo5.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo5.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo5, () => {
       aereoTween5.stop();
       aereo5.setPosition(635, 563);
       aereo5.setImmovable(true);
   });


   const aereo6 = this.physics.add.image(200, 200, "aereo6");
   aereo6.setImmovable(true);
   aereo6.body.setSize(30, 20); 
   aereo6.setDepth(3);
   
   const aereoTween6 = this.tweens.add({
       targets: aereo6,
       x: {
           getStart: () => aereo6.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo6.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo6, () => {
       aereoTween6.stop();
       aereo6.setPosition(635, 513);
       aereo6.setImmovable(true);
   });

   const aereo7 = this.physics.add.image(200, 200, "aereo7");
   aereo7.setImmovable(true);
   aereo7.body.setSize(30, 20); 
   aereo7.setDepth(3);
   
   const aereoTween7 = this.tweens.add({
       targets: aereo7,
       x: {
           getStart: () => aereo7.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo7.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo7, () => {
       aereoTween7.stop();
       aereo7.setPosition(513, 458);
       aereo7.setImmovable(true);
   });

   const bottonesin = this.physics.add.image(200, 200, "bottonesin");
   bottonesin.setImmovable(true);
   bottonesin.body.setSize(30, 30); 
   bottonesin.setDepth(3);
   
   const aereoTween8 = this.tweens.add({
       targets: bottonesin,
       x: {
           getStart: () => bottonesin.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => bottonesin.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, bottonesin, () => {
       aereoTween8.stop();
       bottonesin.setPosition(473, 760);
       bottonesin.setImmovable(true);
   });

   const bottonesin1 = this.physics.add.image(200, 200, "bottonesin");
   bottonesin1.setImmovable(true);
   bottonesin1.body.setSize(35, 35); 
   bottonesin1.setDepth(3);
   
   const aereoTween9 = this.tweens.add({
       targets: bottonesin1,
       x: {
           getStart: () => bottonesin1.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => bottonesin1.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, bottonesin1, () => {
       aereoTween9.stop();
       bottonesin1.setPosition(580, 760);
       bottonesin1.setImmovable(true);
   });

   const bottoneve = this.physics.add.image(200, 200, "bottoneve");
   bottoneve.setImmovable(true);
   bottoneve.body.setSize(35, 35); 
   bottoneve.setDepth(3);
   
   const aereoTween10 = this.tweens.add({
       targets: bottoneve,
       x: {
           getStart: () => bottoneve.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => bottoneve.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, bottoneve, () => {
       aereoTween10.stop();
       bottoneve.setPosition(528, 807);
       bottoneve.setImmovable(true);
   });

   const palladx = this.physics.add.image(200, 200, "palladx");
   palladx.setImmovable(true);
   palladx.body.setSize(30, 20); 
   palladx.setDepth(3);
   
   const aereoTween11 = this.tweens.add({
       targets: palladx,
       x: {
           getStart: () => palladx.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => palladx.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, palladx, () => {
       aereoTween11.stop();
       palladx.setPosition(560, 580);
       palladx.setImmovable(true);
   });

   const pallasx = this.physics.add.image(200, 200, "pallasx");
   pallasx.setImmovable(true);
   pallasx.body.setSize(30, 20); 
   pallasx.setDepth(3);
   
   const aereoTween12 = this.tweens.add({
       targets: pallasx,
       x: {
           getStart: () => pallasx.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => pallasx.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, pallasx, () => {
       aereoTween12.stop();
       pallasx.setPosition(435, 610);
       pallasx.setImmovable(true);
   });

   const pallinolev = this.physics.add.image(200, 200, "pallinolev");
   pallinolev.setImmovable(true);
   pallinolev.body.setSize(35, 35); 
   pallinolev.setDepth(3);
   
   const aereoTween13 = this.tweens.add({
       targets: pallinolev,
       x: {
           getStart: () => pallinolev.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => pallinolev.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, pallinolev, () => {
       aereoTween13.stop();
       pallinolev.setPosition(672, 700);
       pallinolev.setImmovable(true);
   });

   const pallinosx = this.physics.add.image(200, 200, "pallinosx");
   pallinosx.setImmovable(true);
   pallinosx.body.setSize(30, 20); 
   pallinosx.setDepth(3);
   
   const aereoTween14 = this.tweens.add({
       targets: pallinosx,
       x: {
           getStart: () => pallinosx.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => pallinosx.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, pallinosx, () => {
       aereoTween14.stop();
       pallinosx.setPosition(358, 705);
       pallinosx.setImmovable(true);
   });

   const aereo8 = this.physics.add.image(200, 200, "aereo8");
   aereo8.setImmovable(true);
   aereo8.body.setSize(30, 20); 
   aereo8.setDepth(3);
   
   const aereoTween15 = this.tweens.add({
       targets: aereo8,
       x: {
           getStart: () => aereo8.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => aereo8.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, aereo8, () => {
       aereoTween15.stop();
       aereo8.setPosition(567, 527);
       aereo8.setImmovable(true);
   });

   const scritta = this.physics.add.image(200, 200, "scritta");
   scritta.setImmovable(true);
   scritta.body.setSize(475, 138); 
   scritta.setDepth(2);
   
   const aereoTween16 = this.tweens.add({
       targets: scritta,
       x: {
           getStart: () => scritta.x,
           getEnd: () => Phaser.Math.Between(0, this.map.widthInPixels)
       },
       y: {
           getStart: () => scritta.y,
           getEnd: () => Phaser.Math.Between(0, this.map.heightInPixels)
       },
       duration: 500, 
       yoyo: true,
       repeat: -1,
       ease: "Sine.easeInOut" 
   });
   this.physics.add.collider(this.player, scritta, () => {
       aereoTween16.stop();
       scritta.setPosition(492, 210);
       scritta.setImmovable(true);
   });

   
  }
}