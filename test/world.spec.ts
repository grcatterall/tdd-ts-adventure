import { expect } from "chai";

import { World } from "../src/class";
import * as worldData from '../src/data/world-data.json';

describe('World', function () {
      it('loadWorld - A non-food item should be instantiated as an instance of the `Item` class', function() {
        const world = new World();
        world.loadWorld(worldData);

        const room = world.rooms[1];
        const roomItems = room.items;
        expect(roomItems[0].name).to.equal('rock')
      })

      it('loadWorld - A food item should be instantiated as an instance of the `Food` class', function() {
        const world = new World();
        world.loadWorld(worldData);

        const room = world.rooms[2];
        const roomItems = room.items;
        expect(roomItems[0].name).to.equal('sandwich')
      });
});