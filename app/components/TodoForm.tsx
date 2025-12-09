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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md flex gap-2 mb-8">
            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Nouvelle tâche..."
                    className="flex-grow p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("title", { required: "Le titre est requis" })}
                />
                {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Ajouter
            </button>
        </form>
    )
}