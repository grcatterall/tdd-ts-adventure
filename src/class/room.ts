import { Item, Food, Enemy } from './index';

export class Room {
  id: number;
  name: string;
  description: string;
  exits: { [direction: string]: Room }; // Object with direction as key and Room as value
  items: (Item | Food)[]; // Array of items
  enemy?: Enemy;

  constructor(id: number, name: string, description: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.exits = {};
    this.items = [];
  }

  printRoom() {
    console.clear();
    console.log("");
    console.log(this.name);
    console.log("");
    console.log(this.description);
    console.log("");
    if (this.items.length > 0) {
      console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
    }
    console.log(this.getExitsString());
    console.log("");
    if (this.enemy) {
      console.log(`Enemy - ${this.enemy.name} - ${this.enemy.isDead ? 'dead' : 'alive'}`);
    }
    console.log("");
  }

  getExits(): string[] {
    return Object.keys(this.exits); // Returns an array of string keys from exits object
  }

  getExitsString(): string {
    return `Exits: ${this.getExits().join(", ")}`;
  }

  connectRooms(direction: string, connectingRoom: Room) {
    // Check if the direction and connecting room are valid
    if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
      throw new Error("Error: Invalid room connection");
    }

    this.exits[direction] = connectingRoom;
  }

  getRoomInDirection(direction: string): Room | undefined {
    return this.exits[direction]; // Might be undefined if direction doesn't exist
  }

  getItemByName(name: string): Item | undefined {
    return this.items.find((item: Item) => item.name === name);
  }

  addItems(items: (Item | Food)[]) {
    items.map((item) => {
      this.items.push(item);
    });
  }

  addEnemy(enemy: Enemy) {
    this.enemy = enemy;
  }
}