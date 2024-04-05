import { Item, Room } from "../index";
import { Character } from "./character";

export class Enemy extends Character {
    protected heldItems: Item[];

    public room: Room;

    constructor(
        name: string, 
        health: number,
        damage: number,
        heldItems: Item[],
        room: Room
    ) {
        super(name, health, damage);
        this.heldItems = heldItems;
        this.room = room;
    }

    dropItems() {
        this.room.addItems(this.heldItems);
        this.heldItems = [];
    }

    listItems(): string {
        const itemNames = this.heldItems.map((item) => {
            return item.name;
        })
        return itemNames.join(', ');
    }
}