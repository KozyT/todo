import type { Priority } from "../../types/todo";

interface Props {
  priority: Priority;
}

const config: Record<Priority, { label: string; className: string }> = {
  high: { label: "High", className: "bg-red-100 text-red-700" },
  medium: { label: "Medium", className: "bg-yellow-100 text-yellow-700" },
  low: { label: "Low", className: "bg-green-100 text-green-700" },
};

export function PriorityBadge({ priority }: Props) {
  const { label, className } = config[priority];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}
    >
      {label}
    </span>
  );
}
