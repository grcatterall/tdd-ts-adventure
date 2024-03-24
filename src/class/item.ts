export class Item {
    public name: string;
    public description: string;
    public isFood?: boolean = false;

    constructor(
        name: string,
        description: string,
        isFood?: boolean
    ) {
        this.name = name;
        this.description = description;
        this.isFood = isFood;
    }
}