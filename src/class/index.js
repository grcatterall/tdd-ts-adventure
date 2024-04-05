"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = exports.Food = exports.Room = exports.Item = void 0;
var item_1 = require("./item");
Object.defineProperty(exports, "Item", { enumerable: true, get: function () { return item_1.Item; } });
var room_1 = require("./room");
Object.defineProperty(exports, "Room", { enumerable: true, get: function () { return room_1.Room; } });
var food_1 = require("./food");
Object.defineProperty(exports, "Food", { enumerable: true, get: function () { return food_1.Food; } });
var world_1 = require("./world");
Object.defineProperty(exports, "World", { enumerable: true, get: function () { return world_1.World; } });
__exportStar(require("./characters"), exports);
//# sourceMappingURL=index.js.map