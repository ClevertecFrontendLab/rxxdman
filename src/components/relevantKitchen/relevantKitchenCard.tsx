import { Button, Card, CardBody, Flex, Image, Tag, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router';

import { IMAGE_API_URL } from '~/api/constants/apiConstant';
import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { Recipe } from '~/api/types/recipe';
import { LikesCount, SaveCount } from '~/assets/createSvg';

import { ProfileNotificationAtribute } from '../profileNotification/profileNotificationAtribute/profileNotificationAtribute';

type Direct = 'row' | 'column';

type RecipeCardProps = {
    direct: Direct;
    recipe: Recipe;
};

export const RelevantKitchenCard: FC<RecipeCardProps> = ({ direct, recipe }) => {
    const navigate = useNavigate();

    const { data: categories } = useGetCategoriesQuery();

    const subcategor = categories?.find((subCategor) => subCategor._id === recipe.categoriesIds[0]);
    const categor = categories?.find((categor) =>
        categor.subCategories?.find((subcategorLocal) => subcategorLocal._id === subcategor?._id),
    );

    switch (direct) {
        case 'row':
            return (
                <Card
                    direction='row'
                    w='100%'
                    overflow='hidden'
                    variant='outline'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    boxSizing='border-box'
                    flexShrink={1}
                    _hover={{
                        boxShadow:
                            '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                    }}
                >
                    <CardBody
                        w='100%'
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        gap='8px'
                        h={{ base: '50px', '2xl': '54px' }}
                        p={{
                            base: '10px 12px 8px 12px',
                            lg: '10px 12px',
                            '2xl': '10px 22px 10px 24px',
                        }}
                    >
                        <Image
                            h='24px'
                            w='24px'
                            src={`${IMAGE_API_URL}${categor?.icon}`}
                            alt={recipe.title}
                        />

                        <Text
                            overflow='hidden'
                            textOverflow='ellipsis'
                            fontSize={{ base: '16px', lg: '20px' }}
                            fontWeight='500'
                            lineHeight={{ base: '24px', lg: '28px' }}
                            textAlign='left'
                            whiteSpace='nowrap'
                            mr='auto'
                            flexShrink={1}
                        >
                            {recipe.title}
                        </Text>

                        <Button
                            minW='70px'
                            p={{ base: '8px', '2xl': '6px 12px' }}
                            w={{ base: '70px', '2xl': '87px' }}
                            size={{ base: 'xs', '2xl': 'sm' }}
                            flexShrink={0}
                            align-self='Stretch'
                            colorScheme='Lime'
                            borderColor='rgba(45, 177, 0, 1)'
                            variant='outline'
                            color='rgba(45, 177, 0, 1)'
                            fontSize={{ base: '12px', lg: '14px', '2xl': '20px' }}
                            fontWeight='600'
                            lineHeight={{ base: '16px', lg: '20px', '2xl': '28px' }}
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                    `/${categor?.category}/${subcategor?.category}/${recipe._id}`,
                                );
                            }}
                        >
                            Готовить
                        </Button>
                    </CardBody>
                </Card>
            );

        case 'column':
            return (
                <Card
                    direction='row'
                    w='100%'
                    overflow='hidden'
                    variant='outline'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    boxSizing='border-box'
                    flexShrink={1}
                    _hover={{
                        cursor: 'pointer',
                        boxShadow:
                            '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                    }}
                    onClick={() =>
                        navigate(`/${categor?.category}/${subcategor?.category}/${recipe._id}`)
                    }
                >
                    <CardBody
                        w='100%'
                        display='flex'
                        flexDirection='column'
                        gap='8px'
                        p={{
                            base: '12px',
                            lg: '16px 16px 18px 16px',
                            '2xl': '22px 24px 20px 24px',
                        }}
                    >
                        <Text
                            overflow='hidden'
                            textOverflow='ellipsis'
                            fontSize={{ base: '16px', lg: '20px' }}
                            fontWeight='500'
                            lineHeight={{ base: '24px', lg: '28px' }}
                            textAlign='left'
                            whiteSpace='nowrap'
                        >
                            {recipe.title}
                        </Text>

                        <Text
                            textOverflow='ellipsis'
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
                            mb={{ base: '16px', md: 'auto' }}
                        >
                            {recipe.description}
                        </Text>

                        <Flex
                            zIndex='1'
                            h='24px'
                            gap={{ base: '8px', lg: '10px' }}
                            justify='flex-end'
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
                    </CardBody>

                    <Tag
                        position='absolute'
                        bottom={{ base: '12px', lg: '18px', '2xl': '20px' }}
                        left={{ base: '12px', lg: '16px', '2xl': '24px' }}
                        p={{ base: '2px 8px', lg: '2px 8px' }}
                        bg='rgba(255, 255, 211, 1)'
                        gap='8px'
                    >
                        <Image
                            h='16px'
                            w='16px'
                            src={`${IMAGE_API_URL}${categor?.icon}`}
                            alt={categor?.title}
                        />
                        <Text fontSize='14' fontWeight='400' lineHeight='20px' whiteSpace='nowrap'>
                            {categor?.title}
                        </Text>
                    </Tag>
                </Card>
            );
    }
};
