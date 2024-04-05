"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
const character_1 = require("./character");
class Enemy extends character_1.Character {
    constructor(name, health, damage, heldItems, room) {
        super(name, health, damage);
        this.heldItems = heldItems;
        this.room = room;
    }
    dropItems() {
        this.room.addItems(this.heldItems);
        this.heldItems = [];
    }
    listItems() {
        const itemNames = this.heldItems.map((item) => {
            return item.name;
        });
        return itemNames.join(', ');
    }
}
exports.Enemy = Enemy;
//# sourceMappingURL=enemy.js.map