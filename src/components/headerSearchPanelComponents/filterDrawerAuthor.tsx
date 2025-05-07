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

import { COUNT_AUTHORS, DRAWER_AUTHORS_TITLE, NEW_AUTHORS_SEARCH } from '~/constants/drawer';
import { users } from '~/mock/usersMock';

type FilterDrawerAuthorProps = {
    selectedAuthor: string[];
    setSelectedAuthor: React.Dispatch<React.SetStateAction<string[]>>;
};

export const FilterDrawerAuthor: FC<FilterDrawerAuthorProps> = ({
    selectedAuthor,
    setSelectedAuthor,
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

    const toggleCheckbox = (author: string) => {
        setSelectedAuthor((prev) =>
            prev.includes(author) ? prev.filter((item) => item !== author) : [...prev, author],
        );
    };

    return (
        <Accordion
            ref={ref}
            index={index}
            onChange={(i) => setIndex(Number(i))}
            size='md'
            h='40px'
            w='100%'
            zIndex={9}
            allowToggle
        >
            <AccordionItem
                position='relative'
                outline='none'
                border='none'
                borderRadius='md'
                w='100%'
                zIndex={9}
            >
                <AccordionButton
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
                >
                    <Text
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='24px'
                        letterSpacing='0'
                        color='blackAlpha.700'
                    >
                        {DRAWER_AUTHORS_TITLE}
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
                    zIndex={9}
                >
                    <FormControl>
                        <VStack spacing={0} align='stretch'>
                            {users.slice(0, COUNT_AUTHORS).map((author, index) => (
                                <Box
                                    key={author.id}
                                    p='6px 16px'
                                    bg={index % 2 === 1 ? 'white' : 'blackAlpha.100'}
                                    _hover={{ bg: 'gray.100' }}
                                    fontSize='14px'
                                    fontWeight='400'
                                    lineHeight='20px'
                                    textAlign='left'
                                >
                                    <Checkbox
                                        id={'select-user:' + author.id}
                                        isChecked={selectedAuthor.includes(author.id)}
                                        onChange={() => toggleCheckbox(author.id)}
                                        variant='limeCheckbox'
                                        size='sm'
                                        borderColor='rgba(215, 255, 148, 1)'
                                    >
                                        {author.name + ' ' + author.surname}
                                    </Checkbox>
                                </Box>
                            ))}

                            <Box
                                key={COUNT_AUTHORS + 1}
                                p='6px 16px'
                                bg={COUNT_AUTHORS + (1 % 2) === 1 ? 'white' : 'blackAlpha.100'}
                                _hover={{ bg: 'gray.100' }}
                                fontSize='14px'
                                fontWeight='400'
                                lineHeight='20px'
                                textAlign='left'
                            >
                                <Checkbox
                                    id={(COUNT_AUTHORS + 1).toString()}
                                    isChecked={selectedAuthor.includes(NEW_AUTHORS_SEARCH)}
                                    onChange={() => toggleCheckbox(NEW_AUTHORS_SEARCH)}
                                    colorScheme='green'
                                    size='sm'
                                    borderColor='rgba(215, 255, 148, 1)'
                                >
                                    {NEW_AUTHORS_SEARCH}
                                </Checkbox>
                            </Box>
                        </VStack>
                    </FormControl>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
