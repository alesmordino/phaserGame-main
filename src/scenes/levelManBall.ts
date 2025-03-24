import Phaser from "phaser";
import { setupCamera, startFaceMesh } from "./FaceTracking";
import { GameData } from "../GameData";
export let completeLevel: boolean = false;
export let emotionLevelManBall: string = "neutro";

declare global {
  interface Window {
    mostFrequentEmotion1: string;
    currentEmotion1: string;
  }
}

export default class levelManBall extends Phaser.Scene {
  private lastEmotion1: string = "neutro";
  constructor() {
    super({ key: "levelManBall" });
  }

  preload(): void {

  }

  create(): void {
    this.input.keyboard.on('keydown-E', () => {
      completeLevel= true;
      this.scene.stop('levelManBall');
      this.scene.start('GamePlay');
    });
    setupCamera().then(startFaceMesh);
  }

    update(): void {
      if (window.currentEmotion && window.currentEmotion !== this.lastEmotion1) {
        this.lastEmotion1 = window.currentEmotion;
        console.log("Emozione aggiornata:", this.lastEmotion1);
      }
  
      if (window.mostFrequentEmotion && window.mostFrequentEmotion !== emotionLevelManBall) {
        emotionLevelManBall = window.mostFrequentEmotion;
        console.log("Emozione più rilevata:", emotionLevelManBall

        );
      }
    }
}

