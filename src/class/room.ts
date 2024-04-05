import { Item, Food, Enemy } from './index';
import { print as ConsolePrint, clear as ConsoleClear } from '../Utils';

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

  printRoom(
    print: ((message: string) => void) | typeof ConsolePrint = ConsolePrint,
    clear: (() => void) | typeof ConsoleClear = ConsoleClear
    ) {
    clear();
    print("");
    print(this.name);
    print("");
    print(this.description);
    print("");
    if (this.items.length > 0) {
      print(`Items: ${this.items.map(item => item.name).join(", ")}`);
    }
    print(this.getExitsString());
    print("");
    if (this.enemy) {
      print(`Enemy - ${this.enemy.name} - ${this.enemy.isDead ? 'dead' : 'alive'}`);
    }
    print("");
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