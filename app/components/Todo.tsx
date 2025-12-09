'use client'

import { completeTodo, deleteTodo } from "@/actions/todoActions";
import { useState, ChangeEvent } from "react"

interface TodoProps {
    todo: {
        _id: string;
        title: string;
        isCompleted: boolean;
    }
}

export default function Todo({ todo }: TodoProps) {
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    const handleChangeCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const { success } = await completeTodo(todo._id, checked)

        if (!success) {
            console.error('Request failed');
            return;
        }

        setIsCompleted(checked)

    }

    return (
        <div className="flex">
            <input
                type="checkbox"
                onChange={handleChangeCheckbox}
                checked={isCompleted}
            />
            <p>{todo.title}</p>
            <button
                className="text-red-500"
                onClick={() => deleteTodo(todo._id)}>X</button>
        </div>
    )
}