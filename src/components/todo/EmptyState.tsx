import type { FilterStatus } from "../../types/todo";

interface Props {
  status: FilterStatus;
  hasSearch: boolean;
}

export function EmptyState({ status, hasSearch }: Props) {
  let message: string;
  let sub: string;

  if (hasSearch) {
    message = "No results found";
    sub = "Try a different search term.";
  } else if (status === "active") {
    message = "No active todos";
    sub = "All caught up! Add a new todo above.";
  } else if (status === "completed") {
    message = "No completed todos";
    sub = "Complete some todos to see them here.";
  } else {
    message = "No todos yet";
    sub = "Add your first todo above to get started.";
  }

  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-3">📝</div>
      <p className="text-gray-600 font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-1">{sub}</p>
    </div>
  );
}
