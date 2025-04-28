import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { HeaderPages } from '~/components/headerSearchPanelComponents/headerPages';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
import { TabMenu } from '~/components/tabMenu/tabMenu';
import { categorListData } from '~/data/categor';
import { useParamsGlobal } from '~/data/useParams';

export const CategorPage = () => {
    const location = useLocation();

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

    const pathnames = location.pathname.split('/').filter((x) => x);

    const categor = categorListData.find((categor) => categor.link === pathnames[0]);
    const subcategor = categor?.subCategor.find((subCategor) => subCategor.link === pathnames[1]);

    const [tabIndex, setTabIndex] = useState(Number(subcategor?.id) || 0);

    useEffect(() => {
        setTabIndex(Number(subcategor?.id));
    }, [pathnames, subcategor?.id]);

    return (
        <Flex direction='column' h='100%'>
            {/* Хеддер страницы */}
            <Box mb={{ base: '31px', lg: '20px' }}>
                <HeaderPages
                    title={categor?.title || ''}
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

            {categors.length === 0 && (
                <TabMenu tabIndex={tabIndex} categor={categor ? categor : undefined} />
            )}

            <Flex h='100%' direction='column' justify='space-between'>
                <RecipeList filter='categor' count={8} />

                {/* Рекомендованная кухня */}
                <Box>
                    <RelevantKitchen idCategor='4' />
                </Box>
            </Flex>
        </Flex>
    );
};
