import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '../constants/apiConstant';

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['auth'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        prepareHeaders: (headers) => {
            headers.set('Accept', 'application/json');
            return headers;
        },

        credentials: 'include',
    }),
    endpoints: (builder) => ({
        checkAuth: builder.query<string, void>({
            query: () => 'auth/check-auth',
        }),

        login: builder.mutation({
            query: (body) => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),

        register: builder.mutation({
            query: (body) => ({
                url: 'auth/signup',
                method: 'POST',
                body,
            }),
        }),

        refreshAuth: builder.query<string, object>({
            query: () => 'auth/refresh',
        }),

        forgotPassword: builder.mutation({
            query: (body) => ({
                url: 'auth/forgot-password',
                method: 'POST',
                body,
            }),
        }),

        verifyOTP: builder.mutation({
            query: (body) => ({
                url: 'auth/verify-otp',
                method: 'POST',
                body,
            }),
        }),

        resetPassword: builder.mutation({
            query: (body) => ({
                url: 'auth/reset-password',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useCheckAuthQuery,
    useLoginMutation,
    useRegisterMutation,
    useRefreshAuthQuery,
    useForgotPasswordMutation,
    useVerifyOTPMutation,
    useResetPasswordMutation,
} = authApi;
