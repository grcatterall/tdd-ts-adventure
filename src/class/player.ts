import { Room, Item } from './index';
import * as worldData from '../data/world-data.json'

export class Player {
    public name?: string;
    public currentRoom?: Room;
    public items: Item[];

    constructor(name?: string, startingRoom?: Room) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction: string) {

        if (!this.currentRoom) {
            return;
        }

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            // nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName: string) {
        // Picks up an item from the current room into the player's inventory

        // Your code here
    }

    dropItem(itemName: string) {
        // Drops an item the player is holding into their current room

        // Your code here
    }

    eatItem(itemName: string) {
        // Allow the player to eat food items, but not non-food items

        // Your code here
    }

    getItemByName(name: string) {
        // Retrieves an item from a player's inventory by item name

        // Your code here
    }
}