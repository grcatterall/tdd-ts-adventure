import { expect } from "chai";

import { Food, Room, Item, Character, Enemy } from '../../src/class';

describe('Enemy', () => {
    it('Enemy should have health, damage, heldItems, room and name', () => {
        const item = new Item("rock", "just a simple rock");
        const items = [item];
        const room = new Room(1, "Test Room", "A test room");
        const enemy = new Enemy('enemy', 10, 5, items, room);

        expect(enemy.name).to.equal('enemy');
        expect(enemy.damage).to.equal(5);
        expect(enemy.health).to.equal(10);
        expect(enemy.isDead).to.equal(false);
    });

    it('Room should gain items when enemy.dropItems is called', () => {
        const item = new Item("rock", "just a simple rock");
        const food = new Food('bread', 'bit of bread', 2);
        const items = [item, food];
        const room = new Room(1, "Test Room", "A test room");
        const enemy = new Enemy('enemy', 10, 5, items, room);

        enemy.dropItems();

        expect(enemy.room.items.length).to.equal(2);
        expect(enemy.room.items[0].name).to.equal('rock');
        expect(enemy.room.items[1].description).to.equal('bit of bread');
        expect(enemy.room.items[1] instanceof Food).to.be.true;
    });

    it("Enemy should be instance of character", () => {
        const room = new Room(2, "Test Room 2", "A second test room");
        const item = new Item("rock", "just a simple rock");
        const items = [item];
        const enemy = new Enemy('enemy', 10, 5, items, room);
        const character = new Character('character', 10, 5);
    
    
        expect(enemy instanceof Character).to.be.true;
        expect(enemy instanceof Enemy).to.be.true;
    
        expect(character instanceof Character).to.be.true;
        expect(character instanceof Enemy).to.be.false;
      });
});