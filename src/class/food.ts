import { Item } from './index';

export class Food extends Item {
    public health: number;

    constructor(
        name: string,
        description: string,
        health: number
    ) {
        super(name, description, true);
        this.health = health;
    }
};