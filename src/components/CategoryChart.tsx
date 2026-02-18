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

  return <Pie data={data} />;
}
