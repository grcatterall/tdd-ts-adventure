"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const Utils_1 = require("../Utils");
class Room {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.exits = {};
        this.items = [];
    }
    printRoom(print = Utils_1.print, clear = Utils_1.clear) {
        clear();
        print("");
        print(this.name);
        print("");
        print(this.description);
        print("");
        if (this.items.length > 0) {
            print(`Items: ${this.items.map(item => item.name).join(", ")}`);
        }
        print(this.getExitsString());
        print("");
        if (this.enemy) {
            print(`Enemy: ${this.enemy.name} - ${this.enemy.isDead ? 'dead' : 'alive'}`);
        }
        print("");
    }
    getExits() {
        return Object.keys(this.exits); // Returns an array of string keys from exits object
    }
    getExitsString() {
        return `Exits: ${this.getExits().join(", ")}`;
    }
    connectRooms(direction, connectingRoom) {
        // Check if the direction and connecting room are valid
        if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
            throw new Error("Error: Invalid room connection");
        }
        this.exits[direction] = connectingRoom;
    }
    getRoomInDirection(direction) {
        return this.exits[direction]; // Might be undefined if direction doesn't exist
    }
    getItemByName(name) {
        return this.items.find((item) => item.name === name);
    }
    addItems(items) {
        items.map((item) => {
            this.items.push(item);
        });
    }
    addEnemy(enemy) {
        this.enemy = enemy;
    }
}
exports.Room = Room;
//# sourceMappingURL=room.js.map