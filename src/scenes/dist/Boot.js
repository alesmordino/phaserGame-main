"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var phaser_1 = require("phaser");
var face_mesh_1 = require("@mediapipe/face_mesh");
var camera_utils_1 = require("@mediapipe/camera_utils");
// Crea un elemento video, ma non lo aggiunge al DOM
var videoElement = document.createElement("video");
videoElement.autoplay = true;
var emotionHistory = [];
var emotionCount = 0;
var stopTracking = false;
function setupCamera() {
    return __awaiter(this, void 0, Promise, function () {
        var stream;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })];
                case 1:
                    stream = _a.sent();
                    videoElement.srcObject = stream;
                    return [2 /*return*/, new Promise(function (resolve) {
                            videoElement.onloadedmetadata = function () { return resolve(); };
                        })];
            }
        });
    });
}
function startFaceMesh() {
    return __awaiter(this, void 0, Promise, function () {
        var faceMesh, camera;
        var _this = this;
        return __generator(this, function (_a) {
            if (stopTracking)
                return [2 /*return*/];
            faceMesh = new face_mesh_1.FaceMesh({
                locateFile: function (file) { return "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/" + file; }
            });
            faceMesh.setOptions({
                maxNumFaces: 1,
                refineLandmarks: true,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.7
            });
            faceMesh.onResults(onFaceDetected);
            camera = new camera_utils_1.Camera(videoElement, {
                onFrame: function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!!stopTracking) return [3 /*break*/, 2];
                                return [4 /*yield*/, faceMesh.send({ image: videoElement })];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); },
                width: 1280,
                height: 720
            });
            camera.start();
            return [2 /*return*/];
        });
    });
}
function onFaceDetected(results) {
    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0 || stopTracking)
        return;
    var keypoints = results.multiFaceLandmarks[0];
    var leftMouth = keypoints[61];
    var rightMouth = keypoints[291];
    var topMouth = keypoints[13];
    var bottomMouth = keypoints[14];
    var mouthWidth = Math.abs(rightMouth.x - leftMouth.x);
    var mouthHeight = Math.abs(topMouth.y - bottomMouth.y);
    var emotion = "neutro";
    if (mouthHeight / mouthWidth > 0.3) {
        emotion = "felice";
    }
    else if (mouthHeight / mouthWidth < 0.1) {
        emotion = "triste";
    }
    emotionHistory.push(emotion);
    emotionCount++;
    if (emotionCount >= 100) {
        stopTracking = true;
        var mostFrequentEmotion = emotionHistory.sort(function (a, b) {
            return emotionHistory.filter(function (v) { return v === a; }).length - emotionHistory.filter(function (v) { return v === b; }).length;
        }).pop();
        console.log("Face tracking terminato. Emozione pi\u00F9 rilevata: " + mostFrequentEmotion);
        return;
    }
    window.currentEmotion = emotion;
}
setupCamera().then(startFaceMesh);
var Boot = /** @class */ (function (_super) {
    __extends(Boot, _super);
    function Boot() {
        var _this = _super.call(this, { key: "Boot" }) || this;
        _this.lastEmotion = "neutro";
        return _this;
    }
    Boot.prototype.preload = function () {
        this.cameras.main.setBackgroundColor("#ffffff");
        this.load.image("logo", "assets/images/logoS.png");
        this.load.spritesheet("animation", "assets/images/spritesheet_1.png", { frameWidth: 1040, frameHeight: 1040 });
        this.load.spritesheet("animation1", "assets/images/spritesheet_2.png", { frameWidth: 1040, frameHeight: 1040 });
        this.load.spritesheet("bg1", "assets/images/bg1.png", { frameWidth: 2048, frameHeight: 2048 });
    };
    Boot.prototype.create = function () {
        var _this = this;
        this._logo = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "logo").setScale(0.3);
        this.sprite = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "animation").setVisible(false).setOrigin(0.5, 0.5);
        this.bg = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, "bg1").setVisible(false).setScale(0.55);
        this.tweens.add({
            targets: this._logo,
            scale: 1.5,
            duration: 3000,
            ease: "Sine.easeInOut"
        });
        this.anims.create({
            key: "playAnimation",
            frames: this.anims.generateFrameNumbers("animation", { start: 0, end: 8 }),
            frameRate: 2,
            repeat: 0
        });
        this.anims.create({
            key: "playAnimation1",
            frames: this.anims.generateFrameNumbers("animation1", { start: 0, end: 8 }),
            frameRate: 2,
            repeat: 0
        });
        this.anims.create({
            key: "playBG",
            frames: this.anims.generateFrameNumbers("bg1", { start: 0, end: 4 }),
            frameRate: 3,
            repeat: 0
        });
        this.time.delayedCall(3500, function () {
            _this._logo.setVisible(false);
            _this.sprite.setVisible(true);
            _this.sprite.anims.play("playAnimation");
            _this.sprite.once("animationcomplete", function () {
                _this.sprite.anims.play("playAnimation1");
                _this.sprite.once("animationcomplete", function () {
                    console.log("Animazione completata");
                    _this.bg.setVisible(true);
                    _this.bg.anims.play("playBG");
                });
            });
            _this.time.delayedCall(5000, function () {
                _this.scene.start("GamePlay");
            });
        });
    };
    Boot.prototype.update = function () {
        if (window.currentEmotion && window.currentEmotion !== this.lastEmotion) {
            this.lastEmotion = window.currentEmotion;
            console.log("Emozione aggiornata:", this.lastEmotion);
        }
    };
    return Boot;
}(phaser_1["default"].Scene));
exports["default"] = Boot;
