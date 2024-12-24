'use client';

import { createTodoAction } from "./action";
import { useState } from "react";

export default function TodoForm() {
  const [state, setState] = useState({ error: null, loading: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState({ error: null, loading: true });
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createTodoAction(formData);
    console.log('result:', result);

    if (result?.isError) {
      setState({ error: result, loading: false });
    } else {
      setState({ error: null, loading: false });
      form.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-blue-200 rounded-md shadow-md w-full md:w-3/4">
        <h1 className="text-xl text-blue-500 p-3 font-bold">
          Add a New <span className="font-bold uppercase text-blue-600">Task</span>
        </h1>

        <div className="flex flex-col md:flex-row md:space-x-1 p-2">
          {/* Task Title */}
          <div className="mb-4 w-full md:w-auto"> 
            <label className="block text-blue-400 text-sm font-bold mb-2" htmlFor="title">
              Task Title
            </label>
            <input
              required
              maxLength={50}
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title"
              className="border border-blue-400 text-white bg-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white placeholder-white transition duration-300 ease-in-out transform hover:scale-105 w-3/4"
            />
          </div>

          {/* Task Description */}
          <div className="mb-4 w-full md:w-2/3"> 
            <label className="block text-blue-400 text-sm font-bold mb-2" htmlFor="description">
              Task Description
            </label>
            <textarea
              required
              maxLength={500}
              id="description"
              rows="2"
              name="description"
              placeholder="Enter task description"
              className="border border-blue-400 text-white bg-blue-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-white placeholder-white transition duration-300 ease-in-out transform hover:scale-105 w-2/4"
            ></textarea>
          </div>
        </div>

        {/* Error Message */}
        {Boolean(state.error) && (
          <p className="text-white p-3">{state.error.message}</p>
        )}

        {/* Submit Button */}
        <button
          disabled={state.loading}
          className="m-3 bg-white text-blue-500 font-bold p-2 rounded-md hover:bg-blue-400 hover:text-white transition duration-300 ease-in-out disabled:bg-slate-500 disabled:cursor-not-allowed"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
