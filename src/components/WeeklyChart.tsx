import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { Log } from "../types";
import { getWeeklyStats } from "../utils/stats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface Props {
  logs: Log[];
}

export default function WeeklyChart({ logs }: Props) {
  const weeklyStats = getWeeklyStats(logs);
  const data = {
    labels: weeklyStats.map((d) => d.date.slice(5)), // MM-DD
    datasets: [
      {
        label: "Minutes",
        data: weeklyStats.map((d) => d.totalMinutes),
        backgroundColor: "#4f46e5",
      },
    ],
  };

  return <Bar data={data} />;
}
