'use server';

import connectDB from "@/lib/db";
import Todo from "@/models/Todo.model";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/session";

export async function createTodo({ title }: { title: string }) {
    try {
        await connectDB();

        const session = await getSession();

        if (!session) return { success: false, error: 'User not authenticated' }

        await Todo.create({ title, user: session.userId });

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

        const session = await getSession();

        if (!session) return { success: false, error: 'User not authenticated' }

        const todos = await Todo.find({ user: session.userId }).sort({ createdAt: -1 }).lean();

        return { success: true, todos: JSON.parse(JSON.stringify(todos)) };
    } catch (e) {
        console.error('Error retrieve todo', e);
        return { success: false, error: 'Cannot retrieve todos' }
    }
}

export async function deleteTodo(id: string) {
    try {
        await connectDB();

        const session = await getSession();

        if (!session) return { success: false, error: 'User not authenticated' }

        const todo = await Todo.findByIdAndDelete(id);

        if (!todo) return { success: false, error: 'Todo not found' }

        revalidatePath("/");

        return { success: true }
    } catch (error) {
        console.error('Error deleting todo', error);
        return { success: false, error: 'Cannot delete todo' }
    }
}

export async function updateTodo(id: string, title: string) {
    try {
        await connectDB();

        const session = await getSession();

        if (!session) return { success: false, error: 'User not authenticated' }

        const todo = await Todo.findByIdAndUpdate(id, { title });

        if (!todo) return { success: false, error: 'Todo not found' }

        revalidatePath("/");

        return { success: true }
    } catch (e) {
        console.error('Error updating todo', e);
        return { success: false, error: 'Cannot update todo' }
    }
}

export async function completeTodo(id: string, isCompleted: boolean) {
    try {
        await connectDB();

        const session = await getSession();

        if (!session) return { success: false, error: 'User not authenticated' }

        const todo = await Todo.findByIdAndUpdate(id, { isCompleted });

        if (!todo) return { success: false, error: 'Todo not found' }

        revalidatePath("/");

        return { success: true }
    } catch (e) {
        console.error('Error updating todo', e);
        return { success: false, error: 'Cannot complete todo' }
    }
}