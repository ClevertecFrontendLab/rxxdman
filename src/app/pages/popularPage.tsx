import { AbsoluteCenter, Box, Flex } from '@chakra-ui/react';

import { HeaderPages } from '~/components/headerSearchPanelComponents/headerPages';
import { Loader } from '~/components/loader/loader';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
import { useListParams } from '~/data/useListParams';
import { useParamsGlobal } from '~/data/useParams';

export const PopularPage = () => {
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

    const { visibleList, isLoading, isSuccess, page, totalPage, onClickAddRecipes } = useListParams(
        8,
        'popular',
    );

    return (
        <Flex direction='column' h='100%' justify='space-between'>
            {isLoading && (
                <AbsoluteCenter zIndex={100000} position='fixed'>
                    <Loader testId='app-loader' />
                </AbsoluteCenter>
            )}
            {/* Хеддер страницы */}
            <Box mb={{ base: '31px', lg: '0' }}>
                <HeaderPages
                    title='Самое сочное'
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

            <Flex direction='column'>
                {/* Самое сочное */}
                <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
                    {isSuccess && (
                        <RecipeList
                            filter='popular'
                            count={8}
                            list={visibleList}
                            isLoading={isLoading}
                            page={page}
                            totalPage={totalPage}
                            onClickAddPageRecipes={onClickAddRecipes}
                        />
                    )}
                </Box>

                {/* Рекомендованная кухня */}
                <Box>
                    <RelevantKitchen />
                </Box>
            </Flex>
        </Flex>
    );
};
