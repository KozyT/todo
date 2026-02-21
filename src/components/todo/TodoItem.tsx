import { useState } from "react";
import type { Todo, TodoFormData } from "../../types/todo";
import { PriorityBadge } from "../controls/PriorityBadge";
import { TodoForm } from "./TodoForm";
import { Confetti } from "./Confetti";
import { cn } from "../../utils/cn";

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: TodoFormData) => void;
  onDelete: (id: string) => void;
}

const priorityBorderClass: Record<Todo["priority"], string> = {
  high: "border-l-red-500",
  medium: "border-l-yellow-500",
  low: "border-l-green-500",
};

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  function handleToggle() {
    if (!todo.completed) setShowConfetti(true);
    onToggle(todo.id);
  }

  function handleUpdate(data: TodoFormData) {
    onUpdate(todo.id, data);
    setIsEditing(false);
  }

  function handleDelete() {
    if (window.confirm(`Delete "${todo.title}"?`)) {
      onDelete(todo.id);
    }
  }

  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl shadow-sm border border-l-4 p-4 transition-opacity",
        priorityBorderClass[todo.priority],
        todo.completed && "opacity-75"
      )}
    >
      {showConfetti && <Confetti onDone={() => setShowConfetti(false)} />}
      {isEditing ? (
        <TodoForm
          initialData={{
            title: todo.title,
            description: todo.description,
            priority: todo.priority,
          }}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          submitLabel="Save"
        />
      ) : (
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p
                className={cn(
                  "text-sm font-medium text-gray-900 break-words",
                  todo.completed && "line-through text-gray-400"
                )}
              >
                {todo.title}
              </p>
              <div className="flex items-center gap-1 flex-shrink-0 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                  aria-label="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                  aria-label="Delete"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            {todo.description && (
              <p
                className={cn(
                  "mt-1 text-xs text-gray-500 break-words",
                  todo.completed && "line-through"
                )}
              >
                {todo.description}
              </p>
            )}
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <PriorityBadge priority={todo.priority} />
              <span className="text-xs text-gray-400">
                作成: {new Date(todo.createdAt).toLocaleDateString("ja-JP")}
              </span>
              {todo.updatedAt !== todo.createdAt && (
                <span className="text-xs text-gray-400">
                  更新: {new Date(todo.updatedAt).toLocaleDateString("ja-JP")}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
