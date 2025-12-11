'use client'

import { useForm } from 'react-hook-form';

interface ISignUpFormInput {
    username: string;
    email: string;
    password: string;
}

export default function SignUpPage() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<ISignUpFormInput>();

    const onSubmit = (data: ISignUpFormInput) => {
        console.log(data);
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    placeholder="JD404"
                    {...register('username')}
                    />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    placeholder="jhon.doe@example.com"
                    {...register('email')}      
                    />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    placeholder="*********" 
                    {...register('password')}
                    />
            </div>
            <button type='submit'>Sign Up</button>
        </form>
    );
}