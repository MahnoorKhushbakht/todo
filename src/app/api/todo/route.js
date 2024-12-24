import dbConnect from "@/lib/db";
import { Todo } from "@/utils/models/Schema";
import { NextResponse } from "next/server";

export async function GET(){
    await dbConnect();
    try{
    const todo = await Todo.find()
    return NextResponse.json({data:todo})
    }
    catch(e){
        console.error("GET Error:", error);
        return NextResponse.status(500).json({ error: error.message });
    }
}

export async function POST(request){
    try{
    const body = await request.json()
    const {todo} = body;
    await dbConnect();
    const todos = await Todo.create({todo})
    console.log("Saved todos:", todos);
    return NextResponse.json({ data: todos });
} catch (error) {
    console.error("POST Error:", error);
    return NextResponse.status(500).json({ error: error.message });
}
}

export async function DELETE(request){
    const url = new URL(request.url);
    const todoId = url.searchParams.get('id');
    console.log('todo',todoId)
    if (!todoId) {
      throw new Error('todo ID is required');
    }

    await dbConnect();
try{

    const todo = await Todo.findByIdAndDelete(todoId);
    console.log('todo',todo)
    if (!todo) {
      throw new Error('todo item not found');
    }

  
    await Todo.findByIdAndUpdate(todo._id);

    return NextResponse.json({ message: 'todo item deleted successfully' });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}

