import dbConnect from "@/lib/db";
import { Todo } from "@/utils/models/Schema";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const url = new URL(request.url);
    const todoId = url.searchParams.get("id");

    if (!todoId) {
        return NextResponse.json(
            { error: "Todo ID is required" },
            { status: 400 }
        );
    }

    await dbConnect();

    try {
        // Find and delete the todo item
        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return NextResponse.json(
                { error: "Todo item not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Todo item deleted successfully",
            todo: deletedTodo,
        });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json(
            { error: "An error occurred while deleting the todo item" },
            { status: 500 }
        );
    }
}
