import { Button, Card, CardBody, Flex, Image, Tag, Text } from '@chakra-ui/react';
import { FC } from 'react';

import {
    ProfileNotificationAtributeLike,
    ProfileNotificationAtributeSave,
} from '~/assets/createSvg';
import { categorListData } from '~/data/categor';
import { recipe } from '~/data/recipes';

import { ProfileNotificationAtribute } from '../profileNotificationAtribute/profileNotificationAtribute';

type direct = 'row' | 'column';

interface IRecipeCardProps {
    direct: direct;
    recipe: recipe;
}

export const RelevantKitchenCard: FC<IRecipeCardProps> = ({ direct, recipe }) => {
    const categorSubCategor = recipe.categor.split('__');

    const categor = categorListData.find((categor) => categor.link === categorSubCategor[0]); //Объект

    const subCategor = categor?.subCategor[Number(categorSubCategor[1])].title; //Название подкатегории

    const ico =
        categorListData.find((categor) => categor.title === subCategor)?.ico || categor?.ico;

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
                            src={`/src/assets/menuIco/${ico}`}
                            alt={categor?.tag}
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
                        boxShadow:
                            '0px 2px 4px -1px rgba(32, 126, 0, 0.06), 0px 4px 6px -1px rgba(32, 126, 0, 0.1)',
                    }}
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
                            {recipe.subtitle}
                        </Text>

                        <Flex
                            zIndex='1'
                            h='24px'
                            gap={{ base: '8px', lg: '10px' }}
                            justify='flex-end'
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
                            src={`/src/assets/menuIco/${ico}`}
                            alt={categor?.tag}
                        />
                        <Text fontSize='14' fontWeight='400' lineHeight='20px' whiteSpace='nowrap'>
                            {categor?.subCategor[Number(categorSubCategor[1])].title}
                        </Text>
                    </Tag>
                </Card>
            );
    }
};
