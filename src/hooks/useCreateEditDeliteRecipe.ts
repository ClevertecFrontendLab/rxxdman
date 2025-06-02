import { useState } from 'react';

import { SubCategories } from '~/api/types/category';
import { Ingredient, StepRecipe } from '~/api/types/recipe';

export const useCreateEditDeliteRecipe = () => {
    const [mainImageRecipe, setMainImageRecipe] = useState<string>('');
    const [selectedTagsRecipe, setSelectedTags] = useState<SubCategories>([]);
    const [ingredientsRecipe, setIngregientsRecipe] = useState<Ingredient[]>([]);
    const [stepsRecipe, setStepsRecipe] = useState<StepRecipe[]>([]);

    // const [searchParams, setSearchParams] = useSearchParams();

    // useEffect(() => {
    //     const handleBeforeUnload = (event) => {
    //         // Ваш код для обработки события покидания страницы
    //         event.preventDefault();
    //         event.returnValue = 'Are you sure you want to leave?';
    //         console.log('Срабатывает перед покиданием страницы');
    //         return 'Вы действительно хотите покинуть страницу?';
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (recipe && searchParams.get('mode') === 'edit') {
    //         setSelectedTags(recipe.categoriesIds)
    //         setNameRecipe(recipe.title)
    //         setDescriptionRecipe(recipe.description)
    //         setPortionsRecipe(recipe.portions)
    //         setIngregientsRecipe(recipe.ingredients)
    //         setStepsRecipe(recipe.steps)
    //     }
    //     console.log(nameRecipe)

    // }, [nameRecipe, recipe, searchParams])

    return {
        selectedTagsRecipe,
        ingredientsRecipe,
        stepsRecipe,
        mainImageRecipe,
        setSelectedTags,
        setIngregientsRecipe,
        setStepsRecipe,
        setMainImageRecipe,
    };
};
