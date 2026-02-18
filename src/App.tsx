import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Log, Category } from "./types";

function App() {
  const [logs, setLogs] = useLocalStorage<Log[]>("logs", []);
  const [categories, setCategories] = useLocalStorage<Category[]>(
    "categories",
    [
      { id: "coding", name: "Coding", color: "#4f46e5" },
      { id: "learning", name: "Learning", color: "#10b981" },
      { id: "meeting", name: "Meeting", color: "#f59e0b" },
    ],
  );

  return (
    <Layout>
      <Dashboard logs={logs} categories={categories} />
    </Layout>
  );
}

export default App;
