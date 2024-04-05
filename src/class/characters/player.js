"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const index_1 = require("../index");
const index_2 = require("./index");
const Utils_1 = require("../../Utils");
class Player extends index_2.Character {
    constructor(name, health, damage, startingRoom) {
        super(name, health, damage);
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }
    move(direction, print = Utils_1.print) {
        if (!this.currentRoom) {
            return false;
        }
        const nextRoom = this.currentRoom.getRoomInDirection(direction);
        if (nextRoom) {
            this.currentRoom = nextRoom;
            nextRoom.printRoom();
            return true;
        }
        else {
            print("You cannot move in that direction");
            return false;
        }
    }
    printInventory(print = Utils_1.print) {
        if (this.items.length === 0) {
            print(`${this.name} is not carrying anything.`);
        }
        else {
            print(`${this.name} is carrying:`);
            for (let i = 0; i < this.items.length; i++) {
                print(`  ${this.items[i].name}`);
            }
        }
    }
    takeItem(itemName) {
        var _a;
        const items = (_a = this.currentRoom) === null || _a === void 0 ? void 0 : _a.items;
        if (items) {
            items.map((item, index) => {
                var _a;
                if (item.name === itemName) {
                    this.items.push(item);
                    (_a = this.currentRoom) === null || _a === void 0 ? void 0 : _a.items.splice(index, 1);
                }
            });
        }
    }
    dropItem(itemName) {
        const items = this.items;
        if (items) {
            items.map((item, index) => {
                var _a;
                if (item.name === itemName) {
                    this.items.splice(index, 1);
                    (_a = this.currentRoom) === null || _a === void 0 ? void 0 : _a.items.push(item);
                }
            });
        }
    }
    eatItem(itemName) {
        const items = this.items;
        let eaten = false;
        if (items) {
            items.map((item, index) => {
                if (item.name === itemName && item instanceof index_1.Food) {
                    this.health += item.health;
                    this.items.splice(index, 1);
                    eaten = true;
                }
            });
        }
        return eaten;
    }
    getItemByName(name) {
        return this.items.find((item) => item.name === name);
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map