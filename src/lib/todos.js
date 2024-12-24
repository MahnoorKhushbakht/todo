import { db } from './db';

export async function createTodo({ title, description }) {
  console.log({ title, description });
  try {
    const todo = await db.todo.create({
      data: {
        title,
        description,
        createdAt: new Date(), 
      },
    });
    return todo;
  } catch (error) {
    console.error("Error creating todo:", error);
    throw error; 
  }
}

export async function getTodos() {
  try {
    const todos = await db.todo.findMany({
      orderBy: { createdAt: 'desc' }, 
    });
    return todos || [];  
  } catch (error) {
    console.error("Error fetching todos:", error);
    return []; 
  }
}