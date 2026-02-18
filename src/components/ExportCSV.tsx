import type { Log, Category } from "../types";

interface Props {
  logs: Log[];
  categories: Category[];
}

export default function ExportCSV({ logs, categories }: Props) {
  const handleExport = () => {
    const header = ["Task", "Category", "Minutes", "Date"];
    const rows = logs.map((l) => [
      l.task,
      categories.find((c) => c.id === l.categoryId)?.name || "Unknown",
      l.minutes,
      l.date,
    ]);
    const csvContent = [header, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "stacktrack_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
    >
      Export CSV
    </button>
  );
}
