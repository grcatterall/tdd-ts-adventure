import { ItemType } from "./Item";

export type WorldData = {
    rooms: RoomData[],
    items: ItemType[]
};

export type RoomData = {
    id: number,
    name: string,
    description: string,
    exits: RoomExits
};

export type RoomExits = {
    n?: number, 
    e?: number, 
    s?: number, 
    w?: number, 
}