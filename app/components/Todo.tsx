'use client'

import { completeTodo, deleteTodo, updateTodo } from "@/actions/todoActions";
import { useState, ChangeEvent, useRef, useEffect } from "react"

interface TodoProps {
    todo: {
        _id: string;
        title: string;
        isCompleted: boolean;
    }
}

export default function Todo({ todo }: TodoProps) {
    const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

    const [title, setTitle] = useState(todo.title);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleChangeCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
        const checked = e.target.checked;
        const { success } = await completeTodo(todo._id, checked)

        if (!success) {
            console.error('Request failed');
            return;
        }

        setIsCompleted(checked)

    }

    const handleChangeTitle = async (e: ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        const { success } = await updateTodo(todo._id, title)

        if (!success) {
            console.error('Request failed');
            return;
        }

        setTitle(title)
    }

    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        <div className="flex">
            <input
                type="checkbox"
                onChange={handleChangeCheckbox}
                checked={isCompleted}
            />
            {isEditing ?
                <input
                    ref={inputRef}
                    type="text"
                    value={title}
                    onChange={handleChangeTitle}
                    onBlur={handleBlur}
                />
                :
                <p onClick={() => setIsEditing(true)}>{title}</p>
            }
            <button
                className="text-red-500"
                onClick={() => deleteTodo(todo._id)}>X</button>
        </div >
    )
}