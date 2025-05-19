import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { IMAGE_API_URL } from '~/api/constants/apiConstant';
import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { Categories } from '~/api/types/category';
import { CategoriesResponse } from '~/api/types/responce';

export const NavigationMenu: FC = React.memo(() => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);
    const [index, setIndex] = React.useState(-1);

    const { data: categories, error, isLoading } = useGetCategoriesQuery();

    const [categoriesData, setCategoriesData] = useState<CategoriesResponse | null>(null);

    useEffect(() => {
        if (categories) {
            setCategoriesData(categories);
            localStorage.setItem('categoriesBackup', JSON.stringify(categories));
        }
    }, [categories]);

    useEffect(() => {
        if (error && !categoriesData) {
            const backup = localStorage.getItem('categoriesBackup');
            if (backup) {
                setCategoriesData(JSON.parse(backup));
            }
        }
    }, [error, categoriesData]);

    const categorsArray = Array.isArray(categories)
        ? [...(categories as Categories)].filter((categor) => categor.subCategories) ||
          [...(categoriesData as Categories)].filter((categor) => categor.subCategories)
        : [];

    const categorIndex = [...categorsArray].findIndex(
        (categor) => categor.category === pathnames[0],
    );

    useEffect(() => {
        if (pathnames.length > 1) {
            setIndex(Number(categorIndex));
        } else {
            setIndex(-1);
        }
    }, [categorIndex, pathnames]);

    return (
        <Accordion index={[index]} w='100%' h='100%'>
            {!isLoading &&
                categorsArray.map((categor) => (
                    <AccordionItem border='none' key={categor._id}>
                        <NavLink
                            to={
                                categor.subCategories
                                    ? `/${categor.category}/${categor.subCategories[0].category} `
                                    : '/'
                            }
                            data-test-id={
                                categor.category === 'vegan' ? 'vegan-cuisine' : categor.category
                            }
                        >
                            <AccordionButton
                                bg={
                                    pathnames[0] === categor.category
                                        ? 'rgba(234, 255, 199, 1)'
                                        : ''
                                }
                                h='48px'
                                w={{ base: '100%', lg: '230px' }}
                                gap='12px'
                                p='12px 8px'
                                borderRadius='0'
                                border='none'
                                _hover={{ bg: 'rgba(255, 255, 211, 1)' }}
                                _focus={{
                                    bg:
                                        pathnames[pathnames.length - 2] === categor.category
                                            ? ''
                                            : 'rgba(255, 255, 211, 1)',
                                    outline: 'none',
                                    boxShadow: 'none',
                                }}
                            >
                                <Image
                                    src={`${IMAGE_API_URL}${categor.icon}`}
                                    alt={categor.title}
                                />
                                <Text
                                    fontSize='16px'
                                    fontWeight={
                                        pathnames[pathnames.length - 2] === categor.category
                                            ? '700'
                                            : '500'
                                    }
                                    lineHeight='24px'
                                    color='black'
                                    whiteSpace='nowrap'
                                    mr='auto'
                                >
                                    {categor.title === 'Домашние заготовки'
                                        ? 'Заготовки'
                                        : categor.title === 'Десерты и выпечка'
                                          ? 'Десерты, выпечка'
                                          : categor.title}
                                </Text>
                                <AccordionIcon boxSize={4} />
                            </AccordionButton>
                        </NavLink>

                        <AccordionPanel>
                            <VStack alignItems='start' gap={0}>
                                {categor.subCategories &&
                                    categor.subCategories.map((subcategory) => (
                                        <Link
                                            key={subcategory.category}
                                            to={`/${categor.category}/${subcategory.category}`}
                                            data-test-id={
                                                subcategory.category === pathnames[1]
                                                    ? `${subcategory.category}-active`
                                                    : `${subcategory.category}`
                                            }
                                            style={{ width: '100%' }}
                                        >
                                            <Box
                                                m='0'
                                                p='6px 0 6px 30px'
                                                style={{ cursor: 'pointer' }}
                                                _hover={{ bg: '#ffffd3;' }}
                                                h='34.5px'
                                                display='flex'
                                                w='100%'
                                            >
                                                <span
                                                    style={{
                                                        fontWeight:
                                                            subcategory.category === pathnames[1]
                                                                ? 700
                                                                : 500,
                                                        fontSize: '16px',
                                                        lineHeight: '150%',
                                                        transition: 'color 0.2s',
                                                        whiteSpace: 'nowrap',
                                                        display: 'flex',
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <Image
                                                        pos='absolute'
                                                        left={
                                                            subcategory.category === pathnames[1]
                                                                ? '-19px'
                                                                : '-12px'
                                                        }
                                                        src={
                                                            subcategory.category === pathnames[1]
                                                                ? '/src/assets/menuIco/checked=true.svg'
                                                                : '/src/assets/menuIco/checked=false.svg'
                                                        }
                                                    />
                                                    {subcategory.title}
                                                </span>
                                            </Box>
                                        </Link>
                                    ))}
                            </VStack>
                        </AccordionPanel>
                    </AccordionItem>
                ))}
        </Accordion>
    );
});
