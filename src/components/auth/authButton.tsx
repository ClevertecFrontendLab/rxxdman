import { Button, ButtonProps } from '@chakra-ui/react';
import { FC } from 'react';

type AuthButtonProps = ButtonProps & {
    title: string;
    testId?: string;
};

export const AuthButton: FC<AuthButtonProps> = ({ title, testId, ...restProps }) => (
    <Button
        data-test-id={testId}
        w='100%'
        colorScheme='blackAplha'
        bg='blackAlpha.900'
        {...restProps}
    >
        {title}
    </Button>
);
