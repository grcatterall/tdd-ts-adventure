import { Room, Item, Food } from '../index';
import { Character, Enemy } from './index';
import { print as ConsolePrint } from '../../Utils';

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

    move(direction: string, print: ((message: string) => void) | typeof ConsolePrint = ConsolePrint): boolean {

        if (!this.currentRoom) {
            return false;
        }

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom();

            return true;
        } else {
            print("You cannot move in that direction");
            return false;
        }
    }

    printInventory(print: ((message: string) => void) | typeof ConsolePrint = ConsolePrint) {
        if (this.items.length === 0) {
            print(`${this.name} is not carrying anything.`);
        } else {
            print(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                print(`  ${this.items[i].name}`);
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