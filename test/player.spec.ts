import { expect } from "chai";

import { Player, Room, Item, Food, World } from '../src/class';
import * as worldData from '../src/data/world-data.json';

describe('Player', () => {
    it("player.getItemByName - Retrieves an item from a player's inventory by item name", function () {
        const item = new Item("rock", "just a simple rock");
        const room = new Room(1, "Test Room", "A test room");
        const player = new Player("player", room);

        player.items.push(item);
        expect(player.items.length).to.equal(1);

        expect(player.getItemByName("rock")).to.equal(item);

    });



      it("player.takeItem - Picks up an item from the current room into the player's inventory", function () {
        const item = new Item("rock", "just a simple rock");
        const room = new Room(1, "Test Room", "A test room");
        const player = new Player("player", room);

        room.items.push(item);
        expect(room.items.length).to.equal(1);
        expect(player.items.length).to.equal(0);

        player.takeItem("rock");

        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);

        expect(player.getItemByName("rock")).to.equal(item);

      });

      it("player.takeItem - When an item is taken, it is removed from the current room", function () {
        const item = new Item("sword", "just a sword");
        const room = new Room(2, "Room 2", "A second test room");
        const player = new Player("player2", room);

        room.items.push(item);
        expect(room.items.length).to.equal(1);
        expect(player.items.length).to.equal(0);

        player.takeItem("sword");

        expect(room.items.length).to.equal(0);

      });



      it("player.dropItem - Drops an item the player is holding into their current room", function () {
        const item = new Item("rock", "just a simple rock");
        const room = new Room(1, "Test Room", "A test room");
        const player = new Player("player", room);

        player.items.push(item);
        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);

        player.dropItem("rock");

        expect(room.items.length).to.equal(1);
        expect(player.items.length).to.equal(0);

        expect(room.getItemByName("rock")).to.equal(item);

      });

      it("player.dropItem - When an item is dropped, the player no longer has it", function () {
        const item = new Item("sword", "just a simple sword");
        const room = new Room(2, "Test Room 2", "A second test room");
        const player = new Player("player2", room);

        player.items.push(item);
        expect(room.items.length).to.equal(0);
        expect(player.items.length).to.equal(1);

        player.dropItem("sword");

        expect(player.items.length).to.equal(0);

      });
})