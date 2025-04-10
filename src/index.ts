//importiamo la libreria phaser
import "phaser";
//importiamo le nostre scene
import Boot from "./scenes/Boot";
import GamePlay from "./scenes/GamePlay";
//importiamo GameData che contiene i valori globali del gioco
import { GameData } from "./GameData";
import levelManBall from "./scenes/levelManBall";
import casino from "./scenes/casino";
import arcade from "./scenes/arcade";
import finaleLevelManBall from "./scenes/finaleLevelManBall";
import SceltaIAScene from "./scenes/SceltaIAScene";

//il listener per l'evento load della pagina
//questo evento viene lanciato quando la pagina è stata caricata
//e tutti gli elementi della pagina sono disponibili
window.addEventListener("load", () => {


  //creiamo un oggetto di configurazione per il gioco
  //questo oggetto viene passato al costruttore di Phaser.Game
  // e contiene i parametri di configurazione del gioco
  // come il tipo di rendering, le dimensioni del canvas, le scene, ecc.
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    backgroundColor: GameData.globals.bgColor,
    parent: "my-game",
    scale: {
      mode: Phaser.Scale.FIT,
      width: GameData.globals.gameWidth,
      height: GameData.globals.gameHeight,
    },
    

    scene: [
      Boot,
      GamePlay,
      levelManBall,
      casino,
      arcade,
      finaleLevelManBall,
      SceltaIAScene,
    ],
    physics: {
      default: "arcade",  // Sistema di fisica
      arcade: {  
        debug: GameData.globals.debug, 
      },
    },

    input: {
      activePointers: 2,
      keyboard: true,
      gamepad: true,
    },
    render: {
      pixelArt: false,
      antialias: true,
    },
  };
  //inizializziamo il gioco passando la configurazione
  const game = new Phaser.Game(config);
});
