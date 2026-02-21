import { useMemo, useState } from "react";
import type { FilterStatus, Todo } from "../types/todo";

export interface FilterCounts {
  all: number;
  active: number;
  completed: number;
}

export function useFilter(todos: Todo[]) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<FilterStatus>("all");

  const counts: FilterCounts = useMemo(
    () => ({
      all: todos.length,
      active: todos.filter((t) => !t.completed).length,
      completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  const filteredTodos = useMemo(() => {
    const q = search.toLowerCase();
    return todos.filter((t) => {
      const matchesStatus =
        status === "all" ||
        (status === "active" && !t.completed) ||
        (status === "completed" && t.completed);

      const matchesSearch =
        q === "" ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [todos, search, status]);

  return { search, setSearch, status, setStatus, filteredTodos, counts };
}
