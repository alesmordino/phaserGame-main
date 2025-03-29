export let completeLevel1: boolean = false;
export default class Casino extends Phaser.Scene 
{

  private carte: string[] = ["3", "7", "43", "2", "40", "53"]; // ID delle carte disponibili
  private carteDisponibili: string[]; // Carte disponibili per l'IA
  private iaEvent: Phaser.Time.TimerEvent; // Evento temporizzato per l'IA
  private iaCardCount: number = 0
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private worldLayer: Phaser.Tilemaps.TilemapLayer;
  private maxIaCards: number = 3; // Numero massimo di carte che l'IA può scegliere
  private score: number = 0;
  private haivinto: Phaser.GameObjects.Image;
  private completo: Phaser.GameObjects.Image;
  private haiperso: Phaser.GameObjects.Image;

  constructor() 
  {
    super({ key: "casino" });
  }

  preload() 
  {
    this.load.tilemapTiledJSON("casino1", "assets/map/casino.json");
    this.load.image("casinoTileset", "assets/map/casino.png");
    this.load.image("coperta", "assets/images/coperta.png");
    this.load.image("haivinto", "assets/images/vinto.png");
    this.load.image("haiperso", "assets/images/haiperso.png");
    this.load.image("completo", "assets/images/completo.png");
    this.load.image("3", "assets/images/carta3.png");
    this.load.image("78", "assets/images/78.png");
    this.load.image("0", "assets/images/carta0.png");
    this.load.image("2", "assets/images/carta2.png");
    this.load.image("7", "assets/images/carta7.png");
    this.load.image("9", "assets/images/carta9.png");
    this.load.image("40", "assets/images/carta40.png");
    this.load.image("43", "assets/images/carta43.png");
    this.load.image("53", "assets/images/carta53.png");
    this.load.image("58", "assets/images/carta58.png");
    this.load.image("61", "assets/images/carta61.png");
    this.load.image("91", "assets/images/carta91.png");
    this.load.image("walk", "assets/images/walk.png");
    this.load.image("robot", "assets/images/robot (2).png");
    this.load.image("retgia", "assets/images/rettangologiallo.png");
    this.load.image("rettbia", "assets/images/rettangolobianco.png");
    this.load.image("pallagia", "assets/images/giallo.png");
    this.load.image("pallabia", "assets/images/bianco.png");

    this.load.image("r0", "assets/images/r0.png");
    this.load.image("r2", "assets/images/r2.png");
    this.load.image("r3", "assets/images/r3.png");
    this.load.image("r7", "assets/images/r7.png");
    this.load.image("r9", "assets/images/r9.png");
    this.load.image("r40", "assets/images/r40.png");
    this.load.image("r43", "assets/images/r43.png");
    this.load.image("r53", "assets/images/r53.png");
    this.load.image("r58", "assets/images/r58.png");
    this.load.image("r61", "assets/images/r61.png");
    this.load.image("r70", "assets/images/r70.png");
    this.load.image("r91", "assets/images/r91.png");

  }

  create() 
  {
    this.carteDisponibili = [this.carte[0], this.carte[1], this.carte[2], this.carte[3], this.carte[4], this.carte[5]]; // Inizializza le carte disponibili per l'IA
    // Crea la mappa
    this.map = this.make.tilemap({ key: "casino1" });
    this.tileset = this.map.addTilesetImage("casino", "casinoTileset");

    this.worldLayer = this.map.createLayer("world", this.tileset, 0, 0);
    this.worldLayer.setDepth(1);

    const centerX = this.map.widthInPixels / 2;
    const centerY = this.map.heightInPixels / 2;
    this.cameras.main.setScroll(centerX - this.cameras.main.width / 2, centerY - this.cameras.main.height / 2);
    
  
    this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        const randomColor = Phaser.Display.Color.RandomRGB();
        this.cameras.main.setBackgroundColor(randomColor.rgba);
      },
    });

    this.haivinto = this.add.image(400, 380, "haivinto").setDepth(6).setVisible(false);
    this.completo = this.add.image(400, 250, "completo").setDepth(6).setVisible(false);
    this.haiperso = this.add.image(400, 250, "haiperso").setDepth(6).setVisible(false);


    // Aggiungi la coperta
    const coperta12=this.add.image(120, 228, "coperta").setDepth(2).setDisplaySize(500,571).setAngle(90);
    const coperta1=this.add.image(120, 263, "coperta").setDepth(2).setDisplaySize(500,571).setAngle(90);
    const coperta2=this.add.image(120, 298, "coperta").setDepth(2).setDisplaySize(500,571).setAngle(90);
    const coperta3=this.add.image(180, 228, "coperta").setDepth(2).setDisplaySize(500,571).setAngle(90);
    const coperta4=this.add.image(180, 263, "coperta").setDepth(2).setDisplaySize(500,571).setAngle(90);
    const coperta5=this.add.image(180, 298, "coperta").setDepth(2).setDisplaySize(500,571).setAngle(90);
    const coperta6 = this.add.image(700, 228, "coperta").setDepth(2).setDisplaySize(500, 571).setAngle(90).setInteractive();
    const coperta7 = this.add.image(700, 263, "coperta").setDepth(2).setDisplaySize(500, 571).setAngle(90).setInteractive();
    const coperta8 = this.add.image(700, 298, "coperta").setDepth(2).setDisplaySize(500, 571).setAngle(90).setInteractive();
    const coperta9 = this.add.image(640, 228, "coperta").setDepth(2).setDisplaySize(500, 571).setAngle(90).setInteractive();
    const coperta10 = this.add.image(640, 263, "coperta").setDepth(2).setDisplaySize(500, 571).setAngle(90).setInteractive();
    const coperta11 = this.add.image(640, 298, "coperta").setDepth(2).setDisplaySize(500, 571).setAngle(90).setInteractive();

    const carteCliccabili = [
      { coperta: coperta6, cardKey: "91", x: 700, y: 228 },
      { coperta: coperta7, cardKey: "61", x: 700, y: 263 },
      { coperta: coperta8, cardKey: "58", x: 700, y: 298 },
      { coperta: coperta9, cardKey: "78", x: 640, y: 228 },
      { coperta: coperta10, cardKey: "9", x: 640, y: 263 },
      { coperta: coperta11, cardKey: "0", x: 640, y: 298 },
    ];

    carteCliccabili.forEach(({ coperta, cardKey, x, y }) => {
      coperta.on("pointerdown", () => {
      coperta.setVisible(false);
      const image = this.add.image(x, y, cardKey).setDepth(3).setDisplaySize(500, 571);

      this.tweens.add({
        targets: image,
        x: 430,
        y: 200,
        angle: 360, // Ruota di 360 gradi
        scaleX: 4, // Diventa grande
        scaleY: 4, // Diventa grande
        duration: 2000,
        ease: "Power2",
        onComplete: () => {
        image.destroy(); // Rimuovi l'immagine dopo l'animazione
        },
      });
      });
    });

    const vsText = this.add.text(390, 75, "Vs", {
      font: "24px Stencil",
      color: "#000000",
      fontStyle: "bold",
    });
    vsText.setDepth(3);
    vsText.setVisible(true); // Nascondi il testo inizialmente

    this.add.image(455, 80, "walk",18).setDepth(2);
    this.add.image(333, 95, "robot").setDepth(2);
    /*this.add.image(250, 95, "retgia").setDepth(2);
    this.add.image(250, 95, "retgia").setDepth(2);*/

    
    this.add.image(250, 95, "rettbia").setDepth(2);
    this.add.image(550, 95, "rettbia").setDepth(2);

    

    //this.add.image(250, 85, "pallagia").setDepth(2);
    const pallagiaImages = [
      this.add.image(257, 78, "pallagia").setDepth(2),
      this.add.image(243, 78, "pallagia").setDepth(2),
      this.add.image(284, 78, "pallagia").setDepth(2),
      this.add.image(270, 78, "pallagia").setDepth(2),
      this.add.image(297, 78, "pallagia").setDepth(2),
      this.add.image(231, 78, "pallagia").setDepth(2),
      this.add.image(218, 78, "pallagia").setDepth(2),
      this.add.image(206, 78, "pallagia").setDepth(2),
      this.add.image(297, 111, "pallagia").setDepth(2),
      this.add.image(284, 111, "pallagia").setDepth(2),
      this.add.image(270, 111, "pallagia").setDepth(2),
      this.add.image(257, 111, "pallagia").setDepth(2),
      this.add.image(243, 111, "pallagia").setDepth(2),
      this.add.image(231, 111, "pallagia").setDepth(2),
      this.add.image(218, 111, "pallagia").setDepth(2),
      this.add.image(206, 111, "pallagia").setDepth(2),
      this.add.image(297, 100, "pallagia").setDepth(2),
      this.add.image(206, 100, "pallagia").setDepth(2),
      this.add.image(297, 90, "pallagia").setDepth(2),
      this.add.image(206, 90, "pallagia").setDepth(2),

      this.add.image(505, 78, "pallagia").setDepth(2),
      this.add.image(519, 78, "pallagia").setDepth(2),
      this.add.image(530, 78, "pallagia").setDepth(2),
      this.add.image(545, 78, "pallagia").setDepth(2),
      this.add.image(557, 78, "pallagia").setDepth(2),
      this.add.image(570, 78, "pallagia").setDepth(2),
      this.add.image(584, 78, "pallagia").setDepth(2),
      this.add.image(596, 78, "pallagia").setDepth(2),
      this.add.image(505, 111, "pallagia").setDepth(2),
      this.add.image(519, 111, "pallagia").setDepth(2),
      this.add.image(530, 111, "pallagia").setDepth(2),
      this.add.image(545, 111, "pallagia").setDepth(2),
      this.add.image(557, 111, "pallagia").setDepth(2),
      this.add.image(570, 111, "pallagia").setDepth(2),
      this.add.image(584, 111, "pallagia").setDepth(2),
      this.add.image(596, 111, "pallagia").setDepth(2),
      this.add.image(505, 100, "pallagia").setDepth(2),
      this.add.image(596, 100, "pallagia").setDepth(2),
      this.add.image(505, 90, "pallagia").setDepth(2),
      this.add.image(596, 90, "pallagia").setDepth(2),
    ];

    pallagiaImages.forEach((image, index) => {
      const blinkRate = 1000 + index * 100; // Diverse velocità di lampeggio
      this.time.addEvent({
        delay: blinkRate,
        loop: true,
        callback: () => {
          image.setVisible(!image.visible);
        },
      });
    });


    this.cameras.main.setZoom(1.3);

    const rImages = [
      { image: this.add.image(402, 263, "r0").setDepth(2).setVisible(false), value: 0 },
      { image: this.add.image(402, 267, "r2").setDepth(2).setVisible(false), value: 2 },
      { image: this.add.image(402, 267, "r3").setDepth(2).setVisible(false), value: 3 },
      { image: this.add.image(402, 267, "r40").setDepth(2).setVisible(false), value: 40 },
      { image: this.add.image(402, 267, "r43").setDepth(2).setVisible(false), value: 43 },
      { image: this.add.image(402, 267, "r53").setDepth(2).setVisible(false), value: 53 },
      { image: this.add.image(402, 267, "r58").setDepth(2).setVisible(false), value: 58 },
      { image: this.add.image(402, 267, "r61").setDepth(2).setVisible(false), value: 61 },
      { image: this.add.image(402, 267, "r7").setDepth(2).setVisible(false), value: 7 },
      { image: this.add.image(402, 267, "r70").setDepth(2).setVisible(false), value: 70 },
      { image: this.add.image(402, 267, "r9").setDepth(2).setVisible(false), value: 9 },
      { image: this.add.image(402, 267, "r91").setDepth(2).setVisible(false), value: 91 },
    ];

    let clickCount = 0;
const maxClicks = 3;

carteCliccabili.forEach(({ coperta }) => {
  coperta.on("pointerdown", () => {
    if (clickCount >= maxClicks) {
      console.log("Hai raggiunto il numero massimo di clic.");
      this.input.enabled = false;
      return; // Esci dalla funzione se hai raggiunto il massimo
    }

    clickCount++;
    coperta.setVisible(false);

    // Mostra un'immagine casuale dopo 2 secondi
    this.time.delayedCall(2000, () => {
      const randomIndex = Phaser.Math.Between(0, rImages.length - 1);
      const randomImage = rImages[randomIndex];
      randomImage.image.setVisible(true);

      this.time.delayedCall(5000, () => {
        randomImage.image.setVisible(false);
        
        // Controlla se è l'ultimo click e mostra i punteggi
        if (clickCount >= maxClicks) {
          const userScore = Phaser.Math.Between(3001, 5000);
          const iaScore = Phaser.Math.Between(0, 3000);
      
         // ... (codice precedente rimane uguale fino alla parte dei punteggi)

      console.log("Punteggio Utente:", userScore);
      console.log("Punteggio IA:", iaScore);
      
      // Mostra i punteggi sullo schermo
      const userScoreText = this.add.text(525, 82, `${userScore}`, {
        font: "24px Arial",
        color: "#ffffff",
        fontStyle: "bold",
      }).setDepth(3);
  
      const iaScoreText = this.add.text(225, 82, `${iaScore}`, {
        font: "24px Arial",
        color: "#ffffff",
        fontStyle: "bold",
      }).setDepth(3);


      // Determina il risultato e mostra le scritte
      const resultText = this.add.text(400, 250, "", {
        font: "64px Arial",
        color: "#ffffff",
        fontStyle: "bold",
      }).setDepth(3).setOrigin(0.5); // Centra il testo
       
       

      this.time.delayedCall(2000, () => {
        resultText.setVisible(false); // Nascondi il testo "Hai vinto!" o "Hai perso!"
      });

      // Dopo 2 secondi mostra "Complete" e poi torna al GamePlay
      this.time.delayedCall(7000, () => {
        this.cameras.main.setBackgroundColor("#000000"); // Imposta lo sfondo nero
        this.time.removeAllEvents(); // Rimuove tutti gli eventi temporizzati, incluso il cambio RGB
        this.haivinto.setVisible(true).setDepth(6); // Mostra l'immagine "Hai vinto!"

        this.time.delayedCall(2000, () => {
          // Ripristina lo stato del gioco
          clickCount = 0;
          this.input.enabled = true;
          
          // Nascondi tutte le immagini casuali
          rImages.forEach(img => img.image.setVisible(false));
          
          // Ripristina le copertine
          carteCliccabili.forEach(({ coperta }) => coperta.setVisible(true));
          
          // Oppure, se vuoi ricaricare completamente la scena:
          completeLevel1 = true;
          this.scene.start('GamePlay');
        });
      });
      // ... (il resto del codice rimane uguale)
        }
      });

      this.time.delayedCall(5000, () => {
        this.iaEvent = this.time.addEvent({
          callback: () => {
            this.iaChooseCard(coperta12, coperta1, coperta2, coperta3, coperta4, coperta5);
          },
        });

        this.time.delayedCall(2000, () => {
          const randomIndex = Phaser.Math.Between(0, rImages.length - 1);
          const randomImage = rImages[randomIndex];
          console.log("Selected random image value:", randomImage.value);
          randomImage.image.setVisible(true);

          this.time.delayedCall(5000, () => {
            randomImage.image.setVisible(false);
            
            // Puoi aggiungere un altro controllo qui se necessario
          });
        });
      });
    });
  });
});
  }


    iaChooseCard(
      coperta12: Phaser.GameObjects.Image,
      coperta1: Phaser.GameObjects.Image,
      coperta2: Phaser.GameObjects.Image,
      coperta3: Phaser.GameObjects.Image,
      coperta4: Phaser.GameObjects.Image,
      coperta5: Phaser.GameObjects.Image
    ) {
      if (this.iaCardCount >= this.maxIaCards || this.carteDisponibili.length === 0) {
        this.iaEvent.remove();
        console.log("IA ha terminato le scelte.");
        return;
      }
  
      const randomIndex = Phaser.Math.Between(0, this.carteDisponibili.length - 1);
      const chosenCard = this.carteDisponibili[randomIndex];
       // Log the chosen card value for debuggin
      console.log(chosenCard);
      this.carteDisponibili.splice(randomIndex, 1);
  
        this.iaCardCount++;

      switch (chosenCard) {
        case "3":
          this.animateCard(coperta12, "3", 120, 228, chosenCard);
          break;
        case "7":
          this.animateCard(coperta1, "7", 120, 263, chosenCard);
          break;
        case "43":
          this.animateCard(coperta2, "43", 120, 298, chosenCard);
          break;
        case "2":
          this.animateCard(coperta3, "2", 180, 228, chosenCard);
          break;
        case "40":
          this.animateCard(coperta4, "40", 180, 263, chosenCard);
          break;
        case "53":
          this.animateCard(coperta5, "53", 230, 298, chosenCard);
          break;
      }
    }
  
    updateScore() {
      this.score ;
      console.log("Current Score:",);
    }
    animateCard(coperta: Phaser.GameObjects.Image, cardKey: string, x: number, y: number, chosenCard: string) {
      coperta.setVisible(false);
      const image = this.add.image(x, y, cardKey).setDepth(3).setDisplaySize(500, 571);
    
      switch (cardKey) {
        case "3":
          // Animazione per la carta "33"
          this.tweens.add({
            targets: image,
            x: 430,
            y: 200,
            angle: 360, // Ruota di 360 gradi
            scaleX: 4, // Diventa grande
            scaleY: 4, // Diventa grande
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
              this.time.delayedCall(2000, () => {
              // Aggiungi animazione di ritorno con rotazione
              this.tweens.add({
                targets: image,
                x: x,
                y: y,
                angle: 720, // Ruota di altri 360 gradi tornando indietro
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                image.destroy();
                const chosenCardValue = parseInt(chosenCard, 10);
                console.log("Chosen card value:", chosenCardValue);
                const a =3;
                const sum = chosenCardValue * a;
                console.log(`Sum of chosen card value (${chosenCardValue}) and random image value (${a}): ${sum}`);
                }
              });
              });
            }
            });
          break;
    
        case "7":
          // Animazione per la carta "7"
          this.tweens.add({
            targets: image,
            x: 430,
            y: 200,
            angle: 360, // Ruota di 360 gradi
            scaleX: 4, // Diventa grande
            scaleY: 4, // Diventa grande
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
              this.time.delayedCall(2000, () => {
              // Aggiungi animazione di ritorno con rotazione
              this.tweens.add({
                targets: image,
                x: x,
                y: y,
                angle: 720, // Ruota di altri 360 gradi tornando indietro
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                image.destroy();
                const chosenCardValue = parseInt(chosenCard, 10);
                console.log("Chosen card value:", chosenCardValue);
                const a =7;
                const sum = chosenCardValue * a;
                console.log(`Sum of chosen card value (${chosenCardValue}) and random image value (${a}): ${sum}`);
                }
              });
              });
            }
            });
          break;
    
        case "43":
          // Animazione per la carta "43"
          this.tweens.add({
            targets: image,
            x: 430,
            y: 200,
            angle: 360, // Ruota di 360 gradi
            scaleX: 4, // Diventa grande
            scaleY: 4, // Diventa grande
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
              this.time.delayedCall(2000, () => {
              // Aggiungi animazione di ritorno con rotazione
              this.tweens.add({
                targets: image,
                x: x,
                y: y,
                angle: 720, // Ruota di altri 360 gradi tornando indietro
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                image.destroy();
                const chosenCardValue = parseInt(chosenCard, 10);
                console.log("Chosen card value:", chosenCardValue);
                const a =43;
                const sum = chosenCardValue * a;
                console.log(`Sum of chosen card value (${chosenCardValue}) and random image value (${a}): ${sum}`);
            
                }
              });
              });
            }
            });
          break;
    
        case "2":
          // Animazione per la carta "2"
          this.tweens.add({
            targets: image,
            x: 430,
            y: 200,
            angle: 360, // Ruota di 360 gradi
            scaleX: 4, // Diventa grande
            scaleY: 4, // Diventa grande
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
              this.time.delayedCall(2000, () => {
              // Aggiungi animazione di ritorno con rotazione
              this.tweens.add({
                targets: image,
                x: x,
                y: y,
                angle: 720, // Ruota di altri 360 gradi tornando indietro
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                image.destroy();
                const chosenCardValue = parseInt(chosenCard, 10);
                console.log("Chosen card value:", chosenCardValue);
                const a =2;
                const sum = chosenCardValue + a;
                console.log(`Sum of chosen card value (${chosenCardValue}) and random image value (${a}): ${sum}`);
            
                }
              });
              });
            }
            });
          break;
    
        case "40":
          // Animazione per la carta "40"
          this.tweens.add({
            targets: image,
            x: 430,
            y: 200,
            angle: 360, // Ruota di 360 gradi
            scaleX: 4, // Diventa grande
            scaleY: 4, // Diventa grande
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
              this.time.delayedCall(2000, () => {
              // Aggiungi animazione di ritorno con rotazione
              this.tweens.add({
                targets: image,
                x: x,
                y: y,
                angle: 720, // Ruota di altri 360 gradi tornando indietro
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                image.destroy();
                const chosenCardValue = parseInt(chosenCard, 10);
                console.log("Chosen card value:", chosenCardValue);
                const a =40;
                const sum = chosenCardValue + a;
                console.log(`Sum of chosen card value (${chosenCardValue}) and random image value (${a}): ${sum}`);
            
                }
              });
              });
            }
            });
          break;
    
        case "53":
          // Animazione per la carta "53"
          this.tweens.add({
            targets: image,
            x: 430,
            y: 200,
            angle: 360, // Ruota di 360 gradi
            scaleX: 4, // Diventa grande
            scaleY: 4, // Diventa grande
            duration: 2000,
            ease: 'Power2',
            onComplete: () => {
              this.time.delayedCall(2000, () => {
              // Aggiungi animazione di ritorno con rotazione
              this.tweens.add({
                targets: image,
                x: x,
                y: y,
                angle: 720, // Ruota di altri 360 gradi tornando indietro
                scaleX: 1,
                scaleY: 1,
                duration: 2000,
                ease: 'Power2',
                onComplete: () => {
                image.destroy();
                const chosenCardValue = parseInt(chosenCard, 10);
                console.log("Chosen card value:", chosenCardValue);
                const a =53;
                const sum = chosenCardValue + a;
                console.log(`Sum of chosen card value (${chosenCardValue}) and random image value (${a}): ${sum}`);
            
                }
              });
              });
            }
            });
          break;
      }
    }
  }