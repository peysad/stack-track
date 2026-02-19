import { useState, useMemo } from "react";
import SummaryCards from "./SummaryCards";
import AddLogForm from "./AddLogForm";
import LogList from "./LogList";
import CategoryChart from "./CategoryChart";
import WeeklyChart from "./WeeklyChart";
import LogFilter from "./LogFilter";
import ExportCSV from "./ExportCSV";
import type { Log, Category } from "../types";

interface DashboardProps {
  logs: Log[];
  categories: Category[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
}

export default function Dashboard({
  logs,
  categories,
  setLogs,
}: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredLogs = useMemo(() => {
    return [...logs]
      .filter((l) => !selectedCategory || l.categoryId === selectedCategory)
      .sort((a, b) => {
        if (sortBy === "date-desc") return b.date.localeCompare(a.date);
        if (sortBy === "date-asc") return a.date.localeCompare(b.date);
        if (sortBy === "minutes-desc") return b.minutes - a.minutes;
        if (sortBy === "minutes-asc") return a.minutes - b.minutes;
        return 0;
      });
  }, [logs, selectedCategory, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <SummaryCards logs={logs} categories={categories} />

        <AddLogForm
          categories={categories}
          onAdd={(log) => setLogs((prev) => [log, ...prev])}
        />

        <ExportCSV logs={logs} categories={categories} />
      </div>

      <div className="space-y-6">
        <LogFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <CategoryChart logs={logs} categories={categories} />
        <WeeklyChart logs={logs} />

        <LogList
          logs={filteredLogs}
          categories={categories}
          onUpdate={(log) =>
            setLogs((prev) => prev.map((l) => (l.id === log.id ? log : l)))
          }
          onDelete={(id) => setLogs((prev) => prev.filter((l) => l.id !== id))}
        />
      </div>
    </div>
  );
}
