import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Tag,
    Text,
} from '@chakra-ui/react';
import { FC } from 'react';

import { Recipe } from '~/api/types/recipe';
import { LikesCount, SaveCount } from '~/assets/createSvg';
import { useRecipePageImageSize } from '~/hooks/useRecipePageImageSize';

import { RecipeCardTag } from '../../recipeCard/recipeCardTag';
import { RecipeImage } from '../recipeImage';

interface IRecipePageHeaderProps {
    recipe: Recipe;
}

export const RecipePageHeader: FC<IRecipePageHeaderProps> = ({ recipe }) => {
    const { xl2, textHeight, textRef } = useRecipePageImageSize();

    return (
        <Card
            direction={{ base: 'column', md: 'row' }}
            variant='ghost'
            gap={{ base: '16px', lg: '24px' }}
            w='100%'
            overflow='hidden'
            minH={{ base: '224px', lg: '410px' }}
            flexShrink={1}
        >
            <RecipeImage imageUrl={recipe.image} alt={recipe.title} textHeight={textHeight} />

            <Stack
                ref={textRef}
                w={{ base: '100%', lg: '503px', '2xl': '783px' }}
                gap='0'
                overflow='hidden'
            >
                <CardHeader p='0' mb='32px'>
                    <Flex gap='20px' justify='space-between' align='flex-start'>
                        <Flex flexWrap='wrap' gap='8px'>
                            {recipe.categoriesIds.map((subCategory) => (
                                <RecipeCardTag
                                    key={subCategory}
                                    subCategorId={subCategory}
                                    color='rgba(255, 255, 211, 1)'
                                />
                            ))}
                        </Flex>

                        <Flex gap='8px'>
                            <HStack spacing='8px' p={{ base: '4px', '2xl': '6px 12px' }}>
                                <SaveCount />
                                <Text
                                    color='rgba(45, 177, 0, 1)'
                                    fontWeight='600'
                                    fontSize={{ base: '12px', '2xl': '14px' }}
                                    lineHeight={{ base: '16px', '2xl': '20px' }}
                                >
                                    {recipe.bookmarks}
                                </Text>
                            </HStack>

                            <HStack spacing='8px' p={{ base: '4px', '2xl': '6px 12px' }}>
                                <LikesCount />
                                <Text
                                    color='rgba(45, 177, 0, 1)'
                                    fontWeight='600'
                                    fontSize={{ base: '12px', '2xl': '14px' }}
                                    lineHeight={{ base: '16px', '2xl': '20px' }}
                                >
                                    {recipe.likes}
                                </Text>
                            </HStack>
                        </Flex>
                    </Flex>
                </CardHeader>

                <CardBody p='0' textAlign='left' mb='24px' maxW='528px'>
                    <Heading
                        fontWeight='700'
                        fontSize={{ base: '24px', lg: '48px' }}
                        lineHeight={{ base: '32px', lg: '48px' }}
                        mb={{ base: '16px', lg: '24px' }}
                    >
                        {recipe.title}
                    </Heading>

                    <Text fontWeight='400' fontSize='14px' lineHeight='20px'>
                        {recipe.description}
                    </Text>
                </CardBody>

                <CardFooter p='0'>
                    <Flex
                        w='100%'
                        justify='space-between'
                        align='flex-end'
                        flexWrap='wrap'
                        gap={{ base: '12px', lg: '24px' }}
                    >
                        <Tag
                            p={{ base: '2px 4px', lg: '2px 8px' }}
                            bg='blackAlpha.100'
                            gap={{ base: '2px', lg: '8px' }}
                        >
                            <Image
                                h='16px'
                                w='16px'
                                src='/src/assets/time.svg'
                                alt='Время изготовления'
                            />
                            <Text
                                fontSize='14'
                                fontWeight='400'
                                lineHeight='20px'
                                whiteSpace='nowrap'
                            >
                                {recipe.time}
                            </Text>
                        </Tag>

                        <Flex
                            gap={{ base: '12px', '2xl': '16px' }}
                            fontWeight='600'
                            fontSize={{ md: '12px', lg: '14px', '2xl': '18px' }}
                            lineHeight={{ md: '16px', lg: '20px', '2xl': '28px' }}
                        >
                            <Button
                                size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                                p={{ md: '3px 7px', lg: xl2 ? '10px 24px 10px 20px' : '6px 12px' }}
                                leftIcon={<LikesCount mr='0' />}
                                variant='outline'
                                colorScheme='black'
                            >
                                Оценить рецепт
                            </Button>

                            <Button
                                size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                                p={{ md: '4px 8px', lg: xl2 ? '10px 24px 10px 20px' : '6px 12px' }}
                                leftIcon={<SaveCount />}
                                color='rgba(0, 0, 0, 0.8)'
                                variant='solid'
                                bg='rgba(177, 255, 46, 1)'
                                border='none'
                            >
                                Сохранить в закладки
                            </Button>
                        </Flex>
                    </Flex>
                </CardFooter>
            </Stack>
        </Card>
    );
};
