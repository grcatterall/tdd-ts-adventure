import { Item, Room, Food, Enemy } from './index';
import { WorldData, RoomExits } from '../types/WorldData';
import { ItemType } from '../types';


export class World {
    public rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    loadWorld(worldData: WorldData) {

        const roomList = worldData.rooms;
        const itemList = worldData.items;
        const enemyList = worldData.enemies;

        // Instantiate new room objects
        // Get name, id and description from room data

        roomList.map((room) => {
            const roomData = room;
            const newRoom = new Room(roomData.id, roomData.name, roomData.description);

            this.rooms[roomData.id] = newRoom;
        });
        
        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        roomList.map((room) => {
            const roomID = room.id;
            const roomConnections = room.exits;

            for (const direction in roomConnections) {
                const connectedRoomID = roomConnections[direction as keyof RoomExits];

                if (connectedRoomID) {
                    const roomToConnect = this.rooms[connectedRoomID];
                    this.rooms[roomID].connectRooms(direction, roomToConnect);
                }
            }
        });

        itemList.map((item) => {
            if (item.room) {
                this.rooms[item.room].addItems(this.itemMapper([item]));
            }
        });

        if (enemyList) {
            enemyList.map((enemy) => {
                const enemyCharacter = new Enemy(
                    enemy.name,
                    enemy.health,
                    enemy.damage,
                    this.itemMapper(enemy.items),
                    this.rooms[enemy.roomId]
                );

                this.rooms[enemy.roomId].addEnemy(enemyCharacter);
            });
        }
    }

    itemMapper(items: ItemType[]): Item[] {
        const mappedItems = items.map((item) => {
            let newItem;
            if (item.isFood) {
              newItem = new Food(item.name, item.description, item.health || 0);
            } else {
              newItem = new Item(item.name, item.description);
            }

            return newItem;
        });

        return mappedItems;
    } 
}