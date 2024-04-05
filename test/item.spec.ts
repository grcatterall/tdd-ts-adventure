import { expect } from "chai";

import { Player, Room, Item, Food, World } from '../src/class';
import * as worldData from '../src/data/world-data.json';



describe ('Item', function () {

  it('Item Class: Item should have name and description attributes', function () {
    const item = new Item("rock", "just a simple rock");

    expect(item.name).to.equal("rock");
    expect(item.description).to.equal("just a simple rock");

  });

  it('room.getItemByName - Retrieves an item from a room by item name', function () {
    const item = new Item("rock", "just a simple rock");
    const room = new Room(1, "Test Room", "A test room");

    room.items.push(item);
    expect(room.items.length).to.equal(1);

    expect(room.getItemByName("rock")).to.equal(item);

  });


});

describe ('Food', function () {

  it('Food should have name and description attributes', function () {
    const food = new Food("sandwich", "a delicious sandwich");

    expect(food.name).to.equal("sandwich");
    expect(food.description).to.equal("a delicious sandwich");

  });


  it('A food should be an instance of Item and Food', function () {
    const food = new Food("sandwich", "a delicious sandwich");
    const item = new Item("rock", "just a simple rock");

    expect(food instanceof Item).to.be.true;
    expect(food instanceof Food).to.be.true;

    expect(item instanceof Item).to.be.true;
    expect(item instanceof Food).to.be.false;
  });


  it('A food item can be eaten by a player', function () {
    const food = new Food("sandwich", "a delicious sandwich");
    const room = new Room(1, "Test Room", "A test room");
    const player = new Player("player", 10, 5, room);

    player.items.push(food);

    expect(player.items.length).to.equal(1);

    player.eatItem("sandwich");

    expect(player.items.length).to.equal(0);

  });


  it('An item cannot be eaten by a player if not a food item', function () {
    const item = new Item("rock", "just a simple rock");
    const room = new Room(1, "Test Room", "A test room");
    const player = new Player("player", 10, 5,  room);

    player.items.push(item);

    expect(player.items.length).to.equal(1);

    player.eatItem("rock");

    expect(player.items.length).to.equal(1);
  });

});