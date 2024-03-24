import { Item } from './index';

export class Food extends Item {

    constructor(
        name: string,
        description: string
    ) {
        super(name, description, true);
    }
};