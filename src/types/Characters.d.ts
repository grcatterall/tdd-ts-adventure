import { ItemType } from "./Item";
export type EnemyType = {
    name: string;
    health: number;
    damage: number;
    items: ItemType[];
    roomId: number;
};
