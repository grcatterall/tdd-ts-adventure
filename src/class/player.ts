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

            nextRoom.printRoom();
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
        const items = this.currentRoom?.items;

        if (items) {
            items.map((item, index) => {
                if (item.name === itemName) {
                    this.items.push(item);
                    this.currentRoom?.items.splice(index, 1);
                }
            });
        }
    }

    dropItem(itemName: string) {
        const items = this.items;

        if (items) {
            items.map((item, index) => {
                if (item.name === itemName) {
                    this.items.splice(index, 1);
                    this.currentRoom?.items.push(item);
                }
            });
        }
    }

    eatItem(itemName: string) {
        const items = this.items;

        if (items) {
            items.map((item, index) => {
                if (item.name === itemName && item.isFood) {
                    this.items.splice(index, 1);
                }
            });
        }
    }

    getItemByName(name: string) {
        return this.items.find((item: Item) => item.name === name); 
    }
}