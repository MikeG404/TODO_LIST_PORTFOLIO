'use client'

import { useForm } from "react-hook-form";

interface ILoginFormInput {
    email: string;
    password: string;
}

export default function LoginPage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ILoginFormInput>();

  const onSubmit = (data: ILoginFormInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" placeholder="jhon.doe@example.com" />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="*********" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
