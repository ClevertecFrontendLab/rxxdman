import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Checkbox,
    Flex,
    FormControl,
    HStack,
    Tag,
    TagLabel,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { FieldErrors, FieldValues, UseFormClearErrors, UseFormRegister } from 'react-hook-form';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { SubCategories } from '~/api/types/category';
import { INPUTS } from '~/constants/recipes';
import { useSelectTags } from '~/hooks/useSelectTags';

type Props = {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
    clearErrors: UseFormClearErrors<FieldValues>;

    selectedTags: SubCategories;
    setSelectedTags: React.Dispatch<React.SetStateAction<SubCategories>>;
};

export const SelectTags: FC<Props> = ({
    selectedTags,
    setSelectedTags,
    register,
    errors,
    clearErrors,
}) => {
    const { data: categories } = useGetCategoriesQuery();

    const { tagsList, toggleCheckbox, visibleTags, hiddenTagsCount, containerRef } = useSelectTags(
        selectedTags,
        setSelectedTags,
    );

    useEffect(() => {
        if (errors.tags) clearErrors('tags');

        register('tags', {
            validate: () => selectedTags.length >= 3 || 'Выберите минимум 3 тега',
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register, selectedTags]);

    return (
        <Flex justify='space-between' align='center' gap={{ base: '16px', lg: '24px' }}>
            <Text
                fontWeight='600'
                fontSize={{ base: '14px', lg: '16px' }}
                lineHeight={{ base: '20px', lg: '24px' }}
                textAlign='left'
            >
                {INPUTS.TAGS_TITLE}
            </Text>

            <Accordion
                size='md'
                h='40px'
                allowToggle
                w={{ base: '196px', sm: '232px', lg: '350px' }}
                zIndex='10'
            >
                <AccordionItem position='relative' borderRadius='md'>
                    <AccordionButton
                        bg='white'
                        minH='40px'
                        p='8px 12px 8px 16px'
                        outline='none'
                        border={!errors.tags ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid red'}
                        _expanded={{ outline: '1px solid #f7fee7' }}
                        _hover={{
                            border: !errors.tags
                                ? '1px solid rgba(196, 255, 97, 1)'
                                : '1px solid red',
                        }}
                        _focus={{
                            border: !errors.tags
                                ? '1px solid rgba(196, 255, 97, 1)'
                                : '1px solid red',
                            outline: 'none',
                            boxShadow: 'none',
                        }}
                        justifyContent='space-between'
                        position='relative'
                        overflow='hidden'
                    >
                        <Box display='flex' flex='1' textAlign='left' overflow='hidden' w='100%'>
                            {selectedTags.length > 0 ? (
                                <HStack
                                    flexShrink={0}
                                    spacing='8px'
                                    w={{ base: '138px', sm: '174px', lg: '292px' }}
                                    overflow='hidden'
                                    wrap='nowrap'
                                    ref={containerRef}
                                >
                                    {visibleTags.map((item) => (
                                        <Tag
                                            size='sm'
                                            h='20px'
                                            key={item._id}
                                            p='2px 8px'
                                            bg='transparent'
                                            border='1px solid rgba(177, 255, 46, 1)'
                                            color='rgba(177, 255, 46, 1)'
                                            flexShrink={0}
                                            w='fit-content'
                                        >
                                            <TagLabel
                                                fontSize='12px'
                                                fontWeight='500'
                                                lineHeight='16px'
                                                color='rgba(45, 177, 0, 1)'
                                            >
                                                {categories &&
                                                    [...categories].find(
                                                        (cat) => cat._id === item.rootCategoryId,
                                                    )?.title}
                                            </TagLabel>
                                        </Tag>
                                    ))}
                                    {hiddenTagsCount > 0 && (
                                        <Tag
                                            size='sm'
                                            h='20px'
                                            p='2px 8px'
                                            bg='transparent'
                                            border='1px solid rgba(177, 255, 46, 1)'
                                            color='rgba(177, 255, 46, 1)'
                                        >
                                            <TagLabel
                                                fontSize='12px'
                                                fontWeight='500'
                                                lineHeight='16px'
                                                color='rgba(45,177,0,1)'
                                            >
                                                +{hiddenTagsCount}
                                            </TagLabel>
                                        </Tag>
                                    )}
                                </HStack>
                            ) : (
                                <Text
                                    fontWeight='400'
                                    fontSize='16px'
                                    lineHeight='24px'
                                    letterSpacing={0}
                                    color='blackAlpha.700'
                                    whiteSpace='nowrap'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                >
                                    {INPUTS.TAGS_PLACEHOLDER}
                                </Text>
                            )}
                        </Box>
                        <AccordionIcon ml={2} />
                    </AccordionButton>

                    <AccordionPanel
                        h='100%'
                        maxH='424px'
                        w='100%'
                        top='100%'
                        mt='4px'
                        bg='white'
                        borderRadius='md'
                        boxShadow='md'
                        border='1px solid #d9f99d'
                        p='4px 0'
                        overflowY='auto'
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'blackAlpha.300',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '8px',
                                height: '16px',
                            },
                        }}
                        zIndex='10'
                    >
                        <FormControl zIndex='10'>
                            <VStack spacing={0} align='stretch'>
                                {tagsList.map((subCategory, index) => (
                                    <Box
                                        key={subCategory._id}
                                        p='6px 16px'
                                        bg={index % 2 === 1 ? 'white' : 'blackAlpha.100'}
                                        _hover={{ bg: 'gray.100' }}
                                        fontSize='14px'
                                        fontWeight='400'
                                        lineHeight='20px'
                                        textAlign='left'
                                    >
                                        <Checkbox
                                            id={subCategory._id}
                                            isChecked={selectedTags.includes(subCategory)}
                                            onChange={() => toggleCheckbox(subCategory)}
                                            size='sm'
                                            borderColor='rgba(215,255,148,.5)'
                                            variant='limeCheckbox'
                                        >
                                            {subCategory.title}
                                        </Checkbox>
                                    </Box>
                                ))}
                            </VStack>
                        </FormControl>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
};
