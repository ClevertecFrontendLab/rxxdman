import { Box, Button, Center, Flex, Heading, ListItem, UnorderedList } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { allergensListOptions } from '~/data/allergens';
import { recipeList, recipeListMock } from '~/data/recipes';
import { useParamsGlobal } from '~/data/useParams';
import { users } from '~/data/user';

import { RecipeCard } from '../recipeCard/recipeCard';

type filter = 'popular' | 'categor' | 'date';

interface IRecipeList {
    count: number;
    filter: filter;
    setCountSearchRecipes?: React.Dispatch<React.SetStateAction<number>>;
}

function filterMass(array: recipeList, filter: filter, category?: string, subcategor?: string) {
    if (filter === 'popular') {
        array.sort((a, b) => {
            const totalA = a.likes + a.bookmarks;
            const totalB = b.likes + b.bookmarks;
            return totalB - totalA;
        });
    }

    if (filter === 'date') {
        array.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    if (filter === 'categor') {
        array = array.filter((recipe) => recipe.category.includes(category || ''));
        array = array.filter((recipe) => recipe.subcategory.includes(subcategor || ''));
    }
    return array;
}

export const RecipeList: FC<IRecipeList> = ({ count, filter, setCountSearchRecipes }) => {
    const { category, subcategor } = useParams();
    const recipeList = [...recipeListMock];
    const filterList = filterMass(recipeList, filter, category, subcategor);

    const [VisibleList, setVisibleList] = useState([...filterList]);

    useEffect(() => {
        setVisibleList(filterList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, subcategor]);

    const { searchParam } = useParamsGlobal();
    const [recipeSearch, setRecipeSearch] = useState(searchParam.get('title') || '');
    const [allergenSearch, setAllergenSearch] = useState(searchParam.get('allergens') || '');
    const [categorsSearch, setCategorsSearch] = useState(searchParam.get('categors') || '');
    const [authorSearch, setAuthorSearch] = useState(searchParam.get('authorsId') || '');
    const [meatSearch, setMeatSearch] = useState(searchParam.get('meat') || '');
    const [garnishSearch, setGarnishSearch] = useState(searchParam.get('garnish') || '');

    useEffect(() => {
        setRecipeSearch(searchParam.get('title') || '');
        setAllergenSearch(searchParam.get('allergens') || '');
        setCategorsSearch(searchParam.get('categors') || '');
        setAuthorSearch(searchParam.get('authorsId') || '');
        setMeatSearch(searchParam.get('meat') || '');
        setGarnishSearch(searchParam.get('garnish') || '');
    }, [searchParam]);

    useEffect(() => {
        if (
            recipeSearch.length > 0 ||
            allergenSearch.length > 0 ||
            categorsSearch.length > 0 ||
            authorSearch.length > 0 ||
            meatSearch.length > 0 ||
            garnishSearch.length > 0
        ) {
            const allergens = allergenSearch.split('-').map((a) => a.toLowerCase());
            const categors = categorsSearch.split('--').filter(Boolean);
            const authors = authorSearch.split('--').filter(Boolean);
            const meats = meatSearch.split('--').filter(Boolean);
            const garnishs = garnishSearch.split('--').filter(Boolean);

            //Рецепты выбранных авторов
            const recipeIdsByAuthors = new Set();
            authors.forEach((authorId) => {
                const author = users.find((a) => a.id.toLowerCase() === authorId);
                if (author && author.recipes) {
                    author.recipes.forEach((recipeId) => recipeIdsByAuthors.add(recipeId));
                }
            });

            const filteredList = filterList.filter((recipe) => {
                //Поиск по названию
                const matchesSearch =
                    recipeSearch.length === 0 ||
                    recipe.title.toLowerCase().includes(recipeSearch.toLowerCase());

                //Аллергены
                const containsAllergens = recipe.ingredients.some((ingredient) => {
                    const ingredientTitle = ingredient.title.toLowerCase();

                    const allAllergens = [...allergens.filter(Boolean)];

                    allergensListOptions.forEach((item) => {
                        if (allergens.includes(item.title.toLowerCase())) {
                            allAllergens.push(...item.options);
                        }
                    });

                    const allergenFound = allAllergens
                        .filter(Boolean)
                        .some((allergen) => ingredientTitle.includes(allergen.toLowerCase()));

                    return allergenFound;
                });

                //Категории
                const containsCategors =
                    categors.length === 0 ||
                    recipe.category.some((category) => categors.includes(category));

                //Авторы
                const containsAuthors = authors.length === 0 || recipeIdsByAuthors.has(recipe.id);

                //Мясо
                const containsMeat =
                    meats.length === 0 || (recipe.meat && meats.includes(recipe.meat));

                //Гарнин
                const containsGarnishs =
                    garnishs.length === 0 || (recipe.side && garnishs.includes(recipe.side));

                return (
                    matchesSearch &&
                    !containsAllergens &&
                    containsCategors &&
                    containsAuthors &&
                    containsMeat &&
                    containsGarnishs
                );
            });

            setCountSearchRecipes &&
                setCountSearchRecipes(
                    filteredList.length != filterList.length ? filteredList.length : 0,
                );
            setVisibleList(filteredList);
        } else {
            setVisibleList(filterList);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recipeSearch, allergenSearch, categorsSearch, authorSearch, meatSearch, garnishSearch]);

    return VisibleList != undefined && VisibleList.length > 0 ? (
        <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
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
                    {VisibleList.slice(0, count).map((recipe, index) => (
                        <ListItem
                            data-test-id={`food-card-${index}`}
                            overflow='hidden'
                            flexBasis={{
                                base: '100%',
                                md: 'calc(50% - 8px)',
                                lg: '100%',
                                '2xl': 'calc(50% - 12px)',
                            }}
                            _hover={{
                                boxShadow:
                                    '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                            }}
                            key={recipe.id}
                        >
                            <RecipeCard
                                recipe={recipe}
                                urlConfig={filter === 'popular' ? 'popular' : 'categor'}
                                index={index}
                            />
                        </ListItem>
                    ))}
                </Flex>
            </UnorderedList>

            <Center mt='8px'>
                {VisibleList.length > count && location.pathname != '/' && (
                    <Button
                        data-test-id='juiciest-link-mobile'
                        fontWeight='600'
                        fontSize='16px'
                        lineHeight='24px'
                        mt='4px'
                        color='black'
                        bg='rgba(177, 255, 46, 1)'
                        size='md'
                        colorScheme='teal'
                        variant='solid'
                    >
                        Загрузить ещё
                    </Button>
                )}
            </Center>
        </Box>
    ) : (
        <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
            <Heading>К сожанению не удалось найти нужные рецепты... :с</Heading>
        </Box>
    );
};
