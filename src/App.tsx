import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import type { Log, Category } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";

const defaultCategories: Category[] = [
  { id: "frontend", name: "Frontend", color: "#6366f1" },
  { id: "backend", name: "Backend", color: "#10b981" },
  { id: "design", name: "Design", color: "#ec4899" },
];

export default function App() {
  // Use local storage for logs
  const [logs, setLogs] = useLocalStorage<Log[]>("stacktrack-logs", []);
  // Persist custom categories as well
  const [customCategories, setCustomCategories] = useLocalStorage<Category[]>(
    "stacktrack-custom-categories",
    [],
  );

  const allCategories = [...defaultCategories, ...customCategories];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
      <Layout>
        <Dashboard
          logs={logs}
          setLogs={setLogs}
          categories={allCategories}
          setCustomCategories={setCustomCategories} // pass setter for custom categories
        />
      </Layout>
    </div>
  );
}
