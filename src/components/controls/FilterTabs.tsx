import type { FilterStatus } from "../../types/todo";
import type { FilterCounts } from "../../hooks/useFilter";
import { cn } from "../../utils/cn";

interface Props {
  status: FilterStatus;
  counts: FilterCounts;
  onChange: (status: FilterStatus) => void;
}

const TABS: { value: FilterStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export function FilterTabs({ status, counts, onChange }: Props) {
  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
            status === tab.value
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.label}
          <span
            className={cn(
              "inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs",
              status === tab.value
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-600"
            )}
          >
            {counts[tab.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
