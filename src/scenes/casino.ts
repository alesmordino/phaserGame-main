import Phaser from "phaser";
import { GameData } from "../GameData";
export let completeLevel1: boolean = false;
export default class casino extends Phaser.Scene {

  constructor() {
    super({ key: "casino" });
  }

  preload(): void {

  }

  create(): void {
  }

  update(): void {
    this.input.keyboard.on('keydown-E', () => {
      completeLevel1= true;
      this.scene.stop('casino');
      this.scene.start('GamePlay');
    });
  }
}
