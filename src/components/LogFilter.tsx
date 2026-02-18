import type { Category } from "../types";

interface Props {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export default function LogFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
}: Props) {
  return (
    <div className="flex gap-4 items-center">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 border border-neutral-700 rounded-lg"
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border border-neutral-700 rounded-lg"
      >
        <option value="date-desc">Date Desc</option>
        <option value="date-asc">Date Asc</option>
        <option value="minutes-desc">Minutes Desc</option>
        <option value="minutes-asc">Minutes Asc</option>
      </select>
    </div>
  );
}
