import { Room, Item, Food } from '../index';
import { Character, Enemy } from './index';

export class Player extends Character {
    public currentRoom: Room;
    public items: (Item | Food)[];

    constructor(
        name: string, 
        health: number,
        damage: number,
        startingRoom: Room
    ) {
        super(name, health, damage);
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction: string): boolean {

        if (!this.currentRoom) {
            return false;
        }

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom();

            return true;
        } else {
            console.log("You cannot move in that direction");
            return false;
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

    eatItem(itemName: string): boolean {
        const items = this.items;
        let eaten = false;

        if (items) {
            items.map((item, index) => {
                if (item.name === itemName && item instanceof Food) {
                    this.health += item.health;
                    this.items.splice(index, 1);
                    eaten = true;
                }
            });
        }

        return eaten;
    }

    getItemByName(name: string) {
        return this.items.find((item: Item) => item.name === name); 
    }
}