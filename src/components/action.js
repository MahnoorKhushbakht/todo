'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createTodo } from "@/lib/todos"

export async function createTodoAction(formData) {
    const data = {
        title: formData.get('title'),
        description: formData.get('description'),
    }
    const error = validate(data);
    if (error) {
        return { isError: true, message: error };
    }
    const todo = await createTodo(data);
    console.log('created:', todo);
    revalidatePath('/todos');
    redirect('/todos');
}

function validate(data) {
    if (!data.title) {
        return 'Title field is required';
    }
    if (data.title.length > 50) {
        return 'Title field cannot be longer than 50 characters';
    }
    if (!data.description) {
        return 'Description field is required';
    }
    if (data.description.length > 500) {
        return 'Description field cannot be longer than 500 characters';
    }
}
