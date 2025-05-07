import './App.css';

import { Box, Center, Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useGetCategoriesQuery } from '~/api/query/categorsQuery';
import { categoriesResponse } from '~/api/types/responce';
import { ErrorAllert } from '~/components/errorAlert/errorAllert';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header/header';
import { LeftPanel } from '~/components/leftPanel/leftPanel';
import { Loader } from '~/components/loader/loader';
import { RightPanel } from '~/components/rightPanel/rightPanel';
import { RoutesApp } from '~/components/routes/routesApp';
import { ERROR_DESCRIPTION, ERROR_TITLE } from '~/constants/errorAlert';
import { useGetPostsQuery } from '~/query/services/posts.ts';

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

    const [categoriesData, setCategoriesData] = useState<categoriesResponse | null>(null);

    useEffect(() => {
        if (categories) {
            setCategoriesData(categories);
            localStorage.setItem('categoriesBackup', JSON.stringify(categories));
        }
    }, [categories]);

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
                    zIndex={1001}
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
                <ErrorAllert title={ERROR_TITLE} message={ERROR_DESCRIPTION} onClose={onClose} />
            )}

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
                        <RoutesApp />
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
