'use server';

import connectDB from "@/lib/db";
import Todo from "@/models/Todo.model";
import { revalidatePath } from "next/cache";

export async function createTodo(formData: FormData) {
    try {
        await connectDB();

        const title = formData.get("title") as string;

        await Todo.create({ title });

        revalidatePath("/");

        return { success: true };
    } catch (e) {
        console.error('Error creation task:', e);
        return { success: false, error: 'Cannot create task' };
    }
}

export async function getTodos() {
    try {
        await connectDB();

        const todos = await Todo.find().sort({ createdAt: -1 }).lean();

        return { success: true, todos: JSON.parse(JSON.stringify(todos)) };
    } catch (e) {
        console.error('Error retrieve todo', e);
        return { success: false, error: 'Cannot retrieve todos' }
    }
}

export async function completeTodo(id: string, isCompleted: boolean) {
    try {
        await connectDB();

        const todo = await Todo.findByIdAndUpdate(id, { isCompleted });

        if (!todo) return { success: false, error: 'Todo not found' }

        revalidatePath("/");

        return { success: true }
    } catch (e) {
        console.error('Error updating todo', e);
        return { success: false, error: 'Cannot complete todo' }
    }
}