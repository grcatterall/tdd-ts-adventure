import { print as ConsolePrint } from "../../Utils";
export declare class Character {
    damage: number;
    name: string;
    isDead: boolean;
    health: number;
    inCombat: boolean;
    protected target: Character | null;
    constructor(name: string, health: number, damage: number);
    takeDamage(damageAmount: number): void;
    attack(print?: ((message: string) => void) | typeof ConsolePrint): void;
    setTarget(target: Character | null): boolean;
    getTarget(): Character | null;
    die(): void;
}
