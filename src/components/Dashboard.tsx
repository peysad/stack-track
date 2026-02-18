import type { Log, Category } from "../types";

interface DashboardProps {
  logs: Log[];
  categories: Category[];
}

export default function Dashboard({ logs, categories }: DashboardProps) {
  return (
    <div className="grid gap-6">
      <div className="p-6 border border-neutral-800 rounded-xl">
        Dashboard placeholder
      </div>
    </div>
  );
}
