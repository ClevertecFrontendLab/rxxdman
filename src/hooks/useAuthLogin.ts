import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

import { useLoginMutation } from '~/api/query/authQuery';
import {
    AUTH_ERROR_LOGIN_401_MESSAGE,
    AUTH_ERROR_LOGIN_401_TITLE,
    AUTH_ERROR_LOGIN_403_MESSAGE,
    AUTH_ERROR_LOGIN_403_TITLE,
} from '~/constants/auth/error';
import {
    AUTH_RESET_PASSWORD_SUCCESS_TITLE,
    AUTH_VERIFY_SUCCESS_TITLE,
} from '~/constants/auth/global';

export const useAuthLogin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loginMutation, { error: errorLogin, isSuccess, status }] = useLoginMutation();
    const { isOpen: isOpenAlert, onClose: onCloseAlert, onOpen: onOpenAlert } = useDisclosure();
    const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [alertStatus, setAlertStatus] = useState('error');
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [typeModal, setTypeModal] = useState('');

    useEffect(() => {
        if (status !== 'pending' && isSuccess) {
            navigate('/');
        }
    }, [isSuccess, navigate, status]);

    useEffect(() => {
        if (errorLogin) {
            const errorCode = errorLogin.status;

            setAlertTitle(
                errorCode === 401 ? AUTH_ERROR_LOGIN_401_TITLE : AUTH_ERROR_LOGIN_403_TITLE,
            );

            setAlertMessage(
                errorCode === 401 ? AUTH_ERROR_LOGIN_401_MESSAGE : AUTH_ERROR_LOGIN_403_MESSAGE,
            );

            setAlertStatus('error');
            setTypeModal('ErrorLogin');

            if (errorCode === 401 || errorCode === 403) onOpenAlert();
            else if (errorCode.toString().indexOf('5') === 0) onOpenModal();
        }
    }, [errorLogin, onOpenAlert, onOpenModal]);

    useEffect(() => {
        const emailVerified = searchParams.get('emailVerified');
        const successResetPassword = searchParams.get('successResetPassword');

        if (emailVerified === 'true' || successResetPassword === 'true') {
            setAlertTitle(
                (emailVerified === 'true' && AUTH_VERIFY_SUCCESS_TITLE) ||
                    (successResetPassword === 'true' && AUTH_RESET_PASSWORD_SUCCESS_TITLE) ||
                    '',
            );
            onCloseModal();
            setAlertMessage('');
            setAlertStatus('success');
            onOpenAlert();
            setSearchParams({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    const loginMutate = async () => {
        await loginMutation({ login, password });
    };

    const forgotPasswordOpenModal = () => {
        setTypeModal('ForgotPassword');
        onOpenModal();
    };

    return {
        isOpenAlert,
        alertTitle,
        alertMessage,
        alertStatus,
        onCloseAlert,
        isOpenModal,
        typeModal,
        onCloseModal,
        register,
        handleSubmit,
        errors,
        errorLogin,
        setLogin,
        setPassword,
        login,
        password,

        loginMutate,
        status,
        forgotPasswordOpenModal,
    };
};
