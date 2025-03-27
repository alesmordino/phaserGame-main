"use strict";
exports.__esModule = true;
//importiamo la libreria phaser
require("phaser");
//importiamo le nostre scene
var Boot_1 = require("./scenes/Boot");
var GamePlay_1 = require("./scenes/GamePlay");
//importiamo GameData che contiene i valori globali del gioco
var GameData_1 = require("./GameData");
var levelManBall_1 = require("./scenes/levelManBall");
var casino_1 = require("./scenes/casino");
var arcade_1 = require("./scenes/arcade");
var finaleLevelManBall_1 = require("./scenes/finaleLevelManBall");
//il listener per l'evento load della pagina
//questo evento viene lanciato quando la pagina è stata caricata
//e tutti gli elementi della pagina sono disponibili
window.addEventListener("load", function () {
    //creiamo un oggetto di configurazione per il gioco
    //questo oggetto viene passato al costruttore di Phaser.Game
    // e contiene i parametri di configurazione del gioco
    // come il tipo di rendering, le dimensioni del canvas, le scene, ecc.
    var config = {
        type: Phaser.WEBGL,
        backgroundColor: GameData_1.GameData.globals.bgColor,
        parent: "my-game",
        scale: {
            mode: Phaser.Scale.FIT,
            width: GameData_1.GameData.globals.gameWidth,
            height: GameData_1.GameData.globals.gameHeight
        },
        scene: [
            Boot_1["default"],
            GamePlay_1["default"],
            levelManBall_1["default"],
            casino_1["default"],
            arcade_1["default"],
            finaleLevelManBall_1["default"],
        ],
        physics: {
            "default": "arcade",
            arcade: {
                debug: GameData_1.GameData.globals.debug
            }
        },
        input: {
            activePointers: 2,
            keyboard: true,
            gamepad: true
        },
        render: {
            pixelArt: false,
            antialias: true
        }
    };
    //inizializziamo il gioco passando la configurazione
    var game = new Phaser.Game(config);
});
