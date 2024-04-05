import { Item, Room } from "../index";
import { Character } from "./character";
export declare class Enemy extends Character {
    protected heldItems: Item[];
    room: Room;
    constructor(name: string, health: number, damage: number, heldItems: Item[], room: Room);
    dropItems(): void;
    listItems(): string;
}
