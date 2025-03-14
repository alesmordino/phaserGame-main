export interface IPlayer {
  update(): void;
  setVelocity(x: number, y: number): void;
  setFrame(frame: number): void;
  anims: {
    play(key: string, ignoreIfPlaying?: boolean): Phaser.Animations.Animation | Phaser.GameObjects.GameObject;
  };
  body: {
    velocity: {
      x: number;
      y: number;
    };
  };
}