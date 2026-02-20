import { useState } from "react";
import AddLogDrawer from "./AddLogDrawer";
import Header from "./Header";
import SummaryCards from "./SummaryCards";
import LogFilter from "./LogFilter";
import ExportCSV from "./ExportCSV";
import CategoryChart from "./CategoryChart";
import WeeklyChart from "./WeeklyChart";
import LogList from "./LogList";
import type { Log, Category } from "../types";

interface DashboardProps {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
  categories: Category[];
  setCustomCategories?: React.Dispatch<React.SetStateAction<Category[]>>; // optional
}
export default function Dashboard({
  logs,
  setLogs,
  categories,
}: DashboardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");

  const filteredLogs = logs
    .filter((l: Log) => !selectedCategory || l.categoryId === selectedCategory)
    .sort((a: Log, b: Log) => {
      if (sortBy === "date-desc") return b.date.localeCompare(a.date);
      if (sortBy === "date-asc") return a.date.localeCompare(b.date);
      if (sortBy === "minutes-desc") return b.minutes - a.minutes;
      if (sortBy === "minutes-asc") return a.minutes - b.minutes;
      return 0;
    });

  const handleAddLog = (log: Log) => {
    setLogs([log, ...logs]);
  };

  return (
    <div className="space-y-6">
      <Header onAdd={() => setDrawerOpen(true)} />
      <AddLogDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        categories={categories}
        onAdd={handleAddLog}
      />
      <SummaryCards logs={logs} categories={categories} />
      <LogFilter
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="flex justify-end">
        <ExportCSV logs={logs} categories={categories} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LogList
            logs={filteredLogs}
            categories={categories}
            onUpdate={(log: Log) =>
              setLogs(logs.map((l: Log) => (l.id === log.id ? log : l)))
            }
            onDelete={(id: string) =>
              setLogs(logs.filter((l: Log) => l.id !== id))
            }
          />
        </div>
        <div className="space-y-6">
          <CategoryChart logs={logs} categories={categories} />
          <WeeklyChart logs={logs} />
        </div>
      </div>
    </div>
  );
}
