import { ModalBody, ModalFooter, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { AUTH_BUTTONS } from '~/constants/auth/button';
import { AUTH_ERRORS } from '~/constants/auth/error';

import { AuthButton } from '../authButton';

type PropsContainerTypeModal_ErrorLogin = {
    refetch?(): void;
};

export const Container_TypeModal_ErrorLogin: FC<PropsContainerTypeModal_ErrorLogin> = ({
    refetch,
}) => {
    const HandlerOnClick = () => {
        if (refetch) refetch();
    };

    return (
        <>
            <ModalBody p={0} w='100%'>
                <Text
                    fontWeight='700'
                    fontSize='24px'
                    lineHeight='32px'
                    color='black'
                    textAlign='center'
                    whiteSpace='pre-line'
                    mb='16px'
                >
                    {AUTH_ERRORS.LOGIN_5XX_TITLE}
                </Text>

                <Text
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='24px'
                    color='blackAlpha.700'
                    textAlign='center'
                    whiteSpace='pre-line'
                >
                    {AUTH_ERRORS.LOGIN_5XX_MESSAGE}
                </Text>
            </ModalBody>

            <ModalFooter w='100%' mt={8} p={0} justifyContent='center'>
                <AuthButton
                    title={AUTH_BUTTONS.REFETCH}
                    onClick={HandlerOnClick}
                    testId='repeat-button'
                />
            </ModalFooter>
        </>
    );
};
