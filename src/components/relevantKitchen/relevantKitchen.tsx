import { Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { category, subCategory, useGetCategoriesQuery } from '~/API/categorsApi';
import { useGetRecipeCategorQuery } from '~/API/recipeApi';

import { ErrorAllert } from '../errorAlert/errorAllert';
import { RelevantKitchenCard } from './relevantKitchenCard';

export const RelevantKitchen: FC = () => {
    const { data: categories } = useGetCategoriesQuery(); //Все категории
    const location = useLocation();

    const [categor, setCategor] = useState<category>(); //Категория
    const [subCategor, setSubCategor] = useState<subCategory>(); //ПодКатегория

    const [path, setPath] = useState(location.pathname.split('/').filter(Boolean)[0]);
    const [refetchRelevant, setRefetchRelevant] = useState(true);

    //Логика работы смены рекомендации
    useEffect(() => {
        if (location.pathname.split('/').filter(Boolean)[0] != path) {
            setPath(location.pathname.split('/').filter(Boolean)[0]);
            setRefetchRelevant(true);
        }
    }, [location.pathname, path]);

    const subCategies =
        categories && [...categories].filter((subcategor) => subcategor.rootCategoryId);

    useEffect(() => {
        if (categories) {
            if (refetchRelevant && subCategies) {
                const random = Math.floor(Math.random() * (subCategies.length - 0) + 0);
                setSubCategor(subCategies[random] as subCategory);
                const categor = categories.find(
                    (categor) => categor._id === subCategies[random].rootCategoryId,
                ) as category;
                setCategor(categor);
                setRefetchRelevant(false);
            }
        }
    }, [categories, refetchRelevant, subCategies]);

    //Фильтруем рецепты по их категориям

    const { data: categorData, error } = useGetRecipeCategorQuery(
        {
            idCategor: subCategor?._id || '',
            params: {
                limit: 5,
            },
        },
        {
            skip: !subCategor,
        },
    );

    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (error) onOpen();
    }, [error, onOpen]);

    return (
        <Box borderTop='1px solid rgba(0, 0, 0, 0.08)'>
            {isOpen && (
                <ErrorAllert
                    title='Ошибка сервера'
                    message='Попробуйте поискать снова попозже'
                    onClose={onClose}
                />
            )}

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
                    {categor?.description}
                </Text>
            </Flex>

            {categorData && categorData.data.length > 0 && (
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
                        {categorData.data[0] && (
                            <RelevantKitchenCard direct='column' recipe={categorData.data[0]} />
                        )}

                        {categorData.data[1] && (
                            <RelevantKitchenCard direct='column' recipe={categorData.data[1]} />
                        )}
                    </Flex>

                    <Flex
                        flexBasis={{ base: '100%', md: '33.5%', lg: '33%', '2xl': '50%' }}
                        overflow='hidden'
                        direction='column'
                        flexGrow={0}
                        flexShrink={1}
                        gap={{ base: '12px', md: '6px', lg: '12px' }}
                    >
                        {categorData.data[2] && (
                            <RelevantKitchenCard direct='row' recipe={categorData.data[2]} />
                        )}
                        {categorData.data[3] && (
                            <RelevantKitchenCard direct='row' recipe={categorData.data[3]} />
                        )}
                        {categorData.data[4] && (
                            <RelevantKitchenCard direct='row' recipe={categorData.data[4]} />
                        )}
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};
