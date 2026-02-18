import AddLogForm from "./AddLogForm";
import LogList from "./LogList";
import type { Log, Category } from "../types";

interface DashboardProps {
  logs: Log[];
  categories: Category[];
}

export default function Dashboard({ logs, categories }: DashboardProps) {
  const handleAddLog = (log: Log) => {
    logs.unshift(log);
  };

  return (
    <div className="grid gap-6">
      <AddLogForm categories={categories} onAdd={handleAddLog} />
      <LogList logs={logs} categories={categories} />
    </div>
  );
}
