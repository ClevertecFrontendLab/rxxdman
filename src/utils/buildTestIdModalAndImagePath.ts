type returnObject = {
    testId: string;
    imagePath: string;
};

export const buildTestIdModalAndImagePath = (
    typeModal: string,
    forgotStep?: number,
): returnObject => {
    let testId = '';
    let imagePath = '';

    switch (typeModal) {
        case 'ErrorLogin':
            testId = 'sign-in-error-modal';
            imagePath = 'loginError.png';
            break;
        case 'SuccessRegister':
            testId = 'sign-up-success-modal';
            imagePath = 'registerSuccess.png';
            break;
        case 'ErrorRegister':
            testId = 'email-verification-failed-modal';
            imagePath = 'registerError.png';
            break;
        case 'ForgotPassword':
            switch (forgotStep) {
                case 1:
                    testId = 'send-email-modal';
                    imagePath = 'loginError.png';
                    break;
                case 2:
                    testId = 'verification-code-modal';
                    imagePath = 'forgotPassword.png';
                    break;
                case 3:
                    testId = 'reset-credentials-modal';
                    break;
            }
            break;
    }

    return { testId, imagePath };
};
