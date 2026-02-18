import { useState } from "react";
import type { Category, Log } from "../types";
import { v4 as uuidv4 } from "uuid";

interface Props {
  categories: Category[];
  onAdd: (log: Log) => void;
}

export default function AddLogForm({ categories, onAdd }: Props) {
  const [task, setTask] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [minutes, setMinutes] = useState(25);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || !categoryId || minutes <= 0) return;

    onAdd({
      id: uuidv4(),
      task,
      categoryId,
      minutes,
      date,
      createdAt: new Date().toISOString(),
    });

    setTask("");
    setMinutes(25);
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-2 border border-neutral-700 rounded-lg"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="p-2 border border-neutral-700 rounded-lg"
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        min={1}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        className="p-2 border border-neutral-700 rounded-lg"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border border-neutral-700 rounded-lg"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
      >
        Add Log
      </button>
    </form>
  );
}
