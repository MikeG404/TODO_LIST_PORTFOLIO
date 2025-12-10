'use client'

import { createTodo } from "@/actions/todoActions";
import { useForm } from "react-hook-form";

interface IFormInput {
    title: string;
}

export default function TodoForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();

    const onSubmit = (data: IFormInput) => {
        createTodo(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex max-w-2xl gap-4">
            <div className="flex flex-col flex-1">
                <input
                    type="text"
                    placeholder="Learn Javascript"
                    className="h-full ring-1 ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition"
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <button
                type="submit"
                className=" bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
            >
                Add
            </button>
        </form>
    )
}