import {
    // Avatar,
    Card,
    CardBody,
    Flex,
    Image,
    Stack,
    // Tag,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { NavLink } from 'react-router';

import { LikesCount, SaveCount } from '~/assets/createSvg';
import { recipe } from '~/data/recipes';
// import { users } from '~/data/user';
import { generationCategorSubCategor } from '~/function/function';

import { ProfileNotificationAtribute } from '../profileNotification/profileNotificationAtribute/profileNotificationAtribute';
import { RecipeCardTag } from '../recipeCard/recipeCardTag';

interface ISliderRecipeCardProps {
    recipe: recipe;
    index: number;
}

export const SliderRecipeCard: FC<ISliderRecipeCardProps> = React.memo(({ recipe, index }) => {
    const arrLink = generationCategorSubCategor(recipe);

    const sizeCheck = useBreakpointValue({
        base: false,
        lg: true,
    });

    return (
        <NavLink
            data-test-id={`carousel-card-${index}`}
            style={{ height: '100%' }}
            to={`/${recipe.category[0]}/${arrLink.get(recipe.category[0])?.[0]}/${recipe.id}`}
        >
            <Card
                borderRadius='8px'
                direction='column'
                mb='3px'
                variant='outline'
                border='1px solid rgba(0, 0, 0, 0.08)'
                w={{ base: '158px', lg: '279px', '2xl': '322px' }}
                h='100%'
                boxSizing='border-box'
                position='relative'
                flexGrow={0}
                flexShrink={1}
                _hover={{
                    boxShadow:
                        '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                }}
            >
                <Image
                    borderTopRadius='8px'
                    objectFit='cover'
                    w='100%'
                    h={{ base: '128px', lg: '230px' }}
                    src={recipe.image}
                    alt={recipe.title}
                    flexShrink={0}
                />

                <Stack h='100%'>
                    <CardBody
                        p={{
                            base: '7px 8px 4px 8px',
                            lg: '12px',
                            '2xl': '16px 25px 19px 24px',
                        }}
                        h='100%'
                        display='flex'
                        flexDirection='column'
                    >
                        {sizeCheck ? (
                            <Text
                                overflow='hidden'
                                textOverflow='ellipsis'
                                fontSize='20px'
                                fontWeight='500'
                                lineHeight='28px'
                                textAlign='left'
                                whiteSpace='nowrap'
                                mb='8px'
                            >
                                {recipe.title}
                            </Text>
                        ) : (
                            <Text
                                overflow='hidden'
                                textOverflow='ellipsis'
                                display='-webkit-box'
                                h='48px'
                                style={{
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    width: '100%',
                                }}
                                fontSize='16px'
                                fontWeight='500'
                                lineHeight='24px'
                                textAlign='left'
                                whiteSpace='normal'
                                mb='8px'
                            >
                                {recipe.title}
                            </Text>
                        )}
                        <Text
                            overflow='hidden'
                            textOverflow='ellipsis'
                            display={{ base: 'none', lg: '-webkit-box' }}
                            style={{
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                WebkitLineClamp: 3,
                            }}
                            h='64px'
                            fontSize='14px'
                            fontWeight='400'
                            lineHeight='20px'
                            textAlign='left'
                            mb='24px'
                        >
                            {recipe.description}
                        </Text>

                        <Flex align='flex-end' justify='space-between' mt='auto'>
                            {sizeCheck && (
                                <Stack w='fit-content' overflow='hidden'>
                                    {recipe.category.map((category) => (
                                        <RecipeCardTag
                                            key={category}
                                            categorLink={category}
                                            color='rgba(215, 255, 148, 1)'
                                        />
                                    ))}
                                </Stack>
                            )}
                            <Flex
                                h='24px'
                                gap={{ base: '8px', lg: '10px' }}
                                justify={{ base: 'flex-start', lg: 'flex-end' }}
                            >
                                {recipe.bookmarks > 0 && (
                                    <ProfileNotificationAtribute
                                        Ico={SaveCount}
                                        title={recipe.bookmarks.toString()}
                                        type='Card'
                                    />
                                )}
                                {recipe.likes > 0 && (
                                    <ProfileNotificationAtribute
                                        Ico={LikesCount}
                                        title={recipe.likes.toString()}
                                        type='Card'
                                    />
                                )}
                            </Flex>
                        </Flex>
                    </CardBody>
                </Stack>

                {!sizeCheck && (
                    <Stack
                        position='absolute'
                        top={{ base: '8px', lg: 'auto' }}
                        bottom={{ base: 'auto', lg: '12px', '2xl': '19px' }}
                        left={{ base: '8px', lg: '12px', '2xl': '24px' }}
                    >
                        {recipe.category.map((category) => (
                            <RecipeCardTag
                                key={category}
                                categorLink={category}
                                color='rgba(215, 255, 148, 1)'
                            />
                        ))}
                    </Stack>
                )}
            </Card>
        </NavLink>
    );
});
