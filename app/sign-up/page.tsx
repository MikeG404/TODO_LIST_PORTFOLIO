'use client'

import { registerUser } from '@/actions/authActions';
import Link from 'next/link';
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

                {globalError && (
                    <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded text-sm text-center">
                        {globalError}
                    </div>
                )}

                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="text-white text-sm">
                        Username
                    </label>
                    <input
                        type="text"
                        placeholder="JD404"
                        className="w-full py-2 ring-1 ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition"
                        {...register('username', { required: 'Username is required', minLength: { value: 3, message: 'Username must be at least 3 characters' } })}
                    />
                    {errors.username && (
                        <span className="text-red-500 text-xs">{errors.username.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-white text-sm">
                        Email
                    </label>
                    <input
                        type="email"
                        placeholder="jhon.doe@example.com"
                        className="w-full py-2 ring-1 ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition"
                        {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-xs">{errors.email.message}</span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-white text-sm">
                        Password
                    </label>
                    <input
                        type="password"
                        placeholder="*********"
                        className="w-full py-2 ring-1 ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition"
                        {...register('password', { required: 'Password is required', minLength: { value: 9, message: 'Password must be at least 9 characters' } })}
                    />
                    {errors.password && (
                        <span className="text-red-500 text-xs">{errors.password.message}</span>
                    )}
                </div>


                <button
                    type="submit"
                    className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition font-medium mt-4"
                >
                    Sign Up
                </button>

                <div className="flex justify-center">
                    <Link href="/login" className="text-white text-sm">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    );
}