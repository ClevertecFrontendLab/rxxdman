import { FieldErrors, FieldValues } from 'react-hook-form';

import { validateLoginPattern, validatePasswordPattern } from '~/components/auth/validatePattern';
import { MIN_LENGHT_LOGIN, MIN_LENGHT_PASSWORD } from '~/constants/auth/global';

export const buildProgressValue = (
    name: string,
    surname: string,
    email: string,
    login: string,
    password: string,
    password_repeat: string,
    errorsStepOne: FieldErrors<FieldValues>,
) => {
    const nameValue = name.length && !errorsStepOne.name ? 100 / 6 : 0;
    const surnameValue = surname.length && !errorsStepOne.surname ? 100 / 6 : 0;
    const emailValue = email.length && !errorsStepOne.email ? 100 / 6 : 0;
    const loginValue =
        login.length >= MIN_LENGHT_LOGIN && validateLoginPattern(login) === true ? 100 / 6 : 0;
    const passwordValue =
        password.length >= MIN_LENGHT_PASSWORD && validatePasswordPattern(password) === true
            ? 100 / 6
            : 0;
    const password_repeatValue =
        password_repeat.length >= MIN_LENGHT_PASSWORD && password === password_repeat ? 100 / 6 : 0;

    const progressValue =
        nameValue + surnameValue + emailValue + loginValue + passwordValue + password_repeatValue;

    return progressValue;
};
