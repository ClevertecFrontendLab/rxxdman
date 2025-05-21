import {
    Image,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router';

import { AUTH_MODAL } from '~/constants/auth/modal';
import { PATHS } from '~/constants/path';
import { buildTestIdModalAndImagePath } from '~/utils/buildTestIdModalAndImagePath';

import { Container_TypeModal_ErrorLogin } from './typeModal_ErrorLogin';
import { Container_TypeModal_ErrorRegister } from './typeModal_ErrorRegister';
import { Container_TypeModal_ForgotPassword } from './typeModal_ForgotPassword';
import { Container_TypeModal_SuccessRegistor } from './typeModal_SuccessRegister';

export type TypeModal = 'ErrorLogin' | 'SuccessRegister' | 'ErrorRegister' | 'ForgotPassword';

type AuthModalProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    finalRef: React.RefObject<any>;
    isOpen: boolean;
    onClose(): void;
    typeModal: TypeModal;

    mail?: string;

    refetch?(): void;
};

export const AuthModal: FC<AuthModalProps> = ({
    finalRef,
    isOpen,
    typeModal,
    mail,
    onClose,
    refetch,
}) => {
    const navigate = useNavigate();

    const HandlerOnCloseClick = () => {
        onClose();
        if (typeModal === 'SuccessRegister') navigate(PATHS.AUTH_LOGIN);
    };

    const [forgotPasswordStep, setForgotPasswordStep] = useState(1);

    return (
        <Modal isCentered finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
                data-test-id={buildTestIdModalAndImagePath(typeModal, forgotPasswordStep).testId}
                w={{ base: '316px', lg: '396px' }}
                p={8}
                alignItems='center'
                borderRadius='16px'
            >
                <ModalHeader p={0} mb='32px'>
                    {typeModal === 'ForgotPassword' && forgotPasswordStep === 3 ? (
                        <Text
                            fontWeight='700'
                            fontSize='24px'
                            lineHeight='32px'
                            color='black'
                            whiteSpace='pre-line'
                            textAlign='center'
                        >
                            {AUTH_MODAL.FORGOT_PASSWORD_STEP_THREE_TITLE}
                        </Text>
                    ) : (
                        <Image
                            src={`src/assets/auth/${buildTestIdModalAndImagePath(typeModal, forgotPasswordStep).imagePath}`}
                            w={{ base: '108px', lg: '206px' }}
                            h={{ base: '108px', lg: '206px' }}
                        />
                    )}
                </ModalHeader>

                <ModalCloseButton
                    data-test-id='close-button'
                    boxSize={6}
                    borderRadius={999}
                    outline='1px solid black'
                    top='24px'
                    right='24px'
                    onClick={HandlerOnCloseClick}
                />

                {typeModal === 'ErrorLogin' && <Container_TypeModal_ErrorLogin refetch={refetch} />}
                {typeModal === 'SuccessRegister' && (
                    <Container_TypeModal_SuccessRegistor mail={mail || ''} />
                )}
                {typeModal === 'ErrorRegister' && <Container_TypeModal_ErrorRegister />}

                {typeModal === 'ForgotPassword' && (
                    <Container_TypeModal_ForgotPassword
                        forgotPasswordStep={forgotPasswordStep}
                        setForgotPasswordStep={setForgotPasswordStep}
                    />
                )}
            </ModalContent>
        </Modal>
    );
};
