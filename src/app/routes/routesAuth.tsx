import { Route, Routes } from 'react-router';

import { LoginForm } from '~/components/auth/loginForm';
import { RegisterForm } from '~/components/auth/registerForm';
import { VerificationUser } from '~/components/auth/Verification';
import { PATH_AUTH_LOGIN, PATH_AUTH_REGISTER, PATH_AUTH_VERIFICATION } from '~/constants/auth/path';

export const RoutesAuth = () => (
    <Routes>
        <Route path={PATH_AUTH_LOGIN} element={<LoginForm />} />
        <Route path={PATH_AUTH_REGISTER} element={<RegisterForm />} />
        <Route path={PATH_AUTH_VERIFICATION} element={<VerificationUser />} />
    </Routes>
);
