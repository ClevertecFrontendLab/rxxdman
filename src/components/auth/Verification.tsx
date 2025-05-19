import { Center } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { Loader } from '../loader/loader';
import { LoginForm } from './loginForm';

export const VerificationUser = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const emailVerified = searchParams.get('emailVerified');

    useEffect(() => {
        if (emailVerified === 'false') {
            navigate('/register?emailVerified=false');
        }

        if (emailVerified === 'true') {
            navigate('/login?emailVerified=true');
        }
    }, [emailVerified, navigate]);

    return (
        <>
            <Center
                zIndex={1001}
                bg='rgba(0, 0, 0, 0.16)'
                position='fixed'
                top={0}
                left={0}
                h='100vh'
                w='100vw'
                backdropFilter='blur(1px)'
            >
                <Loader testId='app-loader' />
            </Center>
            <LoginForm />
        </>
    );
};
