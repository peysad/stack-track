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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:items-end gap-4 flex-wrap"
      aria-label="Add new log form"
    >
      <input
        type="text"
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="p-2 rounded-xl border-0 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-neutral-400"
        aria-label="Task name"
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="p-2 rounded-xl border-0 bg-gradient-to-r from-neutral-800 to-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Select category"
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
        className="p-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        aria-label="Minutes spent"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        aria-label="Select date"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-xl hover:scale-105 transition-transform text-white shadow-lg"
        aria-label="Add log"
      >
        Add Log
      </button>
    </form>
  );
}
