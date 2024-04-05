import { Item, Food, Enemy } from './index';
import { print as ConsolePrint, clear as ConsoleClear } from '../Utils';
export declare class Room {
    id: number;
    name: string;
    description: string;
    exits: {
        [direction: string]: Room;
    };
    items: (Item | Food)[];
    enemy?: Enemy;
    constructor(id: number, name: string, description: string);
    printRoom(print?: ((message: string) => void) | typeof ConsolePrint, clear?: (() => void) | typeof ConsoleClear): void;
    getExits(): string[];
    getExitsString(): string;
    connectRooms(direction: string, connectingRoom: Room): void;
    getRoomInDirection(direction: string): Room | undefined;
    getItemByName(name: string): Item | undefined;
    addItems(items: (Item | Food)[]): void;
    addEnemy(enemy: Enemy): void;
}
