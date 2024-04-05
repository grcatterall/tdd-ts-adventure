export class Character {
    public damage: number;
    public name: string;
    public isDead: boolean = false;
    public health: number;

    constructor(
        health: number,
        damage: number,
        name: string
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

    attack(target: Character) {
        target.takeDamage(this.damage);
    }

    die() {
        this.isDead = true;
    }
}