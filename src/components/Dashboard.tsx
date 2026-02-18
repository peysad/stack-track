import SummaryCards from "./SummaryCards";
import AddLogForm from "./AddLogForm";
import LogList from "./LogList";
import type { Log, Category } from "../types";

interface DashboardProps {
  logs: Log[];
  categories: Category[];
  setLogs: (logs: Log[]) => void;
}

export default function Dashboard({
  logs,
  categories,
  setLogs,
}: DashboardProps) {
  const handleAddLog = (log: Log) => {
    setLogs([log, ...logs]);
  };

  const handleUpdateLog = (updatedLog: Log) => {
    setLogs(logs.map((l) => (l.id === updatedLog.id ? updatedLog : l)));
  };

  const handleDeleteLog = (id: string) => {
    if (confirm("Delete this log?")) {
      setLogs(logs.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="grid gap-6">
      <SummaryCards logs={logs} categories={categories} />
      <AddLogForm categories={categories} onAdd={handleAddLog} />
      <LogList
        logs={logs}
        categories={categories}
        onUpdate={handleUpdateLog}
        onDelete={handleDeleteLog}
      />
    </div>
  );
}
