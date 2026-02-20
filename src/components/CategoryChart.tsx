import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import type { Log, Category } from "../types";
import { getCategoryDistribution } from "../utils/stats";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  logs: Log[];
  categories: Category[];
}

export default function CategoryChart({ logs, categories }: Props) {
  const distribution = getCategoryDistribution(
    logs,
    categories.map((c) => c.id),
  );

  const data = {
    labels: distribution.map(
      (d) => categories.find((c) => c.id === d.categoryId)?.name || "N/A",
    ),
    datasets: [
      {
        data: distribution.map((d) => d.totalMinutes),
        backgroundColor: categories.map((c) => c.color || "#888"),
      },
    ],
  };

  return (
    <div className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
      <Pie data={data} />
    </div>
  );
}
