import { useState } from "react";
import type { Todo, TodoFormData } from "../types/todo";
import { loadTodos, saveTodos } from "../utils/localStorage";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());

  function addTodo(data: TodoFormData): void {
    const now = Date.now();
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      description: data.description.trim(),
      priority: data.priority,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };
    const next = [newTodo, ...todos];
    setTodos(next);
    saveTodos(next);
  }

  function updateTodo(id: string, data: TodoFormData): void {
    const next = todos.map((t) =>
      t.id === id
        ? {
            ...t,
            title: data.title.trim(),
            description: data.description.trim(),
            priority: data.priority,
            updatedAt: Date.now(),
          }
        : t
    );
    setTodos(next);
    saveTodos(next);
  }

  function deleteTodo(id: string): void {
    const next = todos.filter((t) => t.id !== id);
    setTodos(next);
    saveTodos(next);
  }

  function toggleTodo(id: string): void {
    const next = todos.map((t) =>
      t.id === id
        ? { ...t, completed: !t.completed, updatedAt: Date.now() }
        : t
    );
    setTodos(next);
    saveTodos(next);
  }

  return { todos, addTodo, updateTodo, deleteTodo, toggleTodo };
}
