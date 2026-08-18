import React, { useState } from "react";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
};

const useTodoStore = create<TodoStore>((set) => ({
  todos: [{ id: uuidv4(), name: "tset", completed: false }],
  addTodo: (text) =>
    set((state) => ({ todos: [...state.todos, { id: uuidv4(), name: text, completed: false }] })),
  removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),
}));

const Todo = () => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();
  const [input, setInput] = useState<string>("");

  const handleText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput("");
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* タスク一覧 */}
      <h2 className="font-bold">タスク一覧</h2>
      <div className="flex border">
        {todos.length > 0 ? (
          <ul className="mb-10">
            {todos.map((todo) => (
              <li key={todo.id} onClick={() => toggleTodo(todo.id)} className="flex">
                <p
                  className={`${todo.completed ? "line-through" : ""} flex items-center justify-center px-20 bg-white text-black`}
                >
                  {todo.name}
                </p>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="cursor-pointer text-red-300 px-3 bg-blue-800 p-2 text-yellow-300 rounded border"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>タスクが空です</p>
        )}
      </div>

      {/* タスク操作 */}
      <div>
        <input
          type="text"
          value={input}
          onChange={handleText}
          onKeyDown={handleEnter}
          className="border rounded text-white py-1 pr-1"
        />
        <button
          onClick={handleAdd}
          className="ml-5 border p-2 rounded-lg bg-blue-800 text-white cursor-pointer hover:opacity-"
        >
          追加
        </button>
      </div>
    </div>
  );
};

export default Todo;
