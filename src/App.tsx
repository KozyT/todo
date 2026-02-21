import { useTodos } from "./hooks/useTodos";
import { useFilter } from "./hooks/useFilter";
import { Header } from "./components/layout/Header";
import { TodoForm } from "./components/todo/TodoForm";
import { TodoList } from "./components/todo/TodoList";
import { SearchBar } from "./components/controls/SearchBar";
import { FilterTabs } from "./components/controls/FilterTabs";

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const { search, setSearch, status, setStatus, filteredTodos, counts } =
    useFilter(todos);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header totalCount={todos.length} />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Add form */}
        <section className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">Add New Todo</h2>
          <TodoForm onSubmit={addTodo} submitLabel="Add Todo" />
        </section>

        {/* Controls */}
        <div className="space-y-3">
          <SearchBar value={search} onChange={setSearch} />
          <FilterTabs status={status} counts={counts} onChange={setStatus} />
        </div>

        {/* List */}
        <TodoList
          todos={filteredTodos}
          status={status}
          hasSearch={search.length > 0}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </main>
    </div>
  );
}

export default App;
