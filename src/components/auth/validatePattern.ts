/* eslint-disable no-useless-escape */

import { AUTH_ERRORS } from '~/constants/auth/error';

export const validateStartsWithCyrillic = (value: string) => {
    if (!value || !/^[А-ЯЁ]/u.test(value)) {
        return AUTH_ERRORS.STARTS_WIDTH_CYRILLIC;
    }
    return true;
};

export const validateCyrillicAndHyphen = (value: string) => {
    if (!value || !/^[А-ЯЁа-яё\-]*$/u.test(value)) {
        return AUTH_ERRORS.CYRILLIC_AND_HYPHEN;
    }
    return true;
};

export const validateEmailPattern = (value: string) => {
    if (!value || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return AUTH_ERRORS.EMAIL_VALIDATE;
    }
    return true;
};

export const validateLoginPattern = (value: string) => {
    if (!value || !/^[A-Za-z0-9!@#$&_\+\-\.]*$/u.test(value)) {
        return AUTH_ERRORS.FORMAT;
    }
    return true;
};

export const validatePasswordPattern = (value: string) => {
    if (!/^[A-Za-z0-9!@#$&_\+\-\.]*$/.test(value)) {
        return AUTH_ERRORS.FORMAT;
    }

    if (!/[A-Z]/.test(value)) {
        return AUTH_ERRORS.FORMAT;
    }

    if (!/[0-9]/.test(value)) {
        return AUTH_ERRORS.FORMAT;
    }
    return true;
};
