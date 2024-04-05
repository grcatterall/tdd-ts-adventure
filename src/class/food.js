"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Food = void 0;
const index_1 = require("./index");
class Food extends index_1.Item {
    constructor(name, description, health) {
        super(name, description, true);
        this.health = health;
    }
}
exports.Food = Food;
;
//# sourceMappingURL=food.js.map