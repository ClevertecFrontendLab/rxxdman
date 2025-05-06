import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Center,
    CloseButton,
} from '@chakra-ui/react';
import { FC } from 'react';

interface IErrorAllertProps {
    title: string;
    message: string;
    onClose(): void;
}

export const ErrorAllert: FC<IErrorAllertProps> = ({ title, message, onClose }) => (
    <Center>
        <Alert
            data-test-id='error-notification'
            status='error'
            position='fixed'
            bottom='80px'
            zIndex={100000}
            w={{ base: '328px', lg: '400px' }}
            textAlign='left'
            bg='rgba(229, 62, 62, 1)'
            fontSize='16px'
            lineHeight='24px'
            color='white'
        >
            <AlertIcon color='white' />
            <Box>
                <AlertTitle fontWeight='700'>{title}</AlertTitle>
                <AlertDescription fontWeight='400'>{message}</AlertDescription>
            </Box>
            <CloseButton
                data-test-id='close-alert-button'
                alignSelf='flex-start'
                position='absolute'
                right='12px'
                top='12px'
                onClick={onClose}
            />
        </Alert>
    </Center>
);
