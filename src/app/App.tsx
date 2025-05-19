import './App.css';

import { Center } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useCheckAuthQuery } from '~/api/query/authQuery';
import { AppContainer } from '~/components/containers/appContainer';
import { AuthContainer } from '~/components/containers/authContainer';
import { Loader } from '~/components/loader/loader';
import { PATH_AUTH_LOGIN, PATH_AUTH_REGISTER, PATH_AUTH_VERIFICATION } from '~/constants/auth/path';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    const { isSuccess: userLogin, status } = useCheckAuthQuery();

    const location = useLocation().pathname;
    const navigate = useNavigate();

    const [isStart, setStart] = useState(true);

    useEffect(() => {
        if (!userLogin && status != 'pending' && isStart && location === '/') {
            setStart(false);
            navigate(PATH_AUTH_LOGIN);
        }
    }, [isStart, location, navigate, status, userLogin]);

    return (
        <div id='root'>
            {status === 'pending' ? (
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
            ) : location === PATH_AUTH_LOGIN ||
              location === PATH_AUTH_REGISTER ||
              location === PATH_AUTH_VERIFICATION ? (
                <AuthContainer />
            ) : (
                <AppContainer />
            )}
        </div>
    );
}

export default App;
