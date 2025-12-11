'use client'

import { loginUser } from "@/actions/authActions";
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

  const onSubmit = async (data: ILoginFormInput) => {
    await loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          placeholder="jhon.doe@example.com" 
          {...register("email", { required: true })}
          />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          placeholder="*********" 
          {...register("password", { required: true })}
          />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
