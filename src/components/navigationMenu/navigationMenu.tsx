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
import React, { FC, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';

import { categorListData } from '~/data/categor';

export const NavigationMenu: FC = React.memo(() => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);
    const [index, setIndex] = React.useState(-1);
    const categor = categorListData.find((categor) => categor.link === pathnames[0]);

    useEffect(() => {
        if (pathnames.length > 1) {
            setIndex(Number(categor?.id));
        } else {
            setIndex(-1);
        }
    }, [categor?.id, pathnames]);

    return (
        <Accordion index={[index]} w='100%' h='100%' overflow='hidden'>
            {categorListData.map((categor) => (
                <AccordionItem border='none' key={categor.link}>
                    <NavLink
                        to={`/${categor.link}/${categor.subCategor[0].link}`}
                        data-test-id={categor.link === 'vegan' ? 'vegan-cuisine' : categor.link}
                    >
                        <AccordionButton
                            bg={pathnames[0] === categor.link ? 'rgba(234, 255, 199, 1)' : ''}
                            h='48px'
                            w={{ base: '100%', lg: '230px' }}
                            gap='12px'
                            p='12px 8px'
                            borderRadius='0'
                            border='none'
                            _hover={{ bg: 'rgba(255, 255, 211, 1)' }}
                            _focus={{
                                bg:
                                    pathnames[pathnames.length - 2] === categor.link
                                        ? ''
                                        : 'rgba(255, 255, 211, 1)',
                                outline: 'none',
                                boxShadow: 'none',
                            }}
                        >
                            <Image src={`/src/assets/menuIco/${categor.ico}`} alt={categor.title} />
                            <Text
                                fontSize='16px'
                                fontWeight={
                                    pathnames[pathnames.length - 2] === categor.link ? '700' : '500'
                                }
                                lineHeight='24px'
                                color='black'
                                whiteSpace='nowrap'
                                mr='auto'
                            >
                                {categor.shortTitle ? categor.shortTitle : categor.title}
                            </Text>
                            <AccordionIcon boxSize={4} />
                        </AccordionButton>
                    </NavLink>

                    <AccordionPanel>
                        <VStack alignItems='start' gap={0}>
                            {categor.subCategor.map((subcategory) => (
                                <Link
                                    key={subcategory.link}
                                    to={`/${categor.link}/${subcategory.link}`}
                                    data-test-id={
                                        subcategory.link === pathnames[1]
                                            ? `${subcategory.link}-active`
                                            : `${subcategory.link}`
                                    }
                                >
                                    <Box
                                        m='0'
                                        p='6px 8px 6px 52px'
                                        style={{ cursor: 'pointer' }}
                                        _hover={{ bg: '#ffffd3;' }}
                                        h='34.5px'
                                        display='flex'
                                    >
                                        <span
                                            style={{
                                                fontWeight:
                                                    subcategory.link === pathnames[1] ? 700 : 500,
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
                                                    subcategory.link === pathnames[1]
                                                        ? '-19px'
                                                        : '-12px'
                                                }
                                                src={
                                                    subcategory.link === pathnames[1]
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
