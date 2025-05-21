import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Center,
    CloseButton,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';

export type StatusAlert = 'error' | 'success';

type AllertProps = {
    title: string;
    message: string;
    status?: StatusAlert;
    onClose(): void;
};

export const AllertApp: FC<AllertProps> = ({ title, message, onClose, status = 'error' }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 15000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Center>
            <Alert
                data-test-id='error-notification'
                status={status}
                position='fixed'
                bottom='80px'
                zIndex={10}
                w={{ base: '328px', lg: '400px' }}
                textAlign='left'
                bg={status === 'error' ? 'rgba(229, 62, 62, 1)' : 'rgba(56, 161, 105, 1)'}
                fontSize='16px'
                lineHeight='24px'
                color='white'
            >
                <AlertIcon color='white' />
                <Box>
                    <AlertTitle fontWeight='700' maxW='260px'>
                        {title}
                    </AlertTitle>

                    {message.length > 0 && (
                        <AlertDescription fontWeight='400'>{message}</AlertDescription>
                    )}
                </Box>
                <CloseButton
                    data-test-id='close-alert-button'
                    alignSelf='flex-start'
                    position='absolute'
                    right='12px'
                    top='12px'
                    w='12px'
                    h='12px'
                    onClick={onClose}
                />
            </Alert>
        </Center>
    );
};
