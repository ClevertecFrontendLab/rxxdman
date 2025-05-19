import { Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';

import { AUTH_BUTTON_FORGOT_PASSWORD, AUTH_BUTTON_LOGIN } from '~/constants/auth/button';
import { MAX_LENGHT, MAX_LENGHT_ERROR } from '~/constants/auth/global';
import {
    AUTH_LOGIN_PLACEHOLDER,
    AUTH_LOGIN_TITLE,
    AUTH_PASSWORD_PLACEHOLDER,
    AUTH_PASSWORD_TITLE,
} from '~/constants/auth/input';
import { useAuthLogin } from '~/hooks/useAuthLogin';

import { AllertApp, StatusAlert } from '../alertApp/alertApp';
import { Loader } from '../loader/loader';
import { AuthButton } from './authButton';
import { AuthInput } from './authInput';
import { AuthModal, TypeModal } from './authModal/authModal';

export const LoginForm = () => {
    const finalRef = React.useRef(null);

    const {
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
    } = useAuthLogin();

    return (
        <>
            {status === 'pending' && (
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
            )}
            {isOpenAlert && (
                <AllertApp
                    title={alertTitle}
                    status={alertStatus as StatusAlert}
                    message={alertMessage}
                    onClose={onCloseAlert}
                />
            )}

            {isOpenModal && (
                <AuthModal
                    typeModal={typeModal as TypeModal}
                    finalRef={finalRef}
                    isOpen={isOpenModal}
                    onClose={onCloseModal}
                    refetch={loginMutate}
                />
            )}

            <form
                data-test-id='sign-in-form'
                onSubmit={handleSubmit(loginMutate)}
                autoComplete='off'
                ref={finalRef}
            >
                <Flex direction='column' gap='24px' mb='112px'>
                    <AuthInput
                        testId='login-input'
                        registerForm={register}
                        setValue={setLogin}
                        value={login}
                        inputName='login'
                        error={errors.login || errorLogin}
                        title={AUTH_LOGIN_TITLE}
                        placeholder={AUTH_LOGIN_PLACEHOLDER}
                        required='Введите логин'
                        maxLenght={MAX_LENGHT}
                        maxLenghtError={MAX_LENGHT_ERROR}
                    />

                    <AuthInput
                        testId='password-input'
                        registerForm={register}
                        setValue={setPassword}
                        value={password}
                        inputName='password'
                        error={errors.password || errorLogin}
                        title={AUTH_PASSWORD_TITLE}
                        placeholder={AUTH_PASSWORD_PLACEHOLDER}
                        type='password'
                        required='Введите пароль'
                        maxLenght={MAX_LENGHT}
                        maxLenghtError={MAX_LENGHT_ERROR}
                    />
                </Flex>

                <AuthButton testId='submit-button' title={AUTH_BUTTON_LOGIN} type='submit' />
            </form>

            <Text
                data-test-id='forgot-password'
                mt='16px'
                fontWeight='600'
                fontSize='16px'
                lineHeight='24px'
                color='black'
                cursor='pointer'
                onClick={forgotPasswordOpenModal}
            >
                {AUTH_BUTTON_FORGOT_PASSWORD}
            </Text>
        </>
    );
};
