import { Route, Routes } from 'react-router';

import { LoginForm } from '~/components/auth/loginForm';
import { RegisterForm } from '~/components/auth/registerForm';
import { VerificationUser } from '~/components/auth/Verification';
import { PATHS } from '~/constants/path';

export const RoutesAuth = () => (
    <Routes>
        <Route path={PATHS.AUTH_LOGIN} element={<LoginForm />} />
        <Route path={PATHS.AUTH_REGISTER} element={<RegisterForm />} />
        <Route path={PATHS.AUTH_VERIFICATION} element={<VerificationUser />} />
    </Routes>
);
