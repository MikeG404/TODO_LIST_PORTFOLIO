'use client'

import { registerUser } from '@/actions/authActions';
import AuthNavigation from '@/app/components/auth/AuthNavigation';
import GlobalError from '@/app/components/auth/AuthGlobalError';
import Input from '@/app/components/ui/Input';
import SubmitButton from '@/app/components/ui/SubmitButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ISignUpFormInput {
    username: string;
    email: string;
    password: string;
}

export default function SignUpPage() {
    const [globalError, setGlobalError] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<ISignUpFormInput>();

    const onSubmit = async (data: ISignUpFormInput) => {
        setGlobalError("");
        const result = await registerUser(data);
        if (result?.error) {
            setGlobalError(result.error);
        }
    }


    return (
        <div className="flex justify-center items-center mt-20">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md p-8 bg-zinc-900 border border-orange-500 rounded-lg shadow-lg flex flex-col gap-4"
            >
                <h1 className="text-2xl font-bold text-white text-center mb-4">Sign Up</h1>

                <GlobalError error={globalError} />

                <Input
                    label="Username"
                    type="text"
                    placeholder="JD404"
                    {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Username must be at least 3 characters' } })}
                    error={errors.username}
                />

                <Input
                    label="Email"
                    type="email"
                    placeholder="jhon.doe@example.com"
                    {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
                    error={errors.email}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="*********"
                    {...register('password', { required: 'Password is required', minLength: { value: 9, message: 'Password must be at least 9 characters' } })}
                    error={errors.password}
                />

                <SubmitButton>Sign Up</SubmitButton>

                <AuthNavigation
                    text="Already have an account?"
                    linkText="Login"
                    href="/login"
                />
            </form>
        </div>
    );
}