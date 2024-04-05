import { Room, Item, Food } from '../index';
import { Character } from './index';
import { print as ConsolePrint } from '../../Utils';
export declare class Player extends Character {
    currentRoom: Room;
    items: (Item | Food)[];
    constructor(name: string, health: number, damage: number, startingRoom: Room);
    move(direction: string, print?: ((message: string) => void) | typeof ConsolePrint): boolean;
    printInventory(print?: ((message: string) => void) | typeof ConsolePrint): void;
    takeItem(itemName: string): void;
    dropItem(itemName: string): void;
    eatItem(itemName: string): boolean;
    getItemByName(name: string): Item | Food | undefined;
}
