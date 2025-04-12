import {
    Avatar,
    Button,
    Card,
    CardBody,
    Flex,
    IconButton,
    Image,
    Stack,
    Tag,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import {
    ProfileNotificationAtributeLike,
    ProfileNotificationAtributeSave,
} from '~/assets/createSvg';
import { categorListData } from '~/data/categor';
import { recipe } from '~/data/recipes';
import { users } from '~/data/user';

import { ProfileNotificationAtribute } from '../profileNotificationAtribute/profileNotificationAtribute';

type direct = 'row' | 'column';

interface IRecipeCardProps {
    direct: direct;
    recipe: recipe;
}

export const RecipeCard: FC<IRecipeCardProps> = React.memo(({ direct, recipe }) => {
    const categorSubCategor = recipe.categor.split('__');
    const categor = categorListData.find((categor) => categor.link === categorSubCategor[0]);

    const userRecomendation = users.find((user) => user.id === recipe.userRecommendation);

    const sizeCheck = useBreakpointValue({
        base: false,
        lg: true,
    });

    switch (direct) {
        case 'row':
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
                    _hover={{
                        boxShadow:
                            '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                    }}
                >
                    <Image
                        objectFit='cover'
                        w={{ base: '158px', lg: '346px' }}
                        h={{ base: '128px', lg: '244px' }}
                        src={recipe.ico}
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
                        <Flex
                            h='24px'
                            gap='8px'
                            mb={{ base: '0', lg: '24px' }}
                            justify={{ base: 'flex-start', lg: 'flex-end' }}
                        >
                            {recipe.save > 0 && (
                                <ProfileNotificationAtribute
                                    Ico={ProfileNotificationAtributeSave}
                                    title={recipe.save.toString()}
                                    type='Card'
                                />
                            )}
                            {recipe.like > 0 && (
                                <ProfileNotificationAtribute
                                    Ico={ProfileNotificationAtributeLike}
                                    title={recipe.like.toString()}
                                    type='Card'
                                />
                            )}
                        </Flex>

                        {/* Заголовок рецепта*/}
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
                            {recipe.subtitle}
                        </Text>

                        <Flex h={{ base: '24px', lg: '32px' }} gap='8px' justify='flex-end'>
                            {sizeCheck ? (
                                <Button
                                    size={{ base: 'xs', lg: 'sm' }}
                                    leftIcon={<ProfileNotificationAtributeSave />}
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
                                    icon={<ProfileNotificationAtributeSave />}
                                    border='1px solid rgba(0, 0, 0, 0.48)'
                                    variant='outline'
                                />
                            )}

                            <Button
                                size={{ base: 'xs', lg: 'sm' }}
                                bg='black'
                                color='white'
                                p='6px 12px 6px 10px'
                            >
                                Готовить
                            </Button>
                        </Flex>
                    </CardBody>

                    {/* Тег категории */}
                    <Tag
                        position='absolute'
                        top={{ base: '8px', lg: '20px' }}
                        left={{ base: '8px', lg: '370px' }}
                        p={{ base: '2px 4px', lg: '2px 8px' }}
                        bg='rgba(255, 255, 211, 1)'
                        gap={{ base: '2px', lg: '8px' }}
                    >
                        <Image
                            h='16px'
                            w='16px'
                            src={`/src/assets/menuIco/${categor?.ico}`}
                            alt={categor?.tag}
                        />
                        <Text fontSize='14' fontWeight='400' lineHeight='20px' whiteSpace='nowrap'>
                            {categor?.tag}
                        </Text>
                    </Tag>

                    {/* Рекомендация пользователя */}
                    {recipe.userRecommendation && (
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
                    )}
                </Card>
            );

        case 'column':
            return (
                <Card
                    direction='column'
                    mb='3px'
                    variant='outline'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    w={{ base: '158px', lg: '279px', '2xl': '324px' }}
                    boxSizing='border-box'
                    position='relative'
                    flexShrink={0}
                    _hover={{
                        boxShadow:
                            '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                    }}
                >
                    <Image
                        objectFit='cover'
                        w='100%'
                        h={{ base: '128px', lg: '230px' }}
                        src={recipe.ico}
                        alt={recipe.title}
                    />

                    <Stack>
                        <CardBody
                            p={{
                                base: '7px 8px 4px 8px',
                                lg: '12px',
                                '2xl': '16px 25px 19px 24px',
                            }}
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
                                {recipe.subtitle}
                            </Text>

                            <Flex
                                h='24px'
                                gap={{ base: '8px', lg: '10px' }}
                                justify={{ base: 'flex-start', lg: 'flex-end' }}
                            >
                                {recipe.save > 0 && (
                                    <ProfileNotificationAtribute
                                        Ico={ProfileNotificationAtributeSave}
                                        title={recipe.save.toString()}
                                        type='Card'
                                    />
                                )}
                                {recipe.like > 0 && (
                                    <ProfileNotificationAtribute
                                        Ico={ProfileNotificationAtributeLike}
                                        title={recipe.like.toString()}
                                        type='Card'
                                    />
                                )}
                            </Flex>
                        </CardBody>
                    </Stack>

                    <Tag
                        position='absolute'
                        top={{ base: '8px', lg: 'auto' }}
                        bottom={{ base: 'auto', lg: '12px', '2xl': '19px' }}
                        left={{ base: '8px', lg: '12px', '2xl': '24px' }}
                        p={{ base: '2px 4px', lg: '2px 8px' }}
                        bg='rgba(215, 255, 148, 1)'
                        gap={{ base: '2px', lg: '8px' }}
                    >
                        <Image
                            h='16px'
                            w='16px'
                            src={`/src/assets/menuIco/${categor?.ico}`}
                            alt={categor?.tag}
                        />
                        <Text fontSize='14' fontWeight='400' lineHeight='20px' whiteSpace='nowrap'>
                            {categor?.tag}
                        </Text>
                    </Tag>
                </Card>
            );
    }
});
