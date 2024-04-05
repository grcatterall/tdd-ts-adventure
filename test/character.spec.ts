import { expect } from "chai";

import { Character } from '../src/class';

describe('Character', () => {
    it('Character should have health, damage and name', () => {
        const character = new Character(10, 20, 'character');

        expect(character.name).to.equal('character');
        expect(character.damage).to.equal(20);
        expect(character.health).to.equal(10);
        expect(character.isDead).to.equal(false);
    });

    it('Character should loose health when character.takeDamage is called', () => {
        const character = new Character(10, 20, 'character');
        character.takeDamage(5);

        expect(character.health).to.equal(5);
    });

    it('Character isDead property should be set to true if health goes below 1', () => {
        const character = new Character(10, 20, 'character');
        character.takeDamage(10);

        expect(character.isDead).to.equal(true);
    });
});