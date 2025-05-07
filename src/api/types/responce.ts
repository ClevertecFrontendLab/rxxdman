import { SubCategories } from './category';
import { Recipe } from './recipe';

type CategoryResponce = {
    _id: string;
    title: string;
    category: string;
    icon?: string;
    description?: string;
    subCategories?: SubCategories;
    rootCategoryId?: string;
};

export type categoriesResponse = Array<CategoryResponce>;

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipeResponse = {
    data: Recipe[];
    meta: Meta;
};

export interface IGetRecipesAllParams {
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: string;
    sortOrder: string;
}

export type GetRecipesAllParams = Partial<IGetRecipesAllParams>;

export interface IGetRecipesCategorParams {
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
}

export type GetRecipesCategorParams = Partial<IGetRecipesCategorParams>;

export type GetRecipesCategorFetch = {
    idCategor: string;
    params: GetRecipesCategorParams;
};
