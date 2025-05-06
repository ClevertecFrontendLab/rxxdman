import {
    // Avatar,
    Button,
    Card,
    CardBody,
    Flex,
    IconButton,
    Image,
    Stack,
    // Tag,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';

import { recipe } from '~/API/recipeApi';
import { LikesCount, SaveCount } from '~/assets/createSvg';
import { useParamsGlobal } from '~/data/useParams';

// import { users } from '~/data/user';
// import { generationCategorSubCategor } from '~/function/function';
import { ProfileNotificationAtribute } from '../profileNotification/profileNotificationAtribute/profileNotificationAtribute';
import { RecipeCardTag } from './recipeCardTag';

type urlConfig = 'popular' | 'categor';

interface IRecipeCardProps {
    recipe: recipe;
    urlConfig: urlConfig;
    index: number;
}

export const RecipeCard: FC<IRecipeCardProps> = React.memo(({ recipe, urlConfig, index }) => {
    const { category, subcategor } = useParams();

    const { searchParam } = useParamsGlobal();

    const [recipeTitleParams, setRecipeTitleParams] = useState(searchParam.get('title') || '');

    const [isSearch, setIsSearch] = useState(false);
    const [indexSearchTitle, setIndexSearchTitle] = useState(-1);

    useEffect(() => {
        setRecipeTitleParams(searchParam.get('title') || '');

        if (
            recipeTitleParams.length > 0 &&
            recipe.title.toLowerCase().includes(recipeTitleParams.toLowerCase())
        ) {
            //Логика только для заголовка рецепта
            setIsSearch(true);
            setIndexSearchTitle(
                recipe.title.toLowerCase().indexOf(recipeTitleParams.toLowerCase()),
            );
        } else {
            setIsSearch(false);
            setIndexSearchTitle(-1);
        }
    }, [recipe.title, recipeTitleParams, searchParam]);

    // const userRecomendation = users.find((user) => user.id === recipe.userRecommendation);

    const sizeCheck = useBreakpointValue({
        base: false,
        lg: true,
    });
    return (
        <Card
            direction='row'
            overflow='hidden'
            variant='outline'
            border='1px solid rgba(0, 0, 0, 0.08)'
            boxSizing='border-box'
            position='relative'
            flexShrink={0}
            w='100%'
            h={{ base: '128px', lg: '244px' }}
        >
            <Image
                objectFit='cover'
                w={{ base: '158px', lg: '346px' }}
                h='100%'
                src={`https://training-api.clevertec.ru/${recipe.image}`}
                alt={recipe.title}
                flexShrink={0}
            />

            <CardBody
                display='flex'
                flexDirection='column'
                w='100%'
                overflow='hidden'
                p={{ base: '8px 8px 4px 8px', lg: '20px 22px 20px 24px' }}
            >
                <Flex w='100%' justify='space-between'>
                    {sizeCheck && (
                        <Stack w='fit-content' overflow='hidden' maxH='56px'>
                            {recipe.categoriesIds.map((subCategory) => (
                                <RecipeCardTag
                                    key={subCategory}
                                    subCategorId={subCategory}
                                    color='rgba(255, 255, 211, 1)'
                                />
                            ))}
                        </Stack>
                    )}

                    <Flex
                        h='24px'
                        gap='8px'
                        mb={{ base: '0', lg: '24px' }}
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

                {/* Заголовок рецепта*/}
                {sizeCheck ? (
                    !isSearch ? (
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
                            fontSize='20px'
                            fontWeight='500'
                            lineHeight='28px'
                            textAlign='left'
                            whiteSpace='nowrap'
                            mb='8px'
                        >
                            {recipe.title.substring(0, indexSearchTitle)}
                            <span style={{ color: 'rgba(45, 177, 0, 1)' }}>
                                {recipe.title.substring(
                                    indexSearchTitle,
                                    indexSearchTitle + recipeTitleParams.length,
                                )}
                            </span>
                            {recipe.title.substring(
                                indexSearchTitle + recipeTitleParams.length,
                                recipe.title.length,
                            )}
                        </Text>
                    )
                ) : (
                    <Text
                        overflow='hidden'
                        textOverflow='ellipsis'
                        display='-webkit-box'
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
                        mb='auto'
                    >
                        {recipe.title}
                    </Text>
                )}

                {/* Описание рецепта*/}
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

                <Flex h={{ base: '24px', lg: '32px' }} gap='8px' justify='flex-end'>
                    {sizeCheck ? (
                        <Button
                            size={{ base: 'xs', lg: 'sm' }}
                            leftIcon={<SaveCount />}
                            color='rgba(0, 0, 0, 0.8)'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            variant='outline'
                        >
                            Сохранить
                        </Button>
                    ) : (
                        <IconButton
                            size={{ base: 'xs', lg: 'sm' }}
                            aria-label='save card'
                            icon={<LikesCount />}
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            variant='outline'
                        />
                    )}

                    <Link
                        to={
                            urlConfig === 'popular'
                                ? `/the-juiciest/${recipe._id}`
                                : `/${category}/${subcategor}/${recipe._id}`
                        }
                    >
                        <Button
                            data-test-id={`card-link-${index}`}
                            size={{ base: 'xs', lg: 'sm' }}
                            bg='black'
                            color='white'
                            p='6px 12px 6px 10px'
                            mb='8px'
                        >
                            Готовить
                        </Button>
                    </Link>
                </Flex>
            </CardBody>

            {/* Тег категории */}
            {!sizeCheck && (
                <Stack
                    position='absolute'
                    top={{ base: '8px', lg: '20px' }}
                    left={{ base: '8px', lg: '370px' }}
                >
                    {recipe.categoriesIds.map((subCategory) => (
                        <RecipeCardTag
                            key={subCategory}
                            subCategorId={subCategory}
                            color='rgba(255, 255, 211, 1)'
                        />
                    ))}
                </Stack>
            )}

            {/* Рекомендация пользователя */}
            {/* {recipe.userRecommendation && (
                        <Tag
                            position='absolute'
                            bottom='20px'
                            left='24px'
                            p='4px 8px'
                            bg='rgba(215, 255, 148, 1)'
                            gap='8px'
                            display={{ base: 'none', lg: 'flex' }}
                        >
                            <Avatar
                                size='2xs'
                                bg='gray.400'
                                name={userRecomendation?.name + ' ' + userRecomendation?.surname}
                                src={userRecomendation?.ico}
                            />
                            <Text
                                fontSize='14'
                                fontWeight='400'
                                lineHeight='20px'
                                whiteSpace='nowrap'
                            >
                                {userRecomendation?.name +
                                    ' ' +
                                    userRecomendation?.surname +
                                    ' рекомендует'}
                            </Text>
                        </Tag>
                    )} */}
        </Card>
    );
});
