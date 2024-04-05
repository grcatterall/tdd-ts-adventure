import { EnemyType } from "./Characters";
import { ItemType } from "./Item";

export type WorldData = {
    rooms: RoomData[],
    items: ItemType[],
    enemies?: EnemyType[];
};

export type RoomData = {
    id: number,
    name: string,
    description: string,
    exits: RoomExits,
    items?: ItemType,
    enemy?: EnemyType
};

export type RoomExits = {
    n?: number, 
    e?: number, 
    s?: number, 
    w?: number, 
}