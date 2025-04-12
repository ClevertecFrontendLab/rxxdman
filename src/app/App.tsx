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
                <Box
                    data-test-id='header'
                    w='100%'
                    zIndex='999'
                    position={{ base: 'fixed', lg: 'static' }}
                >
                    <Header />
                </Box>

                <Flex>
                    <Box h='1040px' minW='256px' display={{ base: 'none', lg: 'block' }}>
                        <LeftPanel />
                    </Box>

                    <Box
                        p={{
                            base: '64px 16px 100px 16px',
                            md: '64px 20px 100px 20px',
                            lg: '0 10px 0 24px',
                            xl: '0 73px 0 23px',
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
                        h='1040px'
                        minW={{ base: '100px', xl: '208px' }}
                        display={{ base: 'none', lg: 'block' }}
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
