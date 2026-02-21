interface Props {
  totalCount: number;
}

export function Header({ totalCount }: Props) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">✅</span>
          <h1 className="text-xl font-bold text-gray-900">Todo App</h1>
        </div>
        {totalCount > 0 && (
          <span className="text-sm text-gray-500">
            {totalCount} {totalCount === 1 ? "item" : "items"}
          </span>
        )}
      </div>
    </header>
  );
}
