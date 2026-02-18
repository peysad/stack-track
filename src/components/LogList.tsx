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
    <div className="space-y-2">
      {logs.map((log) => (
        <LogItem
          key={log.id}
          log={log}
          categories={categories}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
