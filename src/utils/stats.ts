import type { Log, CategoryDistribution, WeeklyDayStat } from "../types";
import { startOfWeek, addDays, format, parseISO } from "date-fns";

export function getWeeklyStats(logs: Log[]): WeeklyDayStat[] {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 }); // Sunday start
  const result: WeeklyDayStat[] = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    const dayStr = format(day, "yyyy-MM-dd");
    const totalMinutes = logs
      .filter((l) => l.date === dayStr)
      .reduce((sum, l) => sum + l.minutes, 0);

    result.push({ date: dayStr, totalMinutes });
  }

  return result;
}

export function getCategoryDistribution(
  logs: Log[],
  categories: string[],
): CategoryDistribution[] {
  const totalMinutes = logs.reduce((sum, l) => sum + l.minutes, 0);
  return categories.map((id) => {
    const categoryTotal = logs
      .filter((l) => l.categoryId === id)
      .reduce((sum, l) => sum + l.minutes, 0);
    return {
      categoryId: id,
      totalMinutes: categoryTotal,
      percentage: totalMinutes ? (categoryTotal / totalMinutes) * 100 : 0,
    };
  });
}
