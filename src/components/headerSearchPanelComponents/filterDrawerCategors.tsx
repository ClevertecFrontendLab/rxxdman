import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    FormControl,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC, useEffect, useRef, useState } from 'react';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { Categories } from '~/api/types/category';
import { DRAWER_CATEGOR_TITLE } from '~/constants/drawer';

type FilterDrawerCategorsProps = {
    selectedCategor: string[];
    setSelectedCategor: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterDrawerCategors: FC<FilterDrawerCategorsProps> = ({
    selectedCategor,
    setSelectedCategor,
}) => {
    const [index, setIndex] = useState(-1);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIndex(-1);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);

    const toggleCheckbox = (categor: string) => {
        setSelectedCategor((prev) =>
            prev.includes(categor) ? prev.filter((item) => item !== categor) : [...prev, categor],
        );
    };

    const { data: categories } = useGetCategoriesQuery();
    const categorsArray = [...(categories as Categories)].filter(
        (categor) => categor.subCategories,
    );

    return (
        <Accordion
            ref={ref}
            index={index}
            onChange={(i) => setIndex(Number(i))}
            size='md'
            h='40px'
            w='100%'
            zIndex={10}
            allowToggle
        >
            <AccordionItem
                outline='none'
                border='none'
                borderRadius='md'
                w='100%'
                position='relative'
                zIndex={10}
            >
                <AccordionButton
                    data-test-id='filter-menu-button-категория'
                    bg='white'
                    minH='40px'
                    p='8px 12px 8px 16px'
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    _expanded={{ outline: '1px solid #f7fee7' }}
                    _hover={{ border: '1px solid rgba(196, 255, 97, 1)' }}
                    _focus={{
                        border: '1px solid rgba(196, 255, 97, 1)',
                        outline: 'none',
                        boxShadow: 'none',
                    }}
                    justifyContent='space-between'
                    flexWrap='wrap'
                    position='relative'
                >
                    <Text
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='24px'
                        letterSpacing='0'
                        color='blackAlpha.700'
                    >
                        {DRAWER_CATEGOR_TITLE}
                    </Text>
                    <AccordionIcon ml={2} />
                </AccordionButton>

                <AccordionPanel
                    top='100%'
                    mt='4px'
                    w='full'
                    bg='white'
                    borderRadius='md'
                    boxShadow='md'
                    border='1px solid #d9f99d'
                    p='4px 0'
                    zIndex={10}
                >
                    <FormControl>
                        <VStack spacing={0} align='stretch'>
                            {categorsArray.map((categor, index) => (
                                <Box
                                    key={categor._id}
                                    p='6px 16px'
                                    bg={index % 2 === 1 ? 'white' : 'blackAlpha.100'}
                                    _hover={{ bg: 'gray.100' }}
                                    fontSize='14px'
                                    fontWeight='400'
                                    lineHeight='20px'
                                    textAlign='left'
                                >
                                    <Checkbox
                                        data-test-id={`checkbox-${categor.title.toLowerCase()}`}
                                        id={'select-' + categor.category}
                                        isChecked={selectedCategor.includes(categor.category)}
                                        onChange={() => toggleCheckbox(categor.category)}
                                        variant='limeCheckbox'
                                        size='sm'
                                        borderColor='rgba(215, 255, 148, 1)'
                                    >
                                        {categor.title}
                                    </Checkbox>
                                </Box>
                            ))}
                        </VStack>
                    </FormControl>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
