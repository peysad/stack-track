import { useEffect, useState } from "react";
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
  const [customCategories, setCustomCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("customCategories");
    if (stored) {
      setCustomCategories(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("customCategories", JSON.stringify(customCategories));
  }, [customCategories]);

  const allCategories = [...categories, ...customCategories];

  const addCustomCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;

    const exists = allCategories.some(
      (c) => c.name.toLowerCase() === name.toLowerCase(),
    );
    if (exists) return;

    const newCat: Category = {
      id: uuidv4(),
      name,
    };

    setCustomCategories((prev) => [...prev, newCat]);
    setCategoryId(newCat.id);
    setNewCategoryName("");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;

    const log: Log = {
      id: uuidv4(),
      task: task.trim(),
      categoryId,
      minutes,
      date,
      createdAt: new Date().toISOString(),
    };

    onAdd(log);
    setTask("");
    setMinutes(25);
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task name"
        className="
          p-2 rounded-lg border transition-all duration-200
          bg-zinc-100 text-zinc-800 border-zinc-300
          focus:outline-none focus:ring-2 focus:ring-violet-500
          dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
          dark:focus:ring-violet-400
        "
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        className="
          appearance-none
          p-2 rounded-lg border transition-all duration-200
          bg-zinc-100 text-zinc-800 border-zinc-300
          focus:outline-none focus:ring-2 focus:ring-violet-500
          dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
          dark:focus:ring-violet-400
        "
      >
        {allCategories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Add Custom Category */}
      <div className="flex gap-2">
        <input
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New category"
          className="
            flex-1 p-2 rounded-lg border transition-all duration-200
            bg-zinc-100 text-zinc-800 border-zinc-300
            focus:outline-none focus:ring-2 focus:ring-violet-500
            dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
            dark:focus:ring-violet-400
          "
        />
        <button
          type="button"
          onClick={addCustomCategory}
          className="
            px-3 rounded-lg text-white
            bg-indigo-600 transition-all duration-200
            hover:bg-indigo-700
            dark:bg-indigo-500 dark:hover:bg-indigo-600
          "
        >
          Add
        </button>
      </div>

      <input
        type="number"
        min={1}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        className="
          p-2 rounded-lg border transition-all duration-200
          bg-zinc-100 text-zinc-800 border-zinc-300
          focus:outline-none focus:ring-2 focus:ring-violet-500
          dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
          dark:focus:ring-violet-400
        "
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="
          p-2 rounded-lg border transition-all duration-200
          bg-zinc-100 text-zinc-800 border-zinc-300
          focus:outline-none focus:ring-2 focus:ring-violet-500
          dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
          dark:focus:ring-violet-400
        "
      />

      <button
        type="submit"
        className="
          px-4 py-2 rounded-lg text-white
          bg-indigo-600 transition-all duration-200
          hover:bg-indigo-700
          dark:bg-indigo-500 dark:hover:bg-indigo-600
        "
      >
        Add Log
      </button>
    </form>
  );
}
