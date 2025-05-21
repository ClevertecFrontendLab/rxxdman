import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router';

import { useRegisterMutation } from '~/api/query/authQuery';
import { AUTH_ERRORS } from '~/constants/auth/error';
import { buildProgressValue } from '~/utils/buildProgressValue';

export const UseAuthRegister = () => {
    const {
        register: registerStepOne,
        handleSubmit: handleSubmitStepOne,
        formState: { errors: errorsStepOne },
        trigger: triggerStepOne,
        setValue: setValueStepOne,
    } = useForm({ mode: 'onChange' });
    const {
        register: registerStepTwo,
        handleSubmit: handleSubmitStepTwo,
        formState: { errors: errorsStepTwo },
        trigger: triggerStepTwo,
        setValue: setValueStepTwo,
    } = useForm({ mode: 'onTouched' });

    const [registerMutation, { error: errorRegister, isSuccess }] = useRegisterMutation();

    const { isOpen: isOpenAlert, onClose: onCloseAlert, onOpen: onOpenAlert } = useDisclosure();
    const { isOpen: isOpenModal, onClose: onCloseModal, onOpen: onOpenModal } = useDisclosure();

    const [stepRegister, setStepRegister] = useState(1);
    const [showStepOne, setShowStepOne] = useState(true);
    const [showStepTwo, setShowStepTwo] = useState(false);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [password_repeat, setPassword_repeat] = useState('');

    const [progressValue, setProgressValue] = useState(0);

    const [errorTitle, setErrorTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [typeModal, setTypeModal] = useState('');

    useEffect(() => {
        setProgressValue(
            buildProgressValue(
                name,
                surname,
                email,
                login,
                password,
                password_repeat,
                errorsStepOne,
            ),
        );
    }, [email, errorsStepOne, login, name, password, password_repeat, surname]);

    useEffect(() => {
        if (errorRegister) {
            const errorCode = errorRegister.status;

            setErrorTitle(
                errorCode === 400 ? errorRegister.data.message : AUTH_ERRORS.GLOBAL_5XX_TITLE,
            );

            setErrorMessage(errorCode === 400 ? '' : AUTH_ERRORS.GLOBAL_5XX_MESSAGE);

            onOpenAlert();
        }
    }, [errorRegister, onOpenAlert, onOpenModal]);

    useEffect(() => {
        if (isSuccess) {
            setTypeModal('SuccessRegister');
            onOpenModal();
        }
    }, [isSuccess, onOpenModal]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const emailVerified = searchParams.get('emailVerified');
        if (emailVerified === 'false') {
            setTypeModal('ErrorRegister');
            onOpenModal();
            setSearchParams({});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nextStep = () => {
        setStepRegister(2);
        setShowStepTwo(true);
        setTimeout(() => {
            setShowStepOne(false);
        }, 300);
    };

    const registerMutate = async () => {
        await registerMutation({ email, login, password, name, surname });
    };

    return {
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
    };
};
