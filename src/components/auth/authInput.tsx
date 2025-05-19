import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { FC, useState } from 'react';
import {
    FieldError,
    FieldErrorsImpl,
    FieldValues,
    Merge,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
    Validate,
} from 'react-hook-form';

type TypeInputAuth = 'password' | 'text' | 'password_repeat';

type AuthInputProps = {
    title: string;
    placeholder: string;
    helperText?: string;

    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;

    registerForm: UseFormRegister<FieldValues>;
    trigger?: UseFormTrigger<FieldValues>;
    setValueForm?: UseFormSetValue<FieldValues>;
    inputName: string;
    error:
        | FieldError
        | Merge<FieldError, FieldErrorsImpl>
        | FetchBaseQueryError
        | SerializedError
        | undefined;

    type?: TypeInputAuth;

    required?: boolean | string;

    minLenght?: number;
    minLenghtError?: string;

    maxLenght?: number;
    maxLenghtError?: string;

    testId?: string;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>> | undefined;
};

export const AuthInput: FC<AuthInputProps> = ({
    title,
    placeholder,
    helperText,
    type = 'text',
    registerForm,
    inputName,
    error,
    setValue,
    value,
    required,
    minLenght,
    minLenghtError,
    maxLenght,
    maxLenghtError,
    validate,
    testId,
    trigger,
    setValueForm,
}) => {
    const [typePassword, setTypePassword] = useState(type);

    const onMouseDownShowPassword = () => {
        if (type === 'password') setTypePassword('text');
    };
    const onMouseUpShowPassword = () => {
        if (type === 'password') setTypePassword('password');
    };

    return (
        <FormControl isInvalid={error ? true : false}>
            <FormLabel fontWeight='400' fontSize='16px' lineHeight='24px' mb='4px' color='black'>
                {title}
            </FormLabel>

            <InputGroup size='lg'>
                <Input
                    data-test-id={testId}
                    variant='outline'
                    bg='white'
                    color='rgba(19, 75, 0, 1)'
                    fontSize='18px'
                    fontWeight='400'
                    lineHeight='100%'
                    border='1px solid rgba(215, 255, 148, 1)'
                    placeholder={placeholder}
                    type={type === 'password' ? typePassword : type}
                    value={value}
                    {...registerForm(inputName, {
                        required: required,

                        minLength: {
                            value: minLenght || 0,
                            message: minLenghtError || 'Ошибка минимальной длины',
                        },
                        maxLength: {
                            value: maxLenght || 999999,
                            message: maxLenghtError || 'Ошибка максимальной длины',
                        },

                        validate: validate || {},

                        onChange: (event) => setValue(event.target.value),

                        onBlur: async (event) => {
                            setValue(event.target.value.trim());

                            if (trigger && setValueForm) {
                                setValueForm(inputName, event.target.value.trim());
                                await trigger(inputName);
                            }
                        },
                    })}
                />

                {(type === 'password' || type === 'password_repeat') && (
                    <InputRightElement
                        data-test-id='password-visibility-button'
                        p='0'
                        cursor='pointer'
                        onMouseDown={onMouseDownShowPassword}
                        onMouseUp={onMouseUpShowPassword}
                    >
                        {type === 'password' ? (
                            typePassword === 'password' ? (
                                <ViewOffIcon />
                            ) : (
                                <ViewIcon />
                            )
                        ) : (
                            <ViewIcon />
                        )}
                    </InputRightElement>
                )}
            </InputGroup>

            {helperText && (
                <FormHelperText
                    fontSize='12px'
                    lineHeight='16px'
                    fontWeight='400'
                    color='blackAlpha.700'
                    textAlign='left'
                >
                    {helperText}
                </FormHelperText>
            )}

            {error && <FormErrorMessage>{error.message?.toString()}</FormErrorMessage>}
        </FormControl>
    );
};
