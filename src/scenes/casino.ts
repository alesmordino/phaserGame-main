import Phaser from "phaser";
import { GameData } from "../GameData";
export let completeLevel1: boolean = false;
export default class casino extends Phaser.Scene {

  constructor() {
    super({ key: "casino" });
  }

  preload(): void {
    this.load.image("casino", "assets/images/tavoloPoker.png");
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#000000');
    this.add.image(this.cameras.main.centerX,this.cameras.main.centerY, "casino").setOrigin(0.5);
  }

  update(): void {
    this.input.keyboard.on('keydown-E', () => {
      completeLevel1= true;
      this.scene.stop('casino');
      this.scene.start('GamePlay');
    });
  }
}
