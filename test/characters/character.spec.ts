import { expect } from "chai";

import { Character } from '../../src/class';

describe('Character', () => {
    it('Character should have health, damage and name', () => {
        const character = new Character('character', 10, 20);

        expect(character.name).to.equal('character');
        expect(character.damage).to.equal(20);
        expect(character.health).to.equal(10);
        expect(character.isDead).to.equal(false);
    });

    it('Character should loose health when character.takeDamage is called', () => {
        const character = new Character('character', 10, 20);
        character.takeDamage(5);

        expect(character.health).to.equal(5);
    });

    it('Character isDead property should be set to true if health goes below 1', () => {
        const character = new Character('character', 10, 20);
        character.takeDamage(10);

        expect(character.isDead).to.equal(true);
    });

    it('Character can set target if it is in combat', () => {
        const character = new Character('character', 10, 20);
        const character2 = new Character('character2', 10, 20);

        character.inCombat = true;

        const targetSet = character.setTarget(character2);

        expect(targetSet).to.be.true;
    });

    it('Character can only attack if target is set', () => {
        const character = new Character('character', 10, 5);
        const character2 = new Character('character2', 10, 20);

        character.inCombat = true;

        character.setTarget(character2);

        character.attack();

        expect(character2.health).to.equal(5);

        character.setTarget(null);
        character.attack();

        expect(character.inCombat).to.equal(false);
    });
});