import Phaser from "phaser";
import { GameData } from "../GameData";
export let completeLevel2: boolean = false;
export default class arcade extends Phaser.Scene {

  constructor() {
    super({ key: "arcade" });
  }

  preload(): void {

  }

  create(): void {
  }

  update(): void {
    this.input.keyboard.on('keydown-E', () => {
      completeLevel2= true;
      this.scene.stop('arcade');
      this.scene.start('GamePlay');
    });
  }
}
