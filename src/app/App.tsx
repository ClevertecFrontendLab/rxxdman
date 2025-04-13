import './App.css';

import { Box, Flex } from '@chakra-ui/react';
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

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    const pathname = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div id='root'>
            <Flex direction='column' w='100vw' maxW='100vw' overflow='hidden' minH='100vh'>
                <Box data-test-id='header' w='100%' zIndex='999999' position='fixed'>
                    <Header />
                </Box>

                <Flex>
                    <Box
                        display={{ base: 'none', lg: 'block' }}
                        maxH='calc(100vh - 80px)'
                        minW='256px'
                        h='calc(100vh - 80px)'
                        position='fixed'
                        zIndex='999999'
                        top='80px'
                    >
                        <LeftPanel />
                    </Box>

                    <Box
                        p={{
                            base: '64px 16px 100px 16px',
                            md: '64px 20px 100px 20px',
                            lg: '80px 120px 8px 265px',
                            xl: '80px 280px 0 280px',
                        }}
                        w='100%'
                        overflow='hidden'
                    >
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/popular' element={<PopularPage />} />
                            <Route
                                path='/catalog/:category/:subcategor'
                                element={<CategorPage />}
                            />
                        </Routes>
                    </Box>

                    <Box
                        display={{ base: 'none', lg: 'block' }}
                        maxH='calc(100vh - 80px)'
                        w={{ base: '110px', xl: '208px' }}
                        h='calc(100vh - 80px)'
                        position='fixed'
                        zIndex='999999'
                        right='0'
                        top='80px'
                    >
                        <RightPanel />
                    </Box>
                </Flex>

                <Box
                    display={{ base: 'block', lg: 'none' }}
                    w='100%'
                    zIndex='999'
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
