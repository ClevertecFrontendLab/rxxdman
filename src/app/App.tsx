import './App.css';

import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';

import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { LeftPanel } from '~/components/leftPanel/leftPanel';
import { RightPanel } from '~/components/rightPanel/rightPanel';
import { useGetPostsQuery } from '~/query/services/posts.ts';

import { CategorPage } from './pages/categorPage';
import { HomePage } from './pages/home';
import { PopularPage } from './pages/popularPage';
import { RecipePage } from './pages/recipePage';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    const pathname = useLocation();

    const isShow = useBreakpointValue({
        base: false,
        lg: true,
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div id='root'>
            <Flex direction='column' w='100vw' maxW='100vw' overflow='hidden' minH='100vh'>
                <Box w='100%' zIndex={1000} position='fixed' mb='80px' data-test-id='header'>
                    <Header />
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
                            <LeftPanel />
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
