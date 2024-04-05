import { Item, Room } from './index';
import { WorldData } from '../types/WorldData';
import { ItemType } from '../types';
export declare class World {
    rooms: Room[];
    constructor();
    loadWorld(worldData: WorldData): void;
    itemMapper(items: ItemType[]): Item[];
}
