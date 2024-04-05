import { print as ConsolePrint } from "../../Utils";

export class Character {
    public damage: number;
    public name: string;
    public isDead: boolean = false;
    public health: number;
    public inCombat: boolean = false;
    protected target: Character | null = null;

    constructor(
        name: string,
        health: number,
        damage: number
    ) {
        this.health = health;
        this.damage = damage;
        this.name = name;
    }

    takeDamage(damageAmount: number) {
        this.health -= damageAmount;

        if (this.health <= 0) {
            this.die();
        }
    }

    attack(print: ((message: string) => void) | typeof ConsolePrint = ConsolePrint) {
        if (this.target) {
            this.target.takeDamage(this.damage);
        } else {
            print('You have no one to attack');
            this.inCombat = false;
        }
    }

    setTarget(target: Character | null): boolean {
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

    getTarget(): Character | null {
        return this.target;
    }

    die() {
        this.inCombat = false;
        this.target = null;
        this.isDead = true;
    }
}