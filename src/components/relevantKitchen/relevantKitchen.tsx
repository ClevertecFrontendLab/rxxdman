import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';

import { categor, categorListData } from '~/data/categor';
import { recipelist, recipeListData } from '~/data/recipes';

import { RelevantKitchenCard } from './relevantKitchenCard';

interface IRelevantKitchenProps {
    idCategor: string;
}

export const RelevantKitchen: FC<IRelevantKitchenProps> = ({ idCategor }) => {
    const [categor, setCategor] = useState<categor | null>(null);
    const [recipeList, setRecipeList] = useState<recipelist>([]);

    useEffect(() => {
        const foundCategor = categorListData.find((categor) => categor.id === idCategor) || null;
        setCategor(foundCategor);
    }, [idCategor]);

    useEffect(() => {
        if (categor) {
            const filteredRecipes = recipeListData.filter((recipe) =>
                recipe.categor.split('__')[0].includes(categor.link),
            );
            setRecipeList(filteredRecipes);
        } else {
            setRecipeList([]);
        }
    }, [categor]);

    return (
        <Box borderTop='1px solid rgba(0, 0, 0, 0.08)'>
            <Flex
                display='flex'
                direction={{ base: 'column', lg: 'row' }}
                gap={{ base: '12px', lg: '18px', '2xl': '24px' }}
                p={{ base: '8px 0 16px 0', lg: '24px 0 24px' }}
                align='flex-start'
            >
                <Heading
                    flexBasis={{ base: '100%', lg: '33%', '2xl': '50%' }}
                    as='h2'
                    textAlign='left'
                    fontWeight='500'
                    fontSize={{ base: '24px', lg: '36px', '2xl': '48px' }}
                    lineHeight={{ base: '32px', lg: '40px', '2xl': '48px' }}
                    letterSpacing='2px'
                >
                    {categor?.title}
                </Heading>

                <Text
                    flexBasis={{ base: '100%', lg: '66%', '2xl': '50%' }}
                    fontWeight='500'
                    fontSize={{ base: '14px', lg: '16px', '2xl': '16px' }}
                    lineHeight={{ base: '20px', lg: '24px', '2xl': '24px' }}
                    color='blackAlpha.700'
                    textAlign='left'
                >
                    {categor?.subTitle}
                </Text>
            </Flex>

            {recipeList.length > 1 && (
                <Flex
                    w='100%'
                    direction={{ base: 'column', md: 'row' }}
                    gap={{ base: '12px', lg: '16px', '2xl': '24px' }}
                    overflow='hidden'
                >
                    <Flex
                        maxW={{ base: '100%', md: '65.5%', lg: '67%', '2xl': '50%' }}
                        flexBasis={{ base: '100%', md: '65.5%', lg: '67%', '2xl': '50%' }}
                        direction={{ base: 'column', md: 'row' }}
                        flexGrow={0}
                        flexShrink={1}
                        gap={{ base: '12px', lg: '16px', '2xl': '24px' }}
                    >
                        <RelevantKitchenCard direct='column' recipe={recipeList[0]} />
                        <RelevantKitchenCard direct='column' recipe={recipeList[1]} />
                    </Flex>

                    <Flex
                        flexBasis={{ base: '100%', md: '33.5%', lg: '33%', '2xl': '50%' }}
                        overflow='hidden'
                        direction='column'
                        flexGrow={0}
                        flexShrink={1}
                        gap={{ base: '12px', md: '6px', lg: '12px' }}
                    >
                        <RelevantKitchenCard direct='row' recipe={recipeList[2]} />
                        <RelevantKitchenCard direct='row' recipe={recipeList[3]} />
                        <RelevantKitchenCard direct='row' recipe={recipeList[4]} />
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};
