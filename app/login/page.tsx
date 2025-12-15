'use client';

import { loginUser } from '@/actions/authActions';
import AuthNavigation from '@/app/components/auth/AuthNavigation';
import GlobalError from '@/app/components/auth/AuthGlobalError';
import Input from '@/app/components/ui/Input';
import SubmitButton from '@/app/components/ui/SubmitButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface ILoginFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [globalError, setGlobalError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>();

  const onSubmit = async (data: ILoginFormInput) => {
    setGlobalError("");
    const result = await loginUser(data);
    if (result?.error) {
      setGlobalError(result.error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-zinc-900 border border-orange-500 rounded-lg shadow-lg flex flex-col gap-4"
        noValidate
      >
        <h1 className="text-2xl font-bold text-white text-center mb-4">Login</h1>

        <GlobalError error={globalError} />

        <Input
          label="Email"
          type="email"
          placeholder="jhon.doe@example.com"
          {...register('email', { required: 'Email is required' })}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          placeholder="*********"
          {...register('password', { required: 'Password is required' })}
          error={errors.password}
        />

        <SubmitButton>Login</SubmitButton>

        <AuthNavigation
          text="Don't have an account?"
          linkText="Sign Up"
          href="/sign-up"
        />
      </form>
    </div>
  );
}
