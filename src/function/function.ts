import { categorListData } from '~/data/categor';
import { recipe } from '~/data/recipes';

/**
Собирает ассоциативный массив: 
Категория(Ключ) - [Подкатегории]*/
export function generationCategorSubCategor(recipe: recipe): Map<string, string[]> {
    const arrLink = new Map<string, string[]>();

    recipe.category.map((recipeCategor) => {
        const categorActive = categorListData.find((categor) => categor.link === recipeCategor);
        const subCategorArray = [] as string[];

        recipe.subcategory.map((recipeSubCategor) => {
            const subCategorActive = categorActive?.subCategor.find(
                (subCategor) => subCategor.link === recipeSubCategor,
            );
            if (subCategorActive) subCategorArray.push(subCategorActive.link);
        });

        arrLink.set(recipeCategor, subCategorArray);
    });

    return arrLink;
}
