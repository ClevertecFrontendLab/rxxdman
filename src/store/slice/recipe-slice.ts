import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../configure-store';

export interface RecipeState {
    recipeId?: string;
}

const initialState: RecipeState = {
    recipeId: undefined,
};

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        setRecipeId: (state, action) => {
            state.recipeId = action.payload;
        },
    },
});

export const { setRecipeId } = recipeSlice.actions;
export const selectRecipeId = (state: RootState) => state.recipe.recipeId;
export default recipeSlice.reducer;
