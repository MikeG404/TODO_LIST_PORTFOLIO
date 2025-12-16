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

        // Find the item with the highest order to put the new one at the end (or beginning)
        // Here we put it at the end (highest order + 1)
        const lastTodo = await Todo.findOne({ user: session.userId }).sort({ order: -1 });
        const newOrder = lastTodo && lastTodo.order !== undefined ? lastTodo.order + 1 : 0;

        await Todo.create({ title, user: session.userId, order: newOrder });

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

        // Sort by 'order' ascending (0, 1, 2...) instead of createdAt
        const todos = await Todo.find({ user: session.userId }).sort({ order: 1 }).lean();

        return { success: true, todos: JSON.parse(JSON.stringify(todos)) };
    } catch (e) {
        console.error('Error retrieve todo', e);
        return { success: false, error: 'Cannot retrieve todos' }
    }
}

export async function reorderTodos(items: { id: string; order: number }[]) {
    try {
        await connectDB();

        const session = await getSession();
        if (!session) return { success: false, error: 'Not authenticated' };

        // We use a transaction or bulkWrite for better performance/safety with multiple updates
        // But for simplicity in this portfolio, we'll use Promise.all
        // ensuring we only update todos that belong to the user
        const updates = items.map((item) =>
            Todo.findOneAndUpdate(
                { _id: item.id, user: session.userId },
                { order: item.order }
            )
        );

        await Promise.all(updates);

        revalidatePath('/');
        return { success: true };
    } catch (error) {
        console.error('Failed to reorder todos:', error);
        return { success: false, error: 'Failed to reorder todos' };
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