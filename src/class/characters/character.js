"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const Utils_1 = require("../../Utils");
class Character {
    constructor(name, health, damage) {
        this.isDead = false;
        this.inCombat = false;
        this.target = null;
        this.health = health;
        this.damage = damage;
        this.name = name;
    }
    takeDamage(damageAmount) {
        this.health -= damageAmount;
        if (this.health <= 0) {
            this.die();
        }
    }
    attack(print = Utils_1.print) {
        if (this.target) {
            this.target.takeDamage(this.damage);
        }
        else {
            print('You have no one to attack');
            this.inCombat = false;
        }
    }
    setTarget(target) {
        if (!target) {
            this.target = target;
            this.inCombat = false;
            return true;
        }
        if (this.inCombat) {
            this.target = target;
            return true;
        }
        return false;
    }
    getTarget() {
        return this.target;
    }
    die() {
        this.inCombat = false;
        this.target = null;
        this.isDead = true;
    }
}
exports.Character = Character;
//# sourceMappingURL=character.js.map