export interface ingredient {
    original: string;
    id: number;
}

export class Recipe {
    id: number | undefined;
    title: string = '';
    image: string = '';
    summary: string = '';
    instructions: string = '';
    extendedIngredients: ingredient[] = [];

    constructor(initializer?: any) {
        if(!initializer) return;
        if(initializer.id) this.id = initializer.id;
        if(initializer.title) this.title = initializer.title;
        if(initializer.image) this.image = initializer.image;
        if(initializer.summary) this.summary = initializer.summary;
        if(initializer.instructions) this.instructions = this.instructions;
        if(initializer.extendedIngredients) this.extendedIngredients = initializer.extendedIngredients;
    }
}