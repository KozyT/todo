import type { FilterStatus, Todo, TodoFormData } from "../../types/todo";
import { TodoItem } from "./TodoItem";
import { EmptyState } from "./EmptyState";

interface Props {
  todos: Todo[];
  status: FilterStatus;
  hasSearch: boolean;
  onToggle: (id: string) => void;
  onUpdate: (id: string, data: TodoFormData) => void;
  onDelete: (id: string) => void;
}

export function TodoList({
  todos,
  status,
  hasSearch,
  onToggle,
  onUpdate,
  onDelete,
}: Props) {
  if (todos.length === 0) {
    return <EmptyState status={status} hasSearch={hasSearch} />;
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
