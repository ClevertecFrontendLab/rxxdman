import { Box, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { RECIPES_DEFAULT_LIMIT } from '~/api/constants/apiConstant';
import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { Category } from '~/api/types/category';
import { HeaderPages } from '~/components/headerSearchPanelComponents/headerPages';
import { Loader } from '~/components/loader/loader';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
import { TabMenu } from '~/components/tabMenu/tabMenu';
import { PATHS } from '~/constants/path';
import { useListParams } from '~/hooks/useListParams';
import { useParamsGlobal } from '~/hooks/useParams';
import { FilterList } from '~/types/filterList';

export const CategorPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [listFilter, setListFilter] = useState<FilterList>('categor');

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

    const categor = categories?.find(
        (categor) => categor.category === pathnames[0] && categor.subCategories,
    );
    const subCategor = categories?.find(
        (subCategor) => subCategor.category === pathnames[1] && subCategor.rootCategoryId,
    );

    const [tabIndex, setTabIndex] = useState(0);

    const { visibleList, isLoading, page, totalPage, onClickAddRecipes } = useListParams(
        RECIPES_DEFAULT_LIMIT,
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
        if (isSuccess && (!categor || !subCategor)) navigate(PATHS.NOT_FOUND);
    }, [categor, isSuccess, navigate, subCategor]);

    return (
        <>
            {isLoading && (
                <Center
                    zIndex={1001}
                    left={0}
                    top={0}
                    bg='rgba(0, 0, 0, 0.16)'
                    position='fixed'
                    h='100vh'
                    w='100vw'
                    backdropFilter='blur(1px)'
                >
                    <Loader testId='app-loader' />
                </Center>
            )}

            <Flex direction='column' h='100%'>
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

                {!searchState && <TabMenu tabIndex={tabIndex} category={categor as Category} />}

                <Flex h='100%' direction='column' justify='space-between'>
                    <RecipeList
                        filter={listFilter}
                        count={RECIPES_DEFAULT_LIMIT}
                        list={visibleList}
                        isLoading={isLoading}
                        page={page}
                        totalPage={totalPage}
                        onClickAddPageRecipes={onClickAddRecipes}
                    />

                    <Box>
                        <RelevantKitchen />
                    </Box>
                </Flex>
            </Flex>
        </>
    );
};
