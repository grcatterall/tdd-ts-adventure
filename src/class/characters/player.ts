import { Room, Item } from '../index';
import { Character } from './index';

export class Player extends Character {
    public currentRoom?: Room;
    public items: Item[];

    constructor(
        name: string, 
        health: number,
        damage: number,
        startingRoom?: Room
    ) {
        super(health, damage, name);
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction: string) {

        if (!this.currentRoom) {
            return;
        }

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

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