import { SearchIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Heading,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import { HeaderPageFilterIco } from '~/assets/createSvg';
import { searchType } from '~/data/useParams';

import { AllergenSelect } from './allergenSelect';
import { FilterDrawer } from './filterDrawer';

interface IHeaderPagesProps {
    title: string;
    subtitle?: string;

    searchState: boolean;
    textSearch: string;
    allergensSearch: string;
    categorsSearch: string;
    authorsSearch: string;
    meatSearch: string;
    garnishSearch: string;
    setParams(text: string, textType: searchType): void;
    clearParams(): void;
    stateFullClear: boolean;

    countSearchRecipe: number;
}

export const HeaderPages: FC<IHeaderPagesProps> = ({
    title,
    subtitle,

    searchState,
    textSearch,
    allergensSearch,
    categorsSearch,
    authorsSearch,
    meatSearch,
    garnishSearch,
    setParams,
    clearParams,
    stateFullClear,
    countSearchRecipe,
}) => {
    const [isDisabledSearch, setIsDisabledSearch] = useState(true); //Включение кнопки поиска
    const [errorInputLenght, setErrorInputLenght] = useState(false); //Отслеживание ошибки
    const [headerFocus, setHeaderFocus] = useState(false); //Фокус поиска

    const [localCountRecipe, setLocalCountRecipe] = useState(0);

    const [searchInputText, setSearchInputText] = useState(textSearch);

    useEffect(() => {
        if (stateFullClear) setSearchInputText('');
    }, [stateFullClear]);

    useEffect(() => {
        if (searchInputText.length > 2) {
            setIsDisabledSearch(false);
        } else {
            setIsDisabledSearch(true);
        }

        if (searchInputText.length === 0) {
            setParams('', 'title');
        }
    }, [searchInputText, setParams]);

    useEffect(() => {
        if (localCountRecipe != countSearchRecipe) setLocalCountRecipe(countSearchRecipe);
    }, [countSearchRecipe, localCountRecipe]);

    const onClickSearchTitle = () => {
        if (searchInputText.length > 0 && searchInputText.length < 3) {
            setErrorInputLenght(true);
        } else if (searchInputText.length === 0) {
            // clearParams()
        } else {
            setParams(searchInputText, 'title');
            if (localCountRecipe === 0) setErrorInputLenght(true); //Не найден - подсветить красным
            console.log(countSearchRecipe);
        }
    };

    const handleSearchTitle = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setSearchInputText(value);
        setErrorInputLenght(false);
    };

    const icoSize = useBreakpointValue({
        base: 'sm',
        xl: 'lg',
    });

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement | null>(null);

    const [allergenSynchronData, setAllergenSynchronData] = useState(
        allergensSearch.split('--').filter(Boolean),
    );

    return (
        <Center display='flex' flexDir='column' p={{ base: '16px 0 0 0', lg: '28px 0 32px 0' }}>
            <Box
                borderRadius='24px'
                p={{
                    base: '0 16px 16px 16px',
                    lg: '0 30px 34px 30px',
                    '2xl': '0 190px 32px 190px',
                }}
                boxShadow={
                    searchState || headerFocus
                        ? '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)'
                        : ''
                }
            >
                <Heading
                    as='h2'
                    w='100%'
                    fontWeight='700'
                    fontSize={{ base: '24px', xl: '48px' }}
                    lineHeight={{ base: '32px', xl: '48px' }}
                    letterSpacing='1.2px'
                    mb={subtitle ? { base: '16px', xl: '15px' } : { base: '16px', xl: '36px' }}
                >
                    {title}
                </Heading>

                {subtitle && (
                    <Text
                        color='blackAlpha.600'
                        maxW={{ base: '100%', xl: '696px' }}
                        fontWeight='500'
                        fontSize={{ base: '14px', xl: '16px' }}
                        lineHeight={{ base: '20px', xl: '24px' }}
                        mb={{ base: '16px', xl: '33px' }}
                    >
                        {subtitle}
                    </Text>
                )}

                <form id='HeaderPages__form' name='HeaderPages__form'>
                    <Stack direction='row' gap='12px' mb={{ base: '0', lg: '16px' }}>
                        <IconButton
                            data-test-id='filter-button'
                            ref={btnRef}
                            onClick={onOpen}
                            borderColor='rgba(0, 0, 0, 0.48)'
                            variant='outline'
                            size={icoSize}
                            aria-label='Search database'
                            icon={<HeaderPageFilterIco boxSize='24px' />}
                        />

                        <InputGroup
                            w={{ base: '100%', md: '408px', lg: '458px' }}
                            size={{ base: 'sm', xl: 'lg' }}
                        >
                            <InputRightElement>
                                <IconButton
                                    data-test-id='search-button'
                                    isDisabled={isDisabledSearch}
                                    pointerEvents={isDisabledSearch ? 'none' : 'all'}
                                    onClick={onClickSearchTitle}
                                    variant='outline'
                                    aria-label='Search title recipe'
                                    outline='none'
                                    boxShadow='none'
                                    border='none'
                                    _hover={{
                                        bg: 'transparent',
                                    }}
                                    _focus={{
                                        outline: 'none',
                                        boxShadow: 'none',
                                        border: 'none',
                                    }}
                                    icon={<SearchIcon boxSize={5} />}
                                />
                            </InputRightElement>

                            <Input
                                data-test-id='search-input'
                                borderRadius='6px'
                                id='headerPages__input'
                                borderColor={!errorInputLenght ? 'rgba(0, 0, 0, 0.48)' : 'red'}
                                color='rgba(19, 75, 0, 1)'
                                minW='284px'
                                placeholder='Название или ингредиент...'
                                _placeholder={{
                                    color: '#134b00;',
                                }}
                                autoComplete='off'
                                boxShadow='none'
                                _hover={{
                                    borderColor: !errorInputLenght ? 'rgba(0, 0, 0, 0.48)' : 'red',
                                    boxShadow: 'none',
                                }}
                                _focus={{
                                    borderColor: !errorInputLenght ? 'rgba(0, 0, 0, 0.48)' : 'red',
                                    boxShadow: 'none',
                                }}
                                value={searchInputText}
                                onChange={handleSearchTitle}
                                onFocus={() => setHeaderFocus(true)}
                                onBlur={() => setHeaderFocus(false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        onClickSearchTitle();
                                    }
                                }}
                            />
                        </InputGroup>
                    </Stack>

                    <AllergenSelect
                        setParams={setParams}
                        allergensSearch={allergensSearch}
                        stateFullClear={stateFullClear}
                        allergenSynchronData={allergenSynchronData}
                    />
                </form>

                <FilterDrawer
                    isOpen={isOpen}
                    onClose={onClose}
                    btnRef={btnRef}
                    allergensSearch={allergensSearch}
                    categorsSearch={categorsSearch}
                    authorsSearch={authorsSearch}
                    meatSearch={meatSearch}
                    garnishSearch={garnishSearch}
                    setParams={setParams}
                    clearParams={clearParams}
                    stateFullClear={stateFullClear}
                    setAllergenSynchronData={setAllergenSynchronData}
                />
            </Box>
        </Center>
    );
};
