import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    Heading,
    IconButton,
    ListItem,
    UnorderedList,
    useBreakpointValue,
} from '@chakra-ui/react';
import { FC } from 'react';

import { recipeListData } from '~/data/recipes';

import { RecipeCard } from '../recipeCard/recipeCard';

interface ICardSliderProps {
    title?: string;
}

export const CardSlider: FC<ICardSliderProps> = ({ title }) => {
    const checkSizeBtn = useBreakpointValue({
        base: true,
        '2xl': false,
    });

    const countCard = 10; //Количество карточек

    const sortCards = [...recipeListData].sort(function (a, b) {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
        return 0;
    });

    return (
        <Box position='relative'>
            {title && (
                <Heading
                    as='h2'
                    textAlign='left'
                    fontWeight='500'
                    fontSize={{ base: '24px', lg: '36px', '2xl': '48px' }}
                    lineHeight={{ base: '32px', lg: '40px', '2xl': '48px' }}
                    letterSpacing='1px'
                    mb={{ base: '13px', xl: '27px' }}
                >
                    {title}
                </Heading>
            )}

            <UnorderedList m='0' styleType='none'>
                <Flex
                    w='100%'
                    wrap='nowrap'
                    gap={{ base: '12px', lg: '11px', '2xl': '22px' }}
                    overflowX={{ base: 'auto', lg: 'hidden' }}
                    sx={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    {sortCards.slice(0, countCard).map((recipe) => (
                        <ListItem key={recipe.id}>
                            <RecipeCard direct='column' recipe={recipe} />
                        </ListItem>
                    ))}
                </Flex>
            </UnorderedList>

            <Flex
                display={{ base: 'none', lg: 'flex' }}
                position='absolute'
                w='calc(100% + 16px)'
                top='50%'
                transform='translate(0, -50%)'
                left='-8px'
                justify='space-between'
            >
                <IconButton
                    size={checkSizeBtn ? 'md' : 'lg'}
                    colorScheme='black'
                    variant='solid'
                    bg='rgba(0, 0, 0, 1)'
                    color='white'
                    aria-label='left slider'
                    icon={<ArrowBackIcon boxSize={{ base: 4, '2xl': 6 }} />}
                    transition='background .2s ease-in-out'
                    _hover={{ bg: 'rgba(0, 0, 0, .7)', border: 'none' }}
                />

                <IconButton
                    size={checkSizeBtn ? 'md' : 'lg'}
                    colorScheme='black'
                    variant='solid'
                    bg='rgba(0, 0, 0, 1)'
                    color='white'
                    aria-label='right slider'
                    icon={<ArrowForwardIcon boxSize={6} />}
                    transition='background .2s ease-in-out'
                    _hover={{ bg: 'rgba(0, 0, 0, .7)', border: 'none' }}
                />
            </Flex>
        </Box>
    );
};
