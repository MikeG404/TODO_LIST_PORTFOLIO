'use client';

import { completeTodo, deleteTodo, updateTodo } from '@/actions/todoActions';
import { Trash2 } from 'lucide-react';
import { useState, ChangeEvent, useRef, useEffect } from 'react';
import Checkbox from './ui/Checbox';

interface TodoProps {
  todo: {
    _id: string;
    title: string;
    isCompleted: boolean;
  };
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
    const { success } = await completeTodo(todo._id, checked);

    if (!success) {
      console.error('Request failed');
      return;
    }

    setIsCompleted(checked);
  };

  const handleChangeTitle = async (e: ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const { success } = await updateTodo(todo._id, title);

    if (!success) {
      console.error('Request failed');
      return;
    }

    setTitle(title);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <div className="w-full flex gap-6 border border-orange-500 py-6 px-4 rounded items-center">
        <Checkbox
        isCompleted={isCompleted}
        handleChangeCheckbox={handleChangeCheckbox}
        />
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          className="flex-1 ring-1 text-lg tracking-wide ring-orange-500 rounded placeholder:text-zinc-500 pl-3 text-white outline-none bg-zinc-900 focus:ring-2 focus:ring-yellow-600 transition"
          onChange={handleChangeTitle}
          onBlur={handleBlur}
        />
      ) : (
        <p
          className="flex-1 text-lg tracking-wide text-white cursor-pointer"
          onClick={() => setIsEditing(true)}
        >
          {title}
        </p>
      )}
      <button
        className="text-red-500 cursor-pointer"
        onClick={() => deleteTodo(todo._id)}
      >
        <Trash2 />
      </button>
    </div>
  );
}