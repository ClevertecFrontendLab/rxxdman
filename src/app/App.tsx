import './App.css';

import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useCheckAuthQuery } from '~/api/query/authQuery';
import { AppContainer } from '~/components/containers/appContainer';
import { AuthContainer } from '~/components/containers/authContainer';
import { Loader } from '~/components/loader/loader';
import { PATHS } from '~/constants/path';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    const { isSuccess: userLogin, status, error } = useCheckAuthQuery();

    const location = useLocation().pathname;
    const navigate = useNavigate();

    useEffect(() => {
        if (location === '/') navigate(PATHS.AUTH_LOGIN);

        if (status != 'pending' && userLogin && !error) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, status, userLogin]);

    return (
        <div id='root'>
            {status === 'pending' && (
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

            {location === PATHS.AUTH_LOGIN ||
            location === PATHS.AUTH_REGISTER ||
            location === PATHS.AUTH_VERIFICATION ||
            status === 'pending' ? (
                <AuthContainer />
            ) : (
                <AppContainer />
            )}
        </div>
    );
}

export default App;
