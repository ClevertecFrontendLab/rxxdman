import { Box, Button, Center, Flex } from '@chakra-ui/react';

import { HeaderPages } from '~/components/headerPages/headerPages';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';

export const PopularPage = () => (
    <Flex direction='column'>
        {/* Хеддер страницы */}
        <Box mb={{ base: '31px', lg: '0' }}>
            <HeaderPages title='Самое сочное' />
        </Box>

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
                <RelevantKitchen idCategor='6' />
            </Box>
        </Flex>
    </Flex>
);
