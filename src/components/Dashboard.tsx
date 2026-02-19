import { useState } from "react";
import AddLogDrawer from "./AddLogDrawer";
import Header from "./Header";

export default function Dashboard({
  logs,
  categories,
  setLogs,
}: DashboardProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleAddLog = (log: any) => {
    setLogs([log, ...logs]);
  };

  return (
    <div className="grid gap-6">
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

      <CategoryChart logs={logs} categories={categories} />
      <WeeklyChart logs={logs} />
      <LogList
        logs={filteredLogs}
        categories={categories}
        onUpdate={(log) =>
          setLogs(logs.map((l) => (l.id === log.id ? log : l)))
        }
        onDelete={(id) => setLogs(logs.filter((l) => l.id !== id))}
      />
    </div>
  );
}
