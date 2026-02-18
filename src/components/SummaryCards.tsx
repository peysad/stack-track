import type { Log, Category } from "../types";
import { getWeeklyStats, getCategoryDistribution } from "../utils/stats";
import { format } from "date-fns";

interface Props {
  logs: Log[];
  categories: Category[];
}

export default function SummaryCards({ logs, categories }: Props) {
  const todayStr = format(new Date(), "yyyy-MM-dd");
  const todayMinutes = logs
    .filter((l) => l.date === todayStr)
    .reduce((sum, l) => sum + l.minutes, 0);

  const weekly = getWeeklyStats(logs);
  const weekMinutes = weekly.reduce((sum, d) => sum + d.totalMinutes, 0);

  const categoryDist = getCategoryDistribution(
    logs,
    categories.map((c) => c.id),
  );
  const topCategoryId = categoryDist.reduce(
    (prev, curr) => (curr.totalMinutes > prev.totalMinutes ? curr : prev),
    { categoryId: "", totalMinutes: 0 },
  ).categoryId;
  const topCategoryName =
    categories.find((c) => c.id === topCategoryId)?.name || "N/A";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 border border-neutral-800 rounded-lg">
        <p className="text-sm text-neutral-400">Today</p>
        <p className="text-xl font-semibold">{todayMinutes} min</p>
      </div>
      <div className="p-4 border border-neutral-800 rounded-lg">
        <p className="text-sm text-neutral-400">This Week</p>
        <p className="text-xl font-semibold">{weekMinutes} min</p>
      </div>
      <div className="p-4 border border-neutral-800 rounded-lg">
        <p className="text-sm text-neutral-400">Top Category</p>
        <p className="text-xl font-semibold">{topCategoryName}</p>
      </div>
    </div>
  );
}
