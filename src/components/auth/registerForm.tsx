import { Box, Center, Flex, Progress, Text } from '@chakra-ui/react';
import React from 'react';

import { AUTH_BUTTON_NEXT, AUTH_BUTTON_REGISTER } from '~/constants/auth/button';
import { AUTH_ERROR_FORMAT, AUTH_ERROR_PASSWORD_DO_NOT_MATCH } from '~/constants/auth/error';
import {
    MAX_LENGHT,
    MAX_LENGHT_ERROR,
    MIN_LENGHT_LOGIN,
    MIN_LENGHT_PASSWORD,
    REGISTER_STEP_ONE,
    REGISTER_STEP_TWO,
} from '~/constants/auth/global';
import {
    AUTH_LOGIN_HELPER,
    AUTH_LOGIN_PLACEHOLDER,
    AUTH_LOGIN_TITLE,
    AUTH_MAIL_PLACEHOLDER,
    AUTH_MAIL_TITLE,
    AUTH_NAME_PLACEHOLDER,
    AUTH_NAME_TITLE,
    AUTH_PASSWORD_HELPER,
    AUTH_PASSWORD_PLACEHOLDER,
    AUTH_PASSWORD_REPEAT_TITLE,
    AUTH_PASSWORD_TITLE,
    AUTH_SURNAME_PLACEHOLDER,
    AUTH_SURNAME_TITLE,
} from '~/constants/auth/input';
import { UseAuthRegister } from '~/hooks/useAuthRegister';

import { AllertApp } from '../alertApp/alertApp';
import { Loader } from '../loader/loader';
import { AuthButton } from './authButton';
import { AuthInput } from './authInput';
import { AuthModal, TypeModal } from './authModal/authModal';
import {
    validateCyrillicAndHyphen,
    validateEmailPattern,
    validateLoginPattern,
    validatePasswordPattern,
    validateStartsWithCyrillic,
} from './validatePattern';

export const RegisterForm = () => {
    const finalRef = React.useRef(null);

    const {
        isOpenAlert,
        errorTitle,
        errorMessage,
        onCloseAlert,
        isOpenModal,
        typeModal,
        onCloseModal,
        progressValue,
        stepRegister,
        showStepOne,
        showStepTwo,

        setValueStepOne,
        triggerStepOne,
        registerStepOne,
        handleSubmitStepOne,
        errorsStepOne,
        setValueStepTwo,
        triggerStepTwo,
        registerStepTwo,
        handleSubmitStepTwo,
        errorsStepTwo,
        setName,
        setSurname,
        setEmail,
        setLogin,
        setPassword,
        setPassword_repeat,
        name,
        surname,
        email,
        login,
        password,
        password_repeat,

        nextStep,
        registerMutate,
    } = UseAuthRegister();

    return (
        <>
            {isOpenAlert && (
                <AllertApp title={errorTitle} message={errorMessage} onClose={onCloseAlert} />
            )}

            {isOpenModal && (
                <AuthModal
                    typeModal={typeModal as TypeModal}
                    mail={email}
                    finalRef={finalRef}
                    isOpen={isOpenModal}
                    onClose={onCloseModal}
                />
            )}

            <Flex direction='column' gap='24px'>
                <Box>
                    <Text
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='24px'
                        color='black'
                        align='left'
                    >
                        {stepRegister === 1 ? REGISTER_STEP_ONE : REGISTER_STEP_TWO}
                    </Text>
                    <Progress
                        data-test-id='sign-up-progress'
                        bg='rgba(0, 0, 0, 0.06)'
                        h='8px'
                        colorScheme='lime'
                        hasStripe
                        value={progressValue}
                    />
                </Box>

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

                <form
                    onSubmit={handleSubmitStepOne(nextStep)}
                    autoComplete='off'
                    data-test-id={stepRegister === 1 ? 'sign-up-form' : ''}
                >
                    <Flex
                        h={showStepOne ? '100%' : 0}
                        position={showStepOne ? 'static' : 'absolute'}
                        top={-999}
                        left={-999}
                        direction='column'
                        gap='24px'
                        opacity={stepRegister === 1 ? '100%' : '0'}
                        transition='opacity .3s ease-in-out'
                    >
                        <AuthInput
                            setValueForm={setValueStepOne}
                            trigger={triggerStepOne}
                            testId='first-name-input'
                            registerForm={registerStepOne}
                            setValue={setName}
                            value={name}
                            inputName='name'
                            error={errorsStepOne.name}
                            title={AUTH_NAME_TITLE}
                            placeholder={AUTH_NAME_PLACEHOLDER}
                            required='Введите имя'
                            maxLenght={MAX_LENGHT}
                            maxLenghtError={MAX_LENGHT_ERROR}
                            validate={{
                                startsWithCyrillic: validateStartsWithCyrillic,
                                cyrillicAndHyphen: validateCyrillicAndHyphen,
                            }}
                        />

                        <AuthInput
                            setValueForm={setValueStepOne}
                            trigger={triggerStepOne}
                            testId='last-name-input'
                            registerForm={registerStepOne}
                            setValue={setSurname}
                            value={surname}
                            inputName='surname'
                            error={errorsStepOne.surname}
                            title={AUTH_SURNAME_TITLE}
                            placeholder={AUTH_SURNAME_PLACEHOLDER}
                            required='Введите фамилию'
                            maxLenght={MAX_LENGHT}
                            maxLenghtError={MAX_LENGHT_ERROR}
                            validate={{
                                startsWithCyrillic: validateStartsWithCyrillic,
                                cyrillicAndHyphen: validateCyrillicAndHyphen,
                            }}
                        />

                        <AuthInput
                            setValueForm={setValueStepOne}
                            trigger={triggerStepOne}
                            testId='email-input'
                            registerForm={registerStepOne}
                            setValue={setEmail}
                            value={email}
                            inputName='email'
                            error={errorsStepOne.email}
                            title={AUTH_MAIL_TITLE}
                            placeholder={AUTH_MAIL_PLACEHOLDER}
                            required='Введите e-mail'
                            maxLenght={MAX_LENGHT}
                            maxLenghtError={MAX_LENGHT_ERROR}
                            validate={{
                                email: validateEmailPattern,
                            }}
                        />

                        <Box mt='24px'>
                            <AuthButton
                                title={AUTH_BUTTON_NEXT}
                                type='submit'
                                testId={stepRegister === 1 ? 'submit-button' : ''}
                            />
                        </Box>
                    </Flex>
                </form>

                <form
                    onSubmit={handleSubmitStepTwo(registerMutate)}
                    autoComplete='off'
                    data-test-id={stepRegister === 2 ? 'sign-up-form' : ''}
                >
                    <Flex
                        h={showStepTwo ? '100%' : 0}
                        position={showStepTwo ? 'static' : 'absolute'}
                        top={-999}
                        left={-999}
                        direction='column'
                        gap='24px'
                        opacity={showStepOne ? '0' : '100%'}
                        transition='opacity .3s ease-in-out'
                    >
                        <AuthInput
                            setValueForm={setValueStepTwo}
                            trigger={triggerStepTwo}
                            testId='login-input'
                            registerForm={registerStepTwo}
                            setValue={setLogin}
                            value={login}
                            inputName='login'
                            error={errorsStepTwo.login}
                            title={AUTH_LOGIN_TITLE}
                            placeholder={AUTH_LOGIN_PLACEHOLDER}
                            helperText={AUTH_LOGIN_HELPER}
                            required='Введите логин'
                            minLenght={MIN_LENGHT_LOGIN}
                            minLenghtError={AUTH_ERROR_FORMAT}
                            maxLenght={MAX_LENGHT}
                            maxLenghtError={MAX_LENGHT_ERROR}
                            validate={{
                                loginPattern: validateLoginPattern,
                            }}
                        />
                        <AuthInput
                            setValueForm={setValueStepTwo}
                            trigger={triggerStepTwo}
                            testId='password-input'
                            registerForm={registerStepTwo}
                            setValue={setPassword}
                            value={password}
                            inputName='password'
                            error={errorsStepTwo.password}
                            title={AUTH_PASSWORD_TITLE}
                            placeholder={AUTH_PASSWORD_PLACEHOLDER}
                            helperText={AUTH_PASSWORD_HELPER}
                            type='password'
                            required='Введите пароль'
                            minLenght={MIN_LENGHT_PASSWORD}
                            minLenghtError={AUTH_ERROR_FORMAT}
                            maxLenght={MAX_LENGHT}
                            maxLenghtError={MAX_LENGHT_ERROR}
                            validate={{
                                passwordPattern: validatePasswordPattern,
                            }}
                        />
                        <AuthInput
                            setValueForm={setValueStepTwo}
                            trigger={triggerStepTwo}
                            testId='confirm-password-input'
                            registerForm={registerStepTwo}
                            setValue={setPassword_repeat}
                            value={password_repeat}
                            inputName='password_repeat'
                            error={errorsStepTwo.password_repeat}
                            title={AUTH_PASSWORD_REPEAT_TITLE}
                            placeholder={AUTH_PASSWORD_PLACEHOLDER}
                            type='password'
                            required='Повторите пароль'
                            validate={{
                                passwordMatch: (value: string) =>
                                    value === password || AUTH_ERROR_PASSWORD_DO_NOT_MATCH,
                            }}
                        />

                        <Box mt='24px'>
                            <AuthButton
                                title={AUTH_BUTTON_REGISTER}
                                type='submit'
                                testId={stepRegister === 2 ? 'submit-button' : ''}
                            />
                        </Box>
                    </Flex>
                </form>
            </Flex>
        </>
    );
};
