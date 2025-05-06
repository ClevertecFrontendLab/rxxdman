import './App.css';

import { Box, Center, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { categoriesResponse, useGetCategoriesQuery } from '~/API/categorsApi';
import { ErrorAllert } from '~/components/errorAlert/errorAllert';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { LeftPanel } from '~/components/leftPanel/leftPanel';
import { Loader } from '~/components/loader/loader';
import { RightPanel } from '~/components/rightPanel/rightPanel';
import { useGetPostsQuery } from '~/query/services/posts.ts';

import { CategorPage } from './pages/categorPage';
import { HomePage } from './pages/home';
import { NotFoundPage } from './pages/notFountPage';
import { PopularPage } from './pages/popularPage';
import { RecipePage } from './pages/recipePage';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();
    const { data: categories, error, isLoading, isSuccess } = useGetCategoriesQuery();

    const pathname = useLocation();

    const isShow = useBreakpointValue({
        base: false,
        lg: true,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const { isOpen, onClose, onOpen } = useDisclosure();

    useEffect(() => {
        if (error) onOpen();
    }, [error, onOpen]);

    // Локальный стейт для категорий с резервом из localStorage
    const [categoriesData, setCategoriesData] = useState<categoriesResponse | null>(null);

    // При успешном получении сохраняем в localStorage и локальный стейт
    useEffect(() => {
        if (categories) {
            setCategoriesData(categories);
            localStorage.setItem('categoriesBackup', JSON.stringify(categories));
        }
    }, [categories]);

    // Если ошибка — пытаемся загрузить из localStorage
    useEffect(() => {
        if (error && !categoriesData) {
            const backup = localStorage.getItem('categoriesBackup');
            if (backup) {
                setCategoriesData(JSON.parse(backup));
            }
        }
    }, [error, categoriesData]);

    return (
        <div id='root'>
            {isLoading && (
                <Center
                    zIndex={100000}
                    bg='rgba(0, 0, 0, 0.16)'
                    position='fixed'
                    h='100vh'
                    w='100vw'
                    backdropFilter='blur(1px)'
                >
                    <Loader testId='app-loader' />
                </Center>
            )}

            {isOpen && (
                <ErrorAllert
                    title='Ошибка сервера'
                    message='Попробуйте поискать снова попозже'
                    onClose={onClose}
                />
            )}

            <Flex direction='column' w='100vw' maxW='100vw' overflow='hidden' minH='100vh'>
                <Box w='100%' zIndex={1000} position='fixed' mb='80px' data-test-id='header'>
                    <Header categors={categories} />
                </Box>

                <Flex>
                    {isShow && (
                        <Box
                            display={{ base: 'none', lg: 'block' }}
                            maxH='calc(100vh - 80px)'
                            minW='256px'
                            h='calc(100vh - 80px)'
                            position='fixed'
                            zIndex='10'
                            top='80px'
                        >
                            {isSuccess && <LeftPanel />}
                        </Box>
                    )}

                    <Box
                        p={{
                            base: '64px 16px 100px 16px',
                            md: '64px 20px 100px 20px',
                            lg: '80px 120px 8px 265px',
                            xl: '80px 280px 0 280px',
                        }}
                        w='100%'
                        overflow='hidden'
                        minH='100vh'
                    >
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/the-juiciest' element={<PopularPage />} />

                            <Route path='/:category/:subcategor' element={<CategorPage />} />
                            <Route
                                path='/:category/:subcategor/:idRecipe'
                                element={<RecipePage />}
                            />
                            <Route path='/the-juiciest/:idRecipe' element={<RecipePage />} />

                            <Route path='/not-found' element={<NotFoundPage />} />
                        </Routes>
                    </Box>

                    {isShow && (
                        <Box
                            display={{ base: 'none', lg: 'block' }}
                            maxH='calc(100vh - 80px)'
                            w={{ base: '110px', xl: '208px' }}
                            h='calc(100vh - 80px)'
                            position='fixed'
                            zIndex='10'
                            right='0'
                            top='80px'
                        >
                            <RightPanel />
                        </Box>
                    )}
                </Flex>

                <Box
                    display={{ base: 'block', lg: 'none' }}
                    w='100%'
                    zIndex='10'
                    position='fixed'
                    bottom='0'
                    data-test-id='footer'
                >
                    <Footer />
                </Box>
            </Flex>
        </div>
    );
}

export default App;
