import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

declare global {
  interface Window {
    currentEmotion: string;
    mostFrequentEmotion: string;
  }
}

const videoElement: HTMLVideoElement = document.createElement("video");
videoElement.autoplay = true;

let emotionHistory: string[] = [];
let emotionCount: number = 0;
let stopTracking: boolean = false;

export async function setupCamera(): Promise<void> {
  const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } });
  videoElement.srcObject = stream;
  return new Promise((resolve) => {
    videoElement.onloadedmetadata = () => resolve();
  });
}

export async function startFaceMesh(): Promise<void> {
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
    window.mostFrequentEmotion = mostFrequentEmotion;
    console.log(`Face tracking terminato. Emozione più rilevata: ${mostFrequentEmotion}`);
    return;
  }

  window.currentEmotion = emotion;
}