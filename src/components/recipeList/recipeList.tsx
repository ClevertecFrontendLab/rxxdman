import { Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { FC } from 'react';

import { recipelist, recipeListData } from '~/data/recipes';

import { RecipeCard } from '../recipeCard/recipeCard';

type filter = 'popular' | 'categor' | 'date';

interface IRecipeList {
    count: number;
    filter: filter;
}

function filterMass(array: recipelist, filter: filter) {
    if (filter === 'popular')
        array.sort((a, b) => {
            const totalA = a.like + a.save;
            const totalB = b.like + b.save;
            if (totalA < totalB) {
                return 1;
            }
            if (totalA > totalB) {
                return -1;
            }
            return 0; // Если равны
        });

    if (filter === 'date')
        array.sort((a, b) => {
            if (a.date < b.date) {
                return 1; // Сортировка по убыванию
            }
            if (a.date > b.date) {
                return -1; // Сортировка по убыванию
            }
            return 0; // Если равны
        });

    if (filter === 'categor')
        array.sort((a, b) => {
            const totalA = a.like + a.save;
            const totalB = b.like + b.save;
            if (totalA < totalB) {
                return 1; // Сортировка по убыванию
            }
            if (totalA > totalB) {
                return -1; // Сортировка по убыванию
            }
            return 0; // Если равны
        });
}

export const RecipeList: FC<IRecipeList> = ({ count, filter }) => {
    const sortCards = [...recipeListData];

    filterMass(sortCards, filter);

    return (
        <UnorderedList m='0' styleType='none'>
            <Flex
                wrap='wrap'
                gap={{ base: '14px', md: '14px', '2xl': '23px' }}
                rowGap={
                    count > 4
                        ? { base: '14px', md: '14px', '2xl': '14px' }
                        : { base: '10px', md: '14px', '2xl': '22px' }
                }
            >
                {sortCards.slice(0, count).map((recipe) => (
                    <ListItem
                        overflow='hidden'
                        flexBasis={{
                            base: '100%',
                            md: 'calc(50% - 8px)',
                            lg: '100%',
                            '2xl': 'calc(50% - 12px)',
                        }}
                        key={recipe.id}
                    >
                        <RecipeCard direct='row' recipe={recipe} />
                    </ListItem>
                ))}
            </Flex>
        </UnorderedList>
    );
};
