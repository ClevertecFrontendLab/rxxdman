import { Box, Flex } from '@chakra-ui/react';

import { HeaderPages } from '~/components/headerSearchPanelComponents/headerPages';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
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

    return (
        <Flex direction='column'>
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
                />
            </Box>

            <Flex direction='column'>
                {/* Самое сочное */}
                <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
                    <RecipeList filter='popular' count={8} />
                </Box>

                {/* Рекомендованная кухня */}
                <Box>
                    <RelevantKitchen idCategor='6' />
                </Box>
            </Flex>
        </Flex>
    );
};
