import { getTodos } from "@/lib/todos";
import React from "react";


const TodoList = async () => {
  const todos = await getTodos();
  return (
    <div className="mt-10 p-5 bg-green-200 rounded-md shadow-md w-full md:w-3/4 ">
      <h2 className="text-xl font-bold text-green-500 mb-4">Todo List</h2>
      {todos && todos.length > 0 ? (
        todos.map((todo, index) => (
          <div
            key={index}
            className="border-b border-green-300 pb-4 mb-4 last:border-0 last:pb-0 last:mb-0"
          >
            <div className="flex items-start space-x-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-green-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <p className="text-green-600 md:text-xl text-lg font-semibold">{todo.title}</p>
            </div>
            <p className="text-green-500 bg-green-100 p-3 rounded-md shadow-inner">
              {todo.description}
            </p>
          </div>
        ))
      ) : (
        <p className="text-green-500">No todos yet. Start adding some tasks!</p>
      )}
    </div>
  );
};

export default TodoList;
