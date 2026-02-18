export interface Log {
  id: string;
  task: string;
  categoryId: string;
  minutes: number;
  date: string; // ISO format: YYYY-MM-DD
  createdAt: string; // ISO datetime
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface CategoryDistribution {
  categoryId: string;
  totalMinutes: number;
  percentage: number;
}

export interface WeeklyDayStat {
  date: string; // YYYY-MM-DD
  totalMinutes: number;
}
