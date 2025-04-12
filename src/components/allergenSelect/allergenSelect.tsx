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
    HStack,
    IconButton,
    Input,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

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

export const AllergenSelect: React.FC = () => {
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
    const [otherAllergen, setOtherAllergen] = useState('');

    const toggleCheckbox = (allergen: string) => {
        setSelectedAllergens((prev) =>
            prev.includes(allergen)
                ? prev.filter((item) => item !== allergen)
                : [...prev, allergen],
        );
    };

    const addOtherAllergen = () => {
        const trimmed = otherAllergen.trim();
        if (trimmed && !selectedAllergens.includes(trimmed)) {
            setSelectedAllergens((prev) => [...prev, trimmed]);
            setOtherAllergen('');
        }
    };

    const removeAllergen = (allergen: string) => {
        setSelectedAllergens((prev) => prev.filter((item) => item !== allergen));
    };

    return (
        <Accordion zIndex='999' size='md' h='40px' allowToggle>
            <AccordionItem
                position='relative'
                outline='1px solid rgba(0, 0, 0, 0.08)'
                border='none'
                borderRadius='md'
                w='234px'
            >
                <AccordionButton
                    bg='white'
                    h='40px'
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
                    zIndex={1}
                    position='relative'
                    overflow='hidden'
                >
                    <Box maxW='178px' overflow='hidden' display='flex' flex='1' textAlign='left'>
                        {selectedAllergens.length > 0 ? (
                            <HStack flexShrink={1} spacing='8px' wrap='nowrap'>
                                {selectedAllergens.map((item) => (
                                    <Tag
                                        size='sm'
                                        h='20px'
                                        key={item}
                                        p='2px 8px'
                                        variant='outline'
                                        borderColor='rgba(177, 255, 46, 1)'
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
                                            color='rgba(45, 177, 0, 1)'
                                            border='none'
                                            _hover={{ border: 'none', color: 'red' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeAllergen(item);
                                            }}
                                        />
                                    </Tag>
                                ))}
                            </HStack>
                        ) : (
                            <Text
                                fontWeight='400'
                                fontSize='16px'
                                lineHeight='24px'
                                letterSpacing='0'
                                color='blackAlpha.700'
                            >
                                Выберите из списка...
                            </Text>
                        )}
                    </Box>
                    <AccordionIcon ml={2} />
                </AccordionButton>

                <AccordionPanel
                    position='absolute'
                    top='100%'
                    mt='4px'
                    w='full'
                    zIndex={10}
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
                                        id={index.toString()}
                                        isChecked={selectedAllergens.includes(allergen)}
                                        onChange={() => toggleCheckbox(allergen)}
                                        colorScheme='green'
                                        size='sm'
                                        borderColor='rgba(215, 255, 148, 1)'
                                    >
                                        {allergen}
                                    </Checkbox>
                                </Box>
                            ))}
                            <HStack p='8px 8px 8px 24px'>
                                <Input
                                    fontWeight='400'
                                    fontSize='14px'
                                    lineHeight='20px'
                                    placeholder='Другой аллерген'
                                    value={otherAllergen}
                                    onChange={(e) => setOtherAllergen(e.target.value)}
                                    size='sm'
                                    _placeholder={{ color: 'rgba(19, 75, 0, 1)' }}
                                />

                                <IconButton
                                    aria-label='Добавить'
                                    isRound={true}
                                    size='xs'
                                    onClick={addOtherAllergen}
                                    colorScheme='green'
                                    icon={<AddIcon />}
                                />
                            </HStack>
                        </VStack>
                    </FormControl>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
