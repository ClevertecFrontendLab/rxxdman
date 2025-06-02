import { createSlice } from '@reduxjs/toolkit';

import { Recipe } from '~/api/types/recipe';

import { RootState } from '../configure-store';

export interface RecipeState {
    recipe?: Recipe;
}

const initialState: RecipeState = {
    recipe: undefined,
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setRecipe: (state, action) => {
            state.recipe = action.payload;
        },
    },
});

export const { setRecipe } = recipeSlice.actions;
export const selectRecipe = (state: RootState) => state.recipe.recipe;
export default recipeSlice.reducer;
