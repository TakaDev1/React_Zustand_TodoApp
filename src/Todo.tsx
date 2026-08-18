import React from "react";
import {} from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

const Todo = () => {
  return <div>Todo</div>;
};

export default Todo;
