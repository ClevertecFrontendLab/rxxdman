import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { category, useGetCategoriesQuery } from '~/API/categorsApi';
import { HeaderPages } from '~/components/headerSearchPanelComponents/headerPages';
import { filterList, RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
import { TabMenu } from '~/components/tabMenu/tabMenu';
import { useListParams } from '~/data/useListParams';
import { useParamsGlobal } from '~/data/useParams';

export const CategorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [listFilter, setListFilter] = useState<filterList>('categor');

    const {
        searchState,
        setParams,
        clearParams,
        title,
        allergens,
        categors,
        authorsId,
        meat,
        garnish,
        stateFullClear,
    } = useParamsGlobal();

    useEffect(() => {
        setListFilter(searchState ? 'popular' : 'categor');
    }, [searchState]);

    const pathnames = location.pathname.split('/').filter((x) => x);

    const { data: categories, isSuccess } = useGetCategoriesQuery();

    const categor =
        categories &&
        categories.find((categor) => categor.category === pathnames[0] && categor.subCategories);
    const subCategor =
        categories &&
        categories.find(
            (subCategor) => subCategor.category === pathnames[1] && subCategor.rootCategoryId,
        );

    const [tabIndex, setTabIndex] = useState(0);

    const { visibleList, isLoading, page, totalPage, onClickAddRecipes } = useListParams(
        8,
        listFilter,
    );

    useEffect(() => {
        setTabIndex(
            Number(
                categor?.subCategories?.findIndex(
                    (subcategor) => subcategor.category === subCategor?.category,
                ),
            ) || 0,
        );
    }, [categor?.subCategories, pathnames, subCategor?.category]);

    useEffect(() => {
        if (isSuccess && (!categor || !subCategor)) navigate('/not-found');
    }, [categor, isSuccess, navigate, subCategor]);

    return (
        <Flex direction='column' h='100%'>
            {/* Хеддер страницы */}
            <Box mb={{ base: '31px', lg: '20px' }}>
                <HeaderPages
                    title={categor?.title || ''}
                    subtitle={categor?.description}
                    searchState={searchState}
                    textSearch={title}
                    allergensSearch={allergens}
                    categorsSearch={categors}
                    authorsSearch={authorsId}
                    meatSearch={meat}
                    garnishSearch={garnish}
                    setParams={setParams}
                    clearParams={clearParams}
                    stateFullClear={stateFullClear}
                    isLoading={isLoading}
                    totalPage={totalPage}
                />
            </Box>

            {!searchState && (
                <TabMenu
                    tabIndex={tabIndex}
                    categor={categor ? (categor as category) : undefined}
                />
            )}

            <Flex h='100%' direction='column' justify='space-between'>
                <RecipeList
                    filter={listFilter}
                    count={8}
                    list={visibleList}
                    isLoading={isLoading}
                    page={page}
                    totalPage={totalPage}
                    onClickAddPageRecipes={onClickAddRecipes}
                />

                {/* Рекомендованная кухня */}
                <Box>
                    <RelevantKitchen />
                </Box>
            </Flex>
        </Flex>
    );
};
