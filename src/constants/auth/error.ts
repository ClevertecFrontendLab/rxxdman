export const AUTH_ERRORS = {
    FORMAT: 'Не соответствует формату',
    PASSWORD_DO_NOT_MATCH: 'Пароли должны совпадать',
    EMAIL_VALIDATE: 'Введите корректный e-mail',
    STARTS_WIDTH_CYRILLIC: 'Должно начинаться с кириллицы А-Я',
    CYRILLIC_AND_HYPHEN: 'Только кириллица А-Я, и "-"',

    LOGIN_401_TITLE: 'Неверный логин или пароль',
    LOGIN_401_MESSAGE: 'Попробуйте снова.',

    LOGIN_403_TITLE: 'E-mail не верифицирован',
    LOGIN_403_MESSAGE: 'Проверьте почту и перейдите по ссылке',

    LOGIN_5XX_TITLE: 'Вход не выполнен',
    LOGIN_5XX_MESSAGE: `Что-то пошло не так. 
Попробуйте еще раз`,

    GLOBAL_5XX_TITLE: 'Ошибка сервера',
    GLOBAL_5XX_MESSAGE: 'Попробуйте немного позже',

    FORGOT_PASSWORD_EMAIL_TITLE: 'Такого e-mail нет',
    FORGOT_PASSWORD_EMAIL_MESSAGE:
        'Попробуйте другой e-mail или проверьте правильность его написания',

    FORGOT_OTP_VALIDATE_TITLE: 'Неверный код',
    FORGOT_OTP_VALIDATE_MESSAGE:
        'Единовременный пароль невалиден или просрочен. Запросите пароль заново.',
};
