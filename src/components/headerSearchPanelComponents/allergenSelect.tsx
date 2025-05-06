import { AddIcon } from '@chakra-ui/icons';
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    Switch,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

import { searchType } from '~/data/useParams';

const allergensList = [
    'Молочные продукты',
    'Яйцо',
    'Рыба',
    'Моллюски',
    'Орехи',
    'Томат (помидор)',
    'Цитрусовые',
    'Клубника (ягоды)',
    'Шоколад',
];

interface IAllergenSelectProps {
    setParams(text: string, searchType: searchType): void;
    allergensSearch: string;
    isOpen?: boolean;
    stateFullClear: boolean;

    setDrawerData?: React.Dispatch<React.SetStateAction<string[]>>;

    allergenSynchronData?: string[];

    //Для изменения логики поведения срабатывания поиска аллергенов
    setIsAllergen?: React.Dispatch<React.SetStateAction<boolean>>; //Отслеживает кол-во аллергенов  включает кнопку
    setSelectedAllergensLocal?: React.Dispatch<React.SetStateAction<string[]>>;
}

export const AllergenSelect: React.FC<IAllergenSelectProps> = ({
    allergensSearch,
    setParams,
    isOpen = false,
    stateFullClear,
    setDrawerData,
    allergenSynchronData,
    setIsAllergen,
    setSelectedAllergensLocal,
}) => {
    const [indexAcc, setIndex] = useState(-1);
    const ref = useRef<HTMLDivElement | null>(null);

    const [selectedAllergens, setSelectedAllergens] = useState<string[]>(
        allergensSearch
            .split(',')
            .map((allergen) => allergen.trim())
            .filter(Boolean) || [],
    );
    const [isChecked, setIschecked] = useState(true);
    const [otherAllergen, setOtherAllergen] = useState('');

    useEffect(() => {
        if (setIsAllergen)
            if (selectedAllergens.length > 0) setIsAllergen(true);
            else setIsAllergen(false);
    }, [selectedAllergens.length, setIsAllergen]);

    useEffect(() => {
        if (allergenSynchronData) {
            setSelectedAllergens(allergenSynchronData);
        }
    }, [allergenSynchronData]);

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

    useEffect(() => {
        setDrawerData && setDrawerData(selectedAllergens);
    }, [selectedAllergens, setDrawerData]);

    const toggleCheckbox = (allergen: string) => {
        setSelectedAllergens((prev) => {
            const newSelected = prev.includes(allergen)
                ? prev.filter((item) => item !== allergen)
                : [...prev, allergen];
            return newSelected;
        });

        setDrawerData &&
            setDrawerData((prev) => {
                const newSelected = prev.includes(allergen)
                    ? prev.filter((item) => item !== allergen)
                    : [...prev, allergen];
                return newSelected;
            });
    };

    const addOtherAllergen = () => {
        const trimmed = otherAllergen.trim();
        if (trimmed && !selectedAllergens.includes(trimmed)) {
            setSelectedAllergens((prev) => {
                const newSelected = [...prev, trimmed];
                return newSelected;
            });

            setDrawerData &&
                setDrawerData((prev) => {
                    const newSelected = [...prev, trimmed];
                    return newSelected;
                });

            setOtherAllergen('');
        }
    };

    const removeAllergen = (allergen: string) => {
        setSelectedAllergens((prev) => {
            const newSelected = prev.filter((item) => item !== allergen);
            return newSelected;
        });
    };

    const onChange = (): void => {
        setIschecked(!isChecked);

        if (!isOpen && allergensSearch.length > 0) {
            setSelectedAllergens(selectedAllergens);
        }
    };

    //Полная очистка аллергенов и выключение аллергенов
    useEffect(() => {
        if (stateFullClear) {
            setSelectedAllergens([]);
            setIschecked(false);
        }
    }, [stateFullClear]);

    //Включение аллергенов из поисковой строки
    useEffect(() => {
        if (allergensSearch.length > 0) setIschecked(true);
        else {
            setIschecked(false);
        }
    }, [allergensSearch.length]);

    //Удаление аллергенов, если выключить чек
    useEffect(() => {
        if (!isChecked) setSelectedAllergens([]);
    }, [isChecked]);

    //Фильтр аллергенов из шапки (срабатывает сразу-же при изменении)
    useEffect(() => {
        if (setSelectedAllergensLocal) {
            // if (selectedAllergens.length > 0) {
            //     setParams(selectedAllergens.join(','), 'allergens');
            // } else {
            //     setParams('', 'allergens');
            // }
            if (selectedAllergens.length > 0) {
                setSelectedAllergensLocal(selectedAllergens);
            } else {
                setSelectedAllergensLocal([]);
                setParams('', 'allergens');
            }
        }
    }, [isOpen, selectedAllergens, setParams, setSelectedAllergensLocal]);

    return (
        <Stack
            align={isOpen ? 'stretch' : 'center'}
            justify='center'
            gap='16px'
            direction='row'
            // mt='8px' //убрать ТЕСТ
            display={{ base: isOpen ? 'flex' : 'none', lg: 'flex' }} //Поменять на lg
            flexDirection={isOpen ? 'column' : 'row'}
        >
            <Stack align='center' gap='12px' direction='row'>
                <FormLabel
                    pl='8px'
                    htmlFor='switchAllergen'
                    fontWeight='500'
                    fontSize='16px'
                    lineHeight='24px'
                    letterSpacing='.0'
                    m='0'
                >
                    {isOpen ? 'Исключить аллергены' : 'Исключить мои аллергены'}
                </FormLabel>

                <Switch
                    data-test-id={
                        setDrawerData ? 'allergens-switcher-filter' : 'allergens-switcher'
                    }
                    id='switchAllergen'
                    onChange={onChange}
                    isChecked={isChecked}
                    size='md'
                    sx={{
                        'input:checked + span.chakra-switch__track': {
                            bg: 'rgba(177, 255, 46, 1)',
                        },
                    }}
                />
            </Stack>

            <Accordion
                ref={ref}
                index={indexAcc}
                zIndex={10}
                onChange={(i) => setIndex(Number(i))}
                size='md'
                h='40px'
                allowToggle
            >
                <AccordionItem
                    position='relative'
                    outline='1px solid rgba(0, 0, 0, 0.08)'
                    border='none'
                    borderRadius='md'
                    w={isOpen ? '100%' : '234px'}
                    isDisabled={!isChecked}
                    zIndex={10}
                >
                    <AccordionButton
                        data-test-id={
                            setDrawerData ? 'allergens-menu-button-filter' : 'allergens-menu-button'
                        }
                        bg='white'
                        minH='40px'
                        p='8px 12px 8px 16px'
                        border='1px solid blackAlpha.200'
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
                        <Box
                            maxW={isOpen ? '100%' : '178px'}
                            display='flex'
                            flex='1'
                            textAlign='left'
                        >
                            {selectedAllergens.length > 0 ? (
                                <HStack flexShrink={1} spacing='8px' wrap='wrap'>
                                    {selectedAllergens.map((item) =>
                                        !isOpen ? (
                                            <Tag
                                                size='sm'
                                                h='20px'
                                                key={item}
                                                p='2px 8px'
                                                bg='transparent'
                                                border='1px solid rgba(177, 255, 46, 1)'
                                                color='rgba(177, 255, 46, 1)'
                                            >
                                                <TagLabel
                                                    fontSize='12px'
                                                    fontWeight='500'
                                                    lineHeight='16px'
                                                    color='rgba(45, 177, 0, 1)'
                                                >
                                                    {item}
                                                </TagLabel>
                                                <TagCloseButton
                                                    h='20px'
                                                    w='10px'
                                                    color='rgba(45, 177, 0, 1)'
                                                    border='none'
                                                    _hover={{ border: 'none', color: 'red' }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeAllergen(item);
                                                    }}
                                                />
                                            </Tag>
                                        ) : (
                                            <Text
                                                data-test-id='filter-tag'
                                                fontWeight='400'
                                                fontSize='16px'
                                                lineHeight='24px'
                                                letterSpacing='0'
                                                color='blackAlpha.700'
                                            >
                                                {item}
                                            </Text>
                                        ),
                                    )}
                                </HStack>
                            ) : (
                                <Text
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='24px'
                                    letterSpacing='0'
                                    color='blackAlpha.700'
                                    whiteSpace='nowrap'
                                >
                                    {isOpen
                                        ? 'Выберите из списка аллергенов'
                                        : 'Выберите из списка...'}
                                </Text>
                            )}
                        </Box>
                        <AccordionIcon ml={2} />
                    </AccordionButton>

                    <AccordionPanel
                        zIndex={10}
                        h='fit-content'
                        w='100%'
                        data-test-id='allergens-menu'
                        // position='absolute'
                        top='100%'
                        mt='4px'
                        bg='white'
                        borderRadius='md'
                        boxShadow='md'
                        border='1px solid #d9f99d'
                        p='4px 0'
                    >
                        <FormControl>
                            <VStack spacing={0} align='stretch'>
                                {allergensList.map((allergen, index) => (
                                    <Box
                                        key={allergen}
                                        p='6px 16px'
                                        bg={index % 2 === 1 ? 'white' : 'blackAlpha.100'}
                                        _hover={{ bg: 'gray.100' }}
                                        fontSize='14px'
                                        fontWeight='400'
                                        lineHeight='20px'
                                        textAlign='left'
                                    >
                                        <Checkbox
                                            data-test-id={indexAcc != -1 ? `allergen-${index}` : ''}
                                            id={index.toString()}
                                            isChecked={selectedAllergens.includes(allergen)}
                                            onChange={() => toggleCheckbox(allergen)}
                                            size='sm'
                                            borderColor='rgba(215, 255, 148, 1)'
                                            variant='limeCheckbox'
                                        >
                                            {allergen}
                                        </Checkbox>
                                    </Box>
                                ))}
                                <HStack p='8px 8px 8px 24px' justify='center'>
                                    <Input
                                        data-test-id={indexAcc != -1 ? 'add-other-allergen' : ''}
                                        fontWeight='400'
                                        fontSize='14px'
                                        lineHeight='20px'
                                        placeholder='Другой аллерген'
                                        value={otherAllergen}
                                        onChange={(e) => setOtherAllergen(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addOtherAllergen();
                                            }
                                        }}
                                        size='sm'
                                        _placeholder={{ color: 'rgba(19, 75, 0, 1)' }}
                                        // mr='12px'
                                    />

                                    <AddIcon
                                        data-test-id={setDrawerData ? 'add-allergen-button' : ''}
                                        onClick={addOtherAllergen}
                                        boxSize={3}
                                        bg='rgba(45, 177, 0, 1)'
                                        color='white'
                                        borderRadius='999px'
                                        p='2px'
                                        _hover={{ cursor: 'pointer' }}
                                    />
                                </HStack>
                            </VStack>
                        </FormControl>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Stack>
    );
};
