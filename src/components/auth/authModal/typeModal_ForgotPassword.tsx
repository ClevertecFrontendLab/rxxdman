import {
    Box,
    Center,
    Flex,
    HStack,
    ModalBody,
    ModalFooter,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';
import React, { FC } from 'react';

import { AllertApp } from '~/components/alertApp/alertApp';
import { Loader } from '~/components/loader/loader';
import { AUTH_BUTTON_GET_CODE, AUTH_BUTTON_REGISTER } from '~/constants/auth/button';
import { AUTH_ERROR_FORMAT, AUTH_ERROR_PASSWORD_DO_NOT_MATCH } from '~/constants/auth/error';
import {
    MAX_LENGHT,
    MAX_LENGHT_ERROR,
    MIN_LENGHT_LOGIN,
    MIN_LENGHT_PASSWORD,
} from '~/constants/auth/global';
import {
    AUTH_LOGIN_HELPER,
    AUTH_LOGIN_PLACEHOLDER,
    AUTH_LOGIN_TITLE,
    AUTH_MAIL_PLACEHOLDER,
    AUTH_MAIL_TITLE,
    AUTH_PASSWORD_HELPER,
    AUTH_PASSWORD_PLACEHOLDER,
    AUTH_PASSWORD_REPEAT_TITLE,
    AUTH_PASSWORD_TITLE,
} from '~/constants/auth/input';
import {
    AUTH_MODAL_FORGOT_PASSWORD,
    AUTH_MODAL_FORGOT_PASSWORD_STEP_ONE_TITLE,
    AUTH_MODAL_FORGOT_PASSWORD_STEP_TWO_TITLE,
} from '~/constants/auth/modal';
import { useForgotPassword } from '~/hooks/useForgotPassword';

import { AuthButton } from '../authButton';
import { AuthInput } from '../authInput';
import {
    validateEmailPattern,
    validateLoginPattern,
    validatePasswordPattern,
} from '../validatePattern';

type PropsContainer_TypeModal_ForgotPassword = {
    forgotPasswordStep: number;
    setForgotPasswordStep: React.Dispatch<React.SetStateAction<number>>;
};

export const Container_TypeModal_ForgotPassword: FC<PropsContainer_TypeModal_ForgotPassword> = ({
    forgotPasswordStep,
    setForgotPasswordStep,
}) => {
    const finalRef = React.useRef(null);
    const {
        isOpenAlert,
        alertTitle,
        alertMessage,
        onCloseAlert,
        statusForgotPasswordMutation,
        statusVerifyOTPMutation,
        statusResetPasswordMutation,
        errorForgotPasswordMutation,
        handleSubmit,
        register,
        errors,
        setValueStepOne,
        triggerStepOne,
        handleSubmitStepThree,
        registerStepThree,
        errorsStepThree,
        setValueStepThree,
        triggerStepThree,
        sendCode,
        verifyOtp,
        forgotPassword,
        setEmail,
        setOTP,
        setLogin,
        setPassword,
        setPasswordConfirm,
        setIsErrorOTP,
        email,
        OTP,
        isErrorOTP,
        login,
        password,
        passwordConfirm,
    } = useForgotPassword({ forgotPasswordStep, setForgotPasswordStep });

    return (
        <>
            <ModalBody p={0} w='100%'>
                <Text
                    fontWeight='400'
                    fontSize='16px'
                    lineHeight='24px'
                    color='blackAlpha.900'
                    textAlign='center'
                    whiteSpace='pre-line'
                    mb='16px'
                >
                    {forgotPasswordStep === 1 && AUTH_MODAL_FORGOT_PASSWORD_STEP_ONE_TITLE}

                    {forgotPasswordStep === 2 && (
                        <>
                            {AUTH_MODAL_FORGOT_PASSWORD_STEP_TWO_TITLE.split('(MAIL)')[0]}
                            <br />
                            <span style={{ fontWeight: '600', color: 'rgba(0, 0, 0, 0.92)' }}>
                                {email}
                            </span>
                            <br />
                            {AUTH_MODAL_FORGOT_PASSWORD_STEP_TWO_TITLE.split('(MAIL)')[1]}
                        </>
                    )}
                </Text>

                {isOpenAlert && (
                    <AllertApp
                        title={alertTitle}
                        status='error'
                        message={alertMessage}
                        onClose={onCloseAlert}
                    />
                )}

                {(statusForgotPasswordMutation === 'pending' ||
                    statusVerifyOTPMutation === 'pending' ||
                    statusResetPasswordMutation === 'pending') && (
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

                {forgotPasswordStep === 1 && (
                    <form onSubmit={handleSubmit(sendCode)} autoComplete='off' ref={finalRef}>
                        <Flex direction='column' gap='24px'>
                            <AuthInput
                                testId='email-input'
                                trigger={triggerStepOne}
                                setValueForm={setValueStepOne}
                                registerForm={register}
                                setValue={setEmail}
                                value={email}
                                inputName='email'
                                error={errors.email || errorForgotPasswordMutation}
                                title={AUTH_MAIL_TITLE}
                                placeholder={AUTH_MAIL_PLACEHOLDER}
                                required='Введите e-mail'
                                maxLenght={MAX_LENGHT}
                                maxLenghtError={MAX_LENGHT_ERROR}
                                validate={{
                                    email: validateEmailPattern,
                                }}
                            />
                            <AuthButton
                                testId='submit-button'
                                title={AUTH_BUTTON_GET_CODE}
                                type='submit'
                            />
                        </Flex>
                    </form>
                )}

                {forgotPasswordStep === 2 && (
                    <HStack justify='center'>
                        <PinInput
                            otp
                            onComplete={(value) => verifyOtp(value)}
                            onChange={(value) => {
                                setOTP(value);
                                if (isErrorOTP) setIsErrorOTP(false);
                            }}
                            value={OTP}
                            isInvalid={isErrorOTP}
                        >
                            <PinInputField data-test-id='verification-code-input-1' />
                            <PinInputField data-test-id='verification-code-input-2' />
                            <PinInputField data-test-id='verification-code-input-3' />
                            <PinInputField data-test-id='verification-code-input-4' />
                            <PinInputField data-test-id='verification-code-input-5' />
                            <PinInputField data-test-id='verification-code-input-6' />
                        </PinInput>
                    </HStack>
                )}

                {forgotPasswordStep === 3 && (
                    <form onSubmit={handleSubmitStepThree(forgotPassword)} autoComplete='off'>
                        <Flex direction='column' gap='24px'>
                            <AuthInput
                                setValueForm={setValueStepThree}
                                trigger={triggerStepThree}
                                testId='login-input'
                                registerForm={registerStepThree}
                                setValue={setLogin}
                                value={login}
                                inputName='login'
                                error={errorsStepThree.login}
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
                                setValueForm={setValueStepThree}
                                trigger={triggerStepThree}
                                testId='password-input'
                                registerForm={registerStepThree}
                                setValue={setPassword}
                                value={password}
                                inputName='password'
                                error={errorsStepThree.password}
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
                                setValueForm={setValueStepThree}
                                trigger={triggerStepThree}
                                testId='confirm-password-input'
                                registerForm={registerStepThree}
                                setValue={setPasswordConfirm}
                                value={passwordConfirm}
                                inputName='password_repeat'
                                error={errorsStepThree.password_repeat}
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
                                    testId='submit-button'
                                />
                            </Box>
                        </Flex>
                    </form>
                )}
            </ModalBody>

            {forgotPasswordStep !== 3 && (
                <ModalFooter w='100%' mt={8} p={0} justifyContent='center'>
                    <Text
                        fontWeight='400'
                        fontSize='12px'
                        lineHeight='16px'
                        color='blackAlpha.600'
                        textAlign='center'
                        whiteSpace='pre-line'
                    >
                        {AUTH_MODAL_FORGOT_PASSWORD}
                    </Text>
                </ModalFooter>
            )}
        </>
    );
};
