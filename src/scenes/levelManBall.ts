import Phaser from "phaser";

export let completeLevel: boolean = false;

export default class levelManBall extends Phaser.Scene {
  constructor() {
    super({ key: "levelManBall" });
  }

  preload(): void {

  }

  create(): void {
    this.input.keyboard.on('keydown-E', () => {
      completeLevel = true;
      this.scene.stop('levelManBall');
      this.scene.start('GamePlay');
    });
  }
}

