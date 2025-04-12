import { Box, Button, Center, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { HeaderPages } from '~/components/headerPages/headerPages';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';
import { TabMenu } from '~/components/tabMenu/tabMenu';
import { categorListData } from '~/data/categor';

export const CategorPage = () => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);

    const categor = categorListData.find((categor) => categor.link === pathnames[1]);
    const subcategor = categor?.subCategor[Number(pathnames[2])];

    const [tabIndex, setTabIndex] = useState(Number(subcategor?.id) || 0);

    useEffect(() => {
        setTabIndex(Number(subcategor?.id));
    }, [pathnames, subcategor?.id]);

    return (
        <Flex direction='column'>
            {/* Хеддер страницы */}
            <Box mb={{ base: '27px', lg: '0' }}>
                <HeaderPages
                    title={categor != undefined ? categor.title : 'Категория отсутсвует'}
                    subtitle={categor?.subTitle}
                />
            </Box>

            <Center mb={{ base: '22px', lg: '25px', '2xl': '10px' }} w='100%' overflowX='scroll'>
                <TabMenu tabIndex={tabIndex} categor={categor ? categor : undefined} />
            </Center>

            <Flex direction='column'>
                {/* Самое сочное */}
                <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
                    <RecipeList filter='popular' count={8} />

                    <Center mt='8px'>
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
                    </Center>
                </Box>

                {/* Рекомендованная кухня */}
                <Box>
                    <RelevantKitchen idCategor='4' />
                </Box>
            </Flex>
        </Flex>
    );
};
