import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import {
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyOTPMutation,
} from '~/api/query/authQuery';
import {
    AUTH_ERROR_5XX_MESSAGE,
    AUTH_ERROR_5XX_TITLE,
    AUTH_ERROR_FORGOT_OTP_VALIDATE_MESSAGE,
    AUTH_ERROR_FORGOT_OTP_VALIDATE_TITLE,
    AUTH_ERROR_FORGOT_PASSWORD_EMAIL_MESSAGE,
    AUTH_ERROR_FORGOT_PASSWORD_EMAIL_TITLE,
} from '~/constants/auth/error';

type PropsUseForgotPassword = {
    forgotPasswordStep: number;
    setForgotPasswordStep: React.Dispatch<React.SetStateAction<number>>;
};

export const useForgotPassword = ({
    forgotPasswordStep,
    setForgotPasswordStep,
}: PropsUseForgotPassword) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger: triggerStepOne,
        setValue: setValueStepOne,
    } = useForm();
    const {
        register: registerStepThree,
        handleSubmit: handleSubmitStepThree,
        formState: { errors: errorsStepThree },
        trigger: triggerStepThree,
        setValue: setValueStepThree,
    } = useForm({ mode: 'onTouched' });
    const { isOpen: isOpenAlert, onClose: onCloseAlert, onOpen: onOpenAlert } = useDisclosure();
    const navigate = useNavigate();

    const [
        forgotPasswordMutation,
        {
            error: errorForgotPasswordMutation,
            status: statusForgotPasswordMutation,
            isSuccess: isSuccessForgotPasswordMutation,
        },
    ] = useForgotPasswordMutation();
    const [
        verifyOTPMutation,
        {
            error: errorVerifyOTPMutation,
            status: statusVerifyOTPMutation,
            isSuccess: isSuccessVerifyOTPMutation,
        },
    ] = useVerifyOTPMutation();
    const [
        resetPasswordMutation,
        {
            error: errorResetPasswordMutation,
            status: statusResetPasswordMutation,
            isSuccess: isSuccessResetPasswordMutation,
        },
    ] = useResetPasswordMutation();

    const [email, setEmail] = useState('');
    const [OTP, setOTP] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isErrorOTP, setIsErrorOTP] = useState(false);

    useEffect(() => {
        if (errorForgotPasswordMutation) {
            const errorCode = errorForgotPasswordMutation.status;
            setAlertTitle(
                errorCode === 403
                    ? AUTH_ERROR_FORGOT_PASSWORD_EMAIL_TITLE
                    : AUTH_ERROR_5XX_TITLE || 'Ошибка!',
            );
            setAlertMessage(
                errorCode === 403
                    ? AUTH_ERROR_FORGOT_PASSWORD_EMAIL_MESSAGE
                    : AUTH_ERROR_5XX_MESSAGE || '',
            );
            setEmail('');
            onOpenAlert();
        }
        if (errorVerifyOTPMutation) {
            const errorCode = errorVerifyOTPMutation.status;
            setAlertTitle(
                errorCode === 403
                    ? AUTH_ERROR_FORGOT_OTP_VALIDATE_TITLE
                    : AUTH_ERROR_5XX_TITLE || 'Ошибка!',
            );
            setAlertMessage(
                errorCode === 403
                    ? AUTH_ERROR_FORGOT_OTP_VALIDATE_MESSAGE
                    : AUTH_ERROR_5XX_MESSAGE || '',
            );

            onOpenAlert();
            setOTP('');
            setIsErrorOTP(true);
        }

        if (errorResetPasswordMutation) {
            const errorCode = errorResetPasswordMutation.status;
            if (errorCode.toString().indexOf('5') === 0) {
                setAlertTitle(AUTH_ERROR_5XX_TITLE);
                setAlertMessage(AUTH_ERROR_5XX_MESSAGE);
                onOpenAlert();
            }
        }
    }, [
        errorForgotPasswordMutation,
        errorResetPasswordMutation,
        errorVerifyOTPMutation,
        onOpenAlert,
    ]);

    useEffect(() => {
        if (
            forgotPasswordStep === 1 &&
            statusForgotPasswordMutation !== 'pending' &&
            isSuccessForgotPasswordMutation
        )
            setForgotPasswordStep(2);
    }, [
        forgotPasswordStep,
        isSuccessForgotPasswordMutation,
        setForgotPasswordStep,
        statusForgotPasswordMutation,
    ]);

    useEffect(() => {
        if (
            forgotPasswordStep === 2 &&
            statusVerifyOTPMutation !== 'pending' &&
            isSuccessVerifyOTPMutation
        )
            setForgotPasswordStep(3);
    }, [
        forgotPasswordStep,
        isSuccessVerifyOTPMutation,
        setForgotPasswordStep,
        statusVerifyOTPMutation,
    ]);

    useEffect(() => {
        if (
            forgotPasswordStep === 3 &&
            statusResetPasswordMutation !== 'pending' &&
            isSuccessResetPasswordMutation
        ) {
            navigate('/login?successResetPassword=true');
        }
    }, [forgotPasswordStep, isSuccessResetPasswordMutation, navigate, statusResetPasswordMutation]);

    const sendCode = async () => {
        await forgotPasswordMutation({ email });
    };

    const verifyOtp = async (otpToken: string) => {
        await verifyOTPMutation({ email, otpToken });
    };

    const forgotPassword = async () => {
        await resetPasswordMutation({ email, login, password, passwordConfirm });
    };

    return {
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
    };
};
