import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Flex, Heading, HStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { BlogList } from '~/components/blogsList/blogList';
import { CardSlider } from '~/components/cardSlider/cardSlider';
import { HeaderPages } from '~/components/headerPages/headerPages';
import { RecipeList } from '~/components/recipeList/recipeList';
import { RelevantKitchen } from '~/components/relevantKitchen/relevantKitchen';

export const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Flex direction='column'>
            {/* Хеддер страницы */}
            <Box mb={{ base: '31px', lg: '20px' }}>
                <HeaderPages title='Приятного аппетита!' />
            </Box>

            <Flex direction='column'>
                {/* Слайдер "Новые рецепты" */}
                <Box mb={{ base: '28px', lg: '33px' }}>
                    <CardSlider title='Новые рецепты' />
                </Box>

                {/* Самое сочное */}
                <Box mb={{ base: '32px', md: '32px', lg: '38px' }}>
                    <HStack
                        display='flex'
                        justify='space-between'
                        align='center'
                        mb={{ base: '11px', lg: '14px', '2xl': '24px' }}
                    >
                        <Heading
                            as='h2'
                            textAlign='left'
                            fontWeight='500'
                            fontSize={{ base: '24px', lg: '36px', '2xl': '48px' }}
                            lineHeight={{ base: '32px', lg: '40px', '2xl': '48px' }}
                            letterSpacing='1.6px'
                        >
                            Самое сочное
                        </Heading>

                        <Button
                            data-test-id='juiciest-link'
                            onClick={() => {
                                navigate(`/popular`);
                            }}
                            display={{ base: 'none', lg: 'flex' }}
                            alignItems='center'
                            fontWeight='600'
                            fontSize='18px'
                            lineHeight='28px'
                            mt='4px'
                            color='black'
                            bg='rgba(177, 255, 46, 1)'
                            size={{ lg: 'md', '2xl': 'lg' }}
                            rightIcon={<ArrowForwardIcon h='16px' w='16px' />}
                            colorScheme='green'
                            variant='solid'
                        >
                            Вся подборка
                        </Button>
                    </HStack>

                    <RecipeList filter='popular' count={4} />

                    <Center mt='7px' display={{ base: 'block', lg: 'none' }}>
                        <Button
                            data-test-id='juiciest-link-mobile'
                            onClick={() => {
                                navigate(`/popular`);
                            }}
                            fontWeight='600'
                            fontSize='16px'
                            lineHeight='24px'
                            mt='4px'
                            color='black'
                            bg='rgba(177, 255, 46, 1)'
                            size='md'
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme='teal'
                            variant='solid'
                        >
                            Вся подборка
                        </Button>
                    </Center>
                </Box>

                {/* Кулинарные блоги */}
                <Box
                    mb={{ base: '31px', lg: '40px' }}
                    bg='rgba(196, 255, 97, 1)'
                    borderRadius='16px'
                    p={{ base: '12px', lg: '19px 24px 26px 25px', '2xl': '20px 24px 26px 25px' }}
                >
                    <HStack
                        display='flex'
                        justify='space-between'
                        align='center'
                        mb={{ base: '12px', lg: '18px', '2xl': '24px' }}
                    >
                        <Heading
                            as='h2'
                            textAlign='left'
                            fontWeight='400'
                            fontSize={{ base: '24px', lg: '30px', '2xl': '36px' }}
                            lineHeight={{ base: '32px', lg: '36px', '2xl': '40px' }}
                            letterSpacing='1px'
                        >
                            Кулинарные блоги
                        </Heading>

                        <Button
                            display={{ base: 'none', lg: 'block' }}
                            fontWeight='600'
                            fontSize='18px'
                            lineHeight='28px'
                            mt='4px'
                            p='10px 20px 10px 24px'
                            color='black'
                            size={{ lg: 'md', '2xl': 'lg' }}
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme='teal'
                            variant='ghost'
                        >
                            Все авторы
                        </Button>
                    </HStack>

                    <BlogList />

                    <Center mt='12px' display={{ base: 'block', lg: 'none' }}>
                        <Button
                            fontWeight='600'
                            fontSize='16px'
                            lineHeight='24px'
                            color='black'
                            size='md'
                            rightIcon={<ArrowForwardIcon />}
                            colorScheme='teal'
                            variant='ghost'
                        >
                            Все авторы
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
};
