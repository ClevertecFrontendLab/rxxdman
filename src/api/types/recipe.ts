export type StepRecipe = {
    id?: string;
    stepNumber: number;
    description: string;
    image?: string;
};

export type NutritionValue = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type Ingredient = {
    id?: string;
    title: string;
    count: string;
    measureUnit: string;
};

export type Author = {
    login: string;
    firstName: string;
    lastName: string;
    subscribers?: string[];
};

export type Recipe = {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: StepRecipe[];
    nutritionValue: NutritionValue;
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
    authorData: Author;
};

export type MeasureUnit = {
    _id: string;
    name: string;
};
