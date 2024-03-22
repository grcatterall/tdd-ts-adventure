import { Item, Room, Food } from './index';
import { WorldData, RoomExits } from '../types/WorldData';


export class World {
    public rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    loadWorld(worldData: WorldData) {

        const roomList = worldData.rooms;
        const itemList = worldData.items;

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

        // Instantiate items using data stored in the itemList variable
            // A non-food item should be instantiated as an instance of the `Item` class
            // A food item should be instantiated as an instance of the `Food` class

        // Your code here
    }
}