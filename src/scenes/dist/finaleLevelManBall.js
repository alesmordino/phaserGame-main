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
var phaser_1 = require("phaser");
var arcade = /** @class */ (function (_super) {
    __extends(arcade, _super);
    function arcade() {
        return _super.call(this, { key: "finaleLevelManBall" }) || this;
    }
    arcade.prototype.preload = function () {
    };
    arcade.prototype.create = function () {
    };
    arcade.prototype.update = function () {
    };
    return arcade;
}(phaser_1["default"].Scene));
exports["default"] = arcade;
