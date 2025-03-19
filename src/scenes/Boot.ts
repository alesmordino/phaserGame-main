import Phaser from "phaser";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";
import { GameData } from "../GameData";

declare global {
  interface Window {
    currentEmotion?: string;
  }
}

const videoElement: HTMLVideoElement = document.createElement("video");
videoElement.autoplay = true;

let emotionHistory: string[] = [];
let emotionCount: number = 0;
let stopTracking: boolean = false;

async function setupCamera(): Promise<void> {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
  videoElement.srcObject = stream;
  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => resolve();
  });
}

async function startFaceMesh(): Promise<void> {
  if (stopTracking) return;

  const faceMesh = new FaceMesh({
    locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  });

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  });

  faceMesh.onResults(onFaceDetected);

  const camera = new Camera(videoElement, {
    onFrame: async () => {
      if (!stopTracking) {
        await faceMesh.send({ image: videoElement });
      }
    },
    width: 1280,
    height: 720,
  });

  camera.start();
}

function onFaceDetected(results: any): void {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0 || stopTracking) return;

  const keypoints = results.multiFaceLandmarks[0];
  const leftMouth = keypoints[61];
  const rightMouth = keypoints[291];
  const topMouth = keypoints[13];
  const bottomMouth = keypoints[14];

  const mouthWidth = Math.abs(rightMouth.x - leftMouth.x);
  const mouthHeight = Math.abs(topMouth.y - bottomMouth.y);

  let emotion: string = "neutro";
  if (mouthHeight / mouthWidth > 0.3) {
    emotion = "felice";
  } else if (mouthHeight / mouthWidth < 0.1) {
    emotion = "triste";
  }

  emotionHistory.push(emotion);
  emotionCount++;

  if (emotionCount >= 100) {
    stopTracking = true;
    const mostFrequentEmotion = emotionHistory.sort((a, b) =>
      emotionHistory.filter(v => v === a).length - emotionHistory.filter(v => v === b).length
    ).pop();
    console.log(`Face tracking terminato. Emozione più rilevata: ${mostFrequentEmotion}`);
    return;
  }

  window.currentEmotion = emotion;
}

setupCamera().then(startFaceMesh);

export default class Boot extends Phaser.Scene {
  private lastEmotion: string = "neutro";
  private _logo: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private sprite: Phaser.GameObjects.Sprite;
  private plane: Phaser.GameObjects.Image;
  private plane1: Phaser.GameObjects.Image;
  private plane2: Phaser.GameObjects.Image;
  private pallaGrande: Phaser.GameObjects.Image;
  private fish: Phaser.GameObjects.Image;
  private gioca: Phaser.GameObjects.Image;
  private crediti: Phaser.GameObjects.Image;

  constructor() {
    super({ key: "Boot" });
  }

  preload(): void {
    this.cameras.main.setBackgroundColor("#ffffff");
    this.load.image("logo", "assets/images/logoS.png");
    this.load.spritesheet("animation", "assets/images/spritesheet_1.png", { frameWidth: 1024, frameHeight: 1024 });
    this.load.spritesheet("animation1", "assets/images/spritesheet_2.png", { frameWidth: 1024, frameHeight: 1024 });
    this.load.spritesheet("bg1", "assets/images/bg1.png", { frameWidth: 2048, frameHeight: 2048 });
    this.load.image('plane', 'assets/images/plane.png');
    this.load.image('plane1', 'assets/images/plane1.png');
    this.load.image('plane2', 'assets/images/plane2.png');
    this.load.image('pallagrande', 'assets/images/pallagrande.png');
    this.load.image('fish', 'assets/images/fish.png');
    this.load.image('gioca', 'assets/images/gioca.png');
    this.load.image('crediti', 'assets/images/crediti.png');
  }

  create(): void {
    this._logo = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.3);
    this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "animation").setVisible(false).setOrigin(0.5, 0.5);
    this.bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1").setVisible(false).setScale(0.55);
    
    this.plane = this.add.image(0, this.cameras.main.height, 'plane').setScale(0.45).setDepth(1).setVisible(false);
    this.plane1 = this.add.image(this.cameras.main.width / 1.5, -this.cameras.main.height, 'plane1').setScale(0.45).setDepth(1).setVisible(false);
    this.plane2 = this.add.image(-this.cameras.main.width, this.cameras.main.height / 2 - 150, 'plane2').setScale(0.45).setDepth(1).setVisible(false);
    
    this.pallaGrande = this.add.image(this.cameras.main.width - 200, this.cameras.main.height - 300, 'pallagrande').setScale(1.4).setDepth(1).setVisible(false);
    this.fish = this.add.image(150, this.cameras.main.height - 150, 'fish').setScale(1.2).setDepth(2).setAlpha(1).setVisible(false);

    this.tweens.add({
        targets: this._logo,
        scale: 1.5,
        duration: 3000,
        ease: "Sine.easeInOut",
    });

    this.anims.create({
        key: "playAnimation",
        frames: this.anims.generateFrameNumbers("animation", { start: 0, end: 8 }) ,
        frameRate: 2,
        repeat: 0,
    });

    this.anims.create({
        key: "playAnimation1",
        frames: this.anims.generateFrameNumbers("animation1", { start: 0, end: 8 }),
        frameRate: 2,
        repeat: 0,
    });

    this.anims.create({
        key: "playBG",
        frames: this.anims.generateFrameNumbers("bg1", { start: 0, end: 4 }),
        frameRate: 3,
        repeat: 0,
    });

    this.time.delayedCall(3500, () => {
        this._logo.setVisible(false);
        this.sprite.setVisible(true);
        this.sprite.anims.play("playAnimation");

        this.sprite.once("animationcomplete", () => {
            this.sprite.anims.play("playAnimation1");

            this.sprite.once("animationcomplete", () => {
                console.log("Animazione completata");
                this.bg.setVisible(true);
                this.bg.anims.play("playBG");

                this.bg.once("animationcomplete", () => {
                    this.bg.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
                    this.pallaGrande.setVisible(true);
                    this.tweens.add({
                        targets: this.pallaGrande,
                        y: this.cameras.main.height - 400,
                        duration: 1000,
                        ease: 'Bounce.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });

                    this.fish.setVisible(true);
                    this.tweens.add({
                        targets: this.fish,
                        alpha: 0.2,
                        duration: 1000,
                        ease: 'Linear',
                        yoyo: true,
                        repeat: -1,
                        onYoyo: () => {
                            this.fish.setVisible(false);
                        },
                        onRepeat: () => {
                            this.fish.setVisible(true);
                        }
                    });

                    this.gioca = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 100, 'gioca').setScale(0.5).setDepth(2).setVisible(true);
                    this.crediti = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2 + 200, 'crediti').setScale(0.5).setDepth(2).setVisible(true);
                      
                    this.startPlaneAnimations();
                });
            });
        });
    });
  }

  startPlaneAnimations(): void {
    this.plane.setPosition(0, this.cameras.main.height).setVisible(true);
    this.tweens.add({
        targets: this.plane,
        x: this.cameras.main.width,
        y: 0,
        duration: 4000,
        ease: 'Linear',
        onComplete: () => {
            this.plane.setVisible(false);
            this.plane1.setPosition(this.cameras.main.width / 1.5, -this.cameras.main.height).setVisible(true);
            this.tweens.add({
                targets: this.plane1,
                y: this.cameras.main.height + this.plane1.height,
                duration: 4000,
                ease: 'Linear',
                onComplete: () => {
                    this.plane1.setVisible(false); 
                    this.plane2.setPosition(-this.cameras.main.width, this.cameras.main.height / 2 - 150).setVisible(true);
                    this.tweens.add({
                        targets: this.plane2,
                        x: this.cameras.main.width + this.plane2.width,
                        duration: 4000,
                        ease: 'Linear',
                        onComplete: () => {
                            this.plane2.setVisible(false); 
                            this.time.delayedCall(1000, () => {
                                this.startPlaneAnimations();
                            });
                        }
                    });
                }
            });
        }
    });
}


  update(): void {
    if (window.currentEmotion && window.currentEmotion !== this.lastEmotion) {
      this.lastEmotion = window.currentEmotion;
      console.log("Emozione aggiornata:", this.lastEmotion);
    }
    
  }
  
}