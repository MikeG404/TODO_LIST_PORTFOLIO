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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col max-w-2xl">
            <div className="flex gap-4 pb-2">
                <input
                        type="text"
                        placeholder="Learn Javascript"
                        className="h-full flex-1 py-2 ring-1 ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition"
                        {...register("title", { required: "Title is required" })}
                    />
                <button
                    type="submit"
                    className=" bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                    Add
                </button>
            </div>

            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </form>
    )
}