export type Priority = "high" | "medium" | "low";
export type FilterStatus = "all" | "active" | "completed";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
  updatedAt: number;
}

export interface TodoFormData {
  title: string;
  description: string;
  priority: Priority;
}
