import { Button } from '@chakra-ui/react';
import { FC } from 'react';

type AuthButtonProps = {
    title: string;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?(): void;
    isDisabled?: boolean;

    testId?: string;
};

export const AuthButton: FC<AuthButtonProps> = ({
    title,
    onClick,
    type = 'button',
    isDisabled,
    testId,
}) => (
    <Button
        data-test-id={testId}
        w='100%'
        colorScheme='blackAplha'
        bg='blackAlpha.900'
        onClick={onClick}
        type={type}
        isDisabled={isDisabled}
    >
        {title}
    </Button>
);
