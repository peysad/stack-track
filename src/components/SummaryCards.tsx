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
      {[
        {
          label: "Today",
          value: todayMinutes,
          color: "from-indigo-500 to-indigo-700",
        },
        {
          label: "This Week",
          value: weekMinutes,
          color: "from-green-500 to-green-700",
        },
        {
          label: "Top Category",
          value: topCategoryName,
          color: "from-pink-500 to-pink-700",
        },
      ].map((card) => (
        <div
          key={card.label}
          className={`p-6 rounded-2xl bg-gradient-to-br ${card.color} shadow-lg flex flex-col justify-center items-center text-white`}
        >
          <p className="text-sm">{card.label}</p>
          <p className="text-2xl font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
