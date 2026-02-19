import LogItem from "./LogItem";
import type { Log, Category } from "../types";

interface Props {
  logs: Log[];
  categories: Category[];
  onUpdate: (log: Log) => void;
  onDelete: (id: string) => void;
}

export default function LogList({
  logs,
  categories,
  onUpdate,
  onDelete,
}: Props) {
  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-lg">{log.task}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {getCategoryName(log.categoryId)} — {log.minutes} min
              </p>
            </div>
            <div className="text-sm text-neutral-400">{log.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
