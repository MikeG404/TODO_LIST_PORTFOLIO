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

        return { success: true};
    } catch (e) {
        console.error('Error creation task:', e);
        return { success: false, error: 'Cannot create task'};
    }
}

export async function getTodos() {
    try {
        await connectDB();

        const todos = await Todo.find();
        
        return {success: true, todos};
    } catch (e) {
        console.error('Error retrieve tasks', e);
        return { success: false, error: 'Cannot retrieve tasks'}
    }
}