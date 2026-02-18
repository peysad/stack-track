import type { Log, Category } from "../types";

interface Props {
  logs: Log[];
  categories: Category[];
}

export default function LogList({ logs, categories }: Props) {
  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || "Unknown";

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div
          key={log.id}
          className="flex justify-between p-4 border border-neutral-800 rounded-lg"
        >
          <div>
            <p className="font-semibold">{log.task}</p>
            <p className="text-sm text-neutral-400">
              {getCategoryName(log.categoryId)} — {log.minutes} min
            </p>
          </div>
          <div className="text-sm text-neutral-500">{log.date}</div>
        </div>
      ))}
    </div>
  );
}
