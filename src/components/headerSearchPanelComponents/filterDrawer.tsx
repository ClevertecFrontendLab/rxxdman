import { CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton,
    Text,
} from '@chakra-ui/react';
import type { FocusableElement } from '@chakra-ui/utils';
import { FC, useEffect, useState } from 'react';

import {
    DRAWER_BUTTON_CLEAR_TITLE,
    DRAWER_BUTTON_SEARCH_TITLE,
    DRAWER_TITLE,
} from '~/constants/drawer';
import { GlobalCategorSearchType } from '~/types/searchType';

import { AllergenSelect } from './allergenSelect';
import { FilterDrawerAuthor } from './filterDrawerAuthor';
import { FilterDrawerCategors } from './filterDrawerCategors';
import { FilterDrawerGarnish } from './FilterDrawerGarnish';
import { FilterDrawerMeat } from './filterDrawerMeat';
import { FilterDrawerTagList } from './filterDrawerTagList';

interface FilterDriwerProps {
    isOpen: boolean;
    onClose(): void;
    btnRef: React.RefObject<HTMLButtonElement | null>;

    allergensSearch: string;
    categorsSearch: string;
    authorsSearch: string;
    meatSearch: string;
    garnishSearch: string;
    setParams(text: string, textType: GlobalCategorSearchType): void;
    clearParams(): void;
    stateFullClear: boolean;
    setAllergenSynchronData: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FilterDrawer: FC<FilterDriwerProps> = ({
    isOpen,
    onClose,
    btnRef,
    allergensSearch,
    categorsSearch,
    authorsSearch,
    meatSearch,
    garnishSearch,
    setParams,
    clearParams,
    stateFullClear,
    setAllergenSynchronData,
}) => {
    const [selectedCategor, setSelectedCategor] = useState<string[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState<string[]>(
        authorsSearch.length ? authorsSearch.split(',').filter(Boolean) : [],
    );
    const [selectedMeat, setSelectedMeat] = useState<string[]>(
        meatSearch.length ? meatSearch.split(',').filter(Boolean) : [],
    );
    const [selectedGarnish, setSelectedGarnish] = useState<string[]>(
        garnishSearch.length ? garnishSearch.split(',').filter(Boolean) : [],
    );
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>(
        allergensSearch.length ? allergensSearch.split(',').filter(Boolean) : [],
    );

    const [allSearchLists, setAllSearchLists] = useState([] as string[]);
    const [isSearchButtonEnable, setIsSearchButtonEnable] = useState(false);

    useEffect(() => {
        setAllSearchLists(
            [
                ...selectedCategor,
                ...selectedAuthor,
                ...selectedMeat,
                ...selectedGarnish,
                ...selectedAllergens,
            ].filter(Boolean),
        );
        setIsSearchButtonEnable(allSearchLists.length ? true : false);
    }, [
        allSearchLists.length,
        selectedAllergens,
        selectedAuthor,
        selectedCategor,
        selectedGarnish,
        selectedMeat,
    ]);

    useEffect(() => {
        setSelectedCategor([]);
    }, [categorsSearch]);

    useEffect(() => {
        setSelectedAuthor(authorsSearch.split(','));
    }, [authorsSearch]);

    useEffect(() => {
        setSelectedMeat(meatSearch.split(','));
    }, [meatSearch]);

    useEffect(() => {
        setSelectedGarnish(garnishSearch.split(','));
    }, [garnishSearch]);

    useEffect(() => {
        setSelectedAllergens(allergensSearch.split(','));
    }, [allergensSearch]);

    function clearFilter() {
        setSelectedCategor([]);
        setSelectedAuthor([]);
        setSelectedMeat([]);
        setSelectedGarnish([]);
        setSelectedAllergens([]);
        clearParams();
    }

    function searchRecipe() {
        setParams(selectedCategor.filter(Boolean).join(',') || '', 'categors');

        setParams(selectedAuthor.filter(Boolean).join(',') || '', 'authors');

        setParams(selectedMeat.filter(Boolean).join(',') || '', 'meat');

        setParams(selectedGarnish.filter(Boolean).join(',') || '', 'garnish');

        setAllergenSynchronData(selectedAllergens.filter(Boolean) || []);

        setTimeout(() => onClose(), 100);
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef as React.RefObject<FocusableElement>}
        >
            <DrawerOverlay backdropFilter='blur(4px)' />
            <DrawerContent
                data-test-id='filter-drawer'
                position='relative'
                overflowY='auto'
                minH='100vh'
                minW={{ base: '344px', lg: '463px' }}
                maxW={{ base: '344px', lg: '463px' }}
                p={{ base: '16px', lg: '32px' }}
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
            >
                <DrawerHeader p='0' mb={{ base: '16px', lg: '24px' }}>
                    <Flex justify='space-between' align='center' pb='16px'>
                        <Text fontWeight='700' fontSize='24px' lineHeight='32px'>
                            {DRAWER_TITLE}
                        </Text>

                        <IconButton
                            data-test-id='close-filter-drawer'
                            aria-label='Close drawer'
                            isRound={true}
                            size='6px'
                            h='24px'
                            w='24px'
                            color='white'
                            bg='black'
                            icon={<CloseIcon boxSize={3} borderRadius='999px' />}
                            onClick={onClose}
                            variant='outline'
                        />
                    </Flex>
                </DrawerHeader>

                <DrawerBody p='0' overflow='visible'>
                    <Flex
                        direction='column'
                        gap={{ base: '16px', lg: '24px' }}
                        w='100%'
                        flexWrap='wrap'
                        h='100%'
                    >
                        <FilterDrawerCategors
                            selectedCategor={selectedCategor}
                            setSelectedCategor={setSelectedCategor}
                        />

                        <FilterDrawerAuthor
                            selectedAuthor={selectedAuthor}
                            setSelectedAuthor={setSelectedAuthor}
                        />

                        <FilterDrawerMeat
                            selectedMeat={selectedMeat}
                            setSelectedMeat={setSelectedMeat}
                        />

                        <FilterDrawerGarnish
                            selectedGarnish={selectedGarnish}
                            setSelectedGarnish={setSelectedGarnish}
                        />

                        <AllergenSelect
                            setParams={setParams}
                            allergensSearch={allergensSearch}
                            isOpen={isOpen}
                            stateFullClear={stateFullClear}
                            setDrawerData={setSelectedAllergens}
                        />

                        <FilterDrawerTagList
                            selectedCategor={selectedCategor}
                            setSelectedCategor={setSelectedCategor}
                            selectedAuthor={selectedAuthor}
                            setSelectedAuthor={setSelectedAuthor}
                            selectedMeat={selectedMeat}
                            setSelectedMeat={setSelectedMeat}
                            selectedGarnish={selectedGarnish}
                            setSelectedGarnish={setSelectedGarnish}
                        />
                    </Flex>
                </DrawerBody>

                <DrawerFooter p='0' mt='32px'>
                    <Flex
                        gap='8px'
                        fontWeight='600'
                        fontSize={{ base: '14px', lg: '18px' }}
                        lineHeight={{ base: '20px', lg: '28px' }}
                    >
                        <Button
                            data-test-id='clear-filter-button'
                            size={{ base: 'xs', lg: 'lg' }}
                            variant='outline'
                            colorScheme='blackAlpha'
                            color='blackAlpha.800'
                            onClick={clearFilter}
                        >
                            {DRAWER_BUTTON_CLEAR_TITLE}
                        </Button>

                        <Button
                            data-test-id='find-recipe-button'
                            size={{ base: 'xs', lg: 'lg' }}
                            colorScheme='blackAlpha'
                            bg='blackAlpha.900'
                            variant='solid'
                            border='none'
                            onClick={searchRecipe}
                            isDisabled={!isSearchButtonEnable}
                            pointerEvents={isSearchButtonEnable ? 'auto' : 'none'}
                        >
                            {DRAWER_BUTTON_SEARCH_TITLE}
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
