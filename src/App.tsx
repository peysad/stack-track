import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Layout from "./components/Layout";
import type { Log, Category } from "./types";
import { ThemeProvider } from "./context/ThemeContext";

const defaultCategories: Category[] = [
  { id: "frontend", name: "Frontend", color: "#6366f1" },
  { id: "backend", name: "Backend", color: "#10b981" },
  { id: "design", name: "Design", color: "#ec4899" },
];

export default function App() {
  const [logs, setLogs] = useState<Log[]>([]);

  // Load logs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("stacktrack-logs");
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  // Persist logs
  useEffect(() => {
    localStorage.setItem("stacktrack-logs", JSON.stringify(logs));
  }, [logs]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500">
        <Layout>
          <Dashboard
            logs={logs}
            categories={defaultCategories}
            setLogs={setLogs}
          />
        </Layout>
      </div>
    </ThemeProvider>
  );
}
