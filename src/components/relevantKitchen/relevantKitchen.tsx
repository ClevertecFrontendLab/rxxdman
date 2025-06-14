import { Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { RECIPES_RELEVANT_KITCHEN_LIMIT } from '~/api/constants/apiConstant';
import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { useGetRecipeFromCategorQuery } from '~/api/query/recipeQuery';
import { Category, SubCategory } from '~/api/types/category';
import { ERROR_DESCRIPTION, ERROR_TITLE } from '~/constants/errorAlert';

import { AllertApp } from '../alertApp/alertApp';
import { RelevantKitchenCard } from './relevantKitchenCard';

export const RelevantKitchen: FC = () => {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    const location = useLocation();

    const [categor, setCategor] = useState<Category>();
    const [subCategor, setSubCategor] = useState<SubCategory>();

    const [path, setPath] = useState(location.pathname.split('/').filter(Boolean)[0]);
    const [refetchRelevant, setRefetchRelevant] = useState(true);

    useEffect(() => {
        if (location.pathname.split('/').filter(Boolean)[0] != path) {
            setPath(location.pathname.split('/').filter(Boolean)[0]);
            setRefetchRelevant(true);
        }
    }, [location.pathname, path]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const subCategories = Array.isArray(categories)
        ? categories.filter((subcategor) => subcategor.rootCategoryId)
        : [];

    useEffect(() => {
        if (categories && refetchRelevant && subCategories) {
            const random = Math.floor(Math.random() * (subCategories.length - 0) + 0);
            setSubCategor(subCategories[random] as SubCategory);
            const category = Array.isArray(categories)
                ? (categories.find(
                      (categor) => categor._id === subCategories[random].rootCategoryId,
                  ) as Category)
                : undefined;
            setCategor(category);
            setRefetchRelevant(false);
        }
    }, [categories, refetchRelevant, subCategories]);

    const { data: categorData, error } = useGetRecipeFromCategorQuery(
        {
            idCategor: subCategor?._id || '',
            params: {
                limit: RECIPES_RELEVANT_KITCHEN_LIMIT,
            },
        },
        {
            skip: !subCategor || isLoading,
        },
    );

    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (error) onOpen();
    }, [error, onOpen]);

    return (
        <Box borderTop='1px solid rgba(0, 0, 0, 0.08)'>
            {isOpen && (
                <AllertApp title={ERROR_TITLE} message={ERROR_DESCRIPTION} onClose={onClose} />
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

            {categorData?.data.length && (
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
                        {categorData?.data[0] && (
                            <RelevantKitchenCard direct='column' recipe={categorData.data[0]} />
                        )}

                        {categorData?.data[1] && (
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
                        {categorData?.data[2] && (
                            <RelevantKitchenCard direct='row' recipe={categorData.data[2]} />
                        )}
                        {categorData?.data[3] && (
                            <RelevantKitchenCard direct='row' recipe={categorData.data[3]} />
                        )}
                        {categorData?.data[4] && (
                            <RelevantKitchenCard direct='row' recipe={categorData.data[4]} />
                        )}
                    </Flex>
                </Flex>
            )}
        </Box>
    );
};
