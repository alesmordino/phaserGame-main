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
exports.__esModule = true;
exports.completeLevel = void 0;
var phaser_1 = require("phaser");
exports.completeLevel = false;
var levelManBall = /** @class */ (function (_super) {
    __extends(levelManBall, _super);
    function levelManBall() {
        return _super.call(this, { key: "levelManBall" }) || this;
    }
    levelManBall.prototype.preload = function () {
    };
    levelManBall.prototype.create = function () {
        var _this = this;
        this.input.keyboard.on('keydown-E', function () {
            exports.completeLevel = true;
            _this.scene.stop('levelManBall');
            _this.scene.start('GamePlay');
        });
    };
    return levelManBall;
}(phaser_1["default"].Scene));
exports["default"] = levelManBall;
