import { useState } from "react";
import type { Category, Log } from "../types";

interface Props {
  log: Log;
  categories: Category[];
  onDelete: (id: string) => void;
  onUpdate: (updated: Log) => void;
}

export default function LogItem({
  log,
  categories,
  onDelete,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(log.task);
  const [categoryId, setCategoryId] = useState(log.categoryId);
  const [minutes, setMinutes] = useState(log.minutes);
  const [date, setDate] = useState(log.date);

  const save = () => {
    onUpdate({
      ...log,
      task,
      categoryId,
      minutes,
      date,
    });
    setIsEditing(false);
  };

  return (
    <div
      className="
        p-4 rounded-xl border transition-all duration-300
        bg-white border-zinc-200
        dark:bg-zinc-900 dark:border-zinc-800
      "
    >
      {isEditing ? (
        <div className="flex flex-col gap-3">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="
              p-2 rounded-lg border transition-all duration-200
              bg-zinc-100 text-zinc-800 border-zinc-300
              focus:outline-none focus:ring-2 focus:ring-violet-500
              dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700
              dark:focus:ring-violet-400
            "
          />

          {/* ✅ FIXED EDIT DROPDOWN STYLE */}
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

          <div className="flex gap-2">
            <button
              onClick={save}
              className="
                px-3 py-1 rounded-lg text-white
                bg-indigo-600 transition-all duration-200
                hover:bg-indigo-700
                dark:bg-indigo-500 dark:hover:bg-indigo-600
              "
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="
                px-3 py-1 rounded-lg
                bg-zinc-200 text-zinc-800
                dark:bg-zinc-700 dark:text-zinc-100
              "
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-zinc-800 dark:text-zinc-100">
              {log.task}
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {log.minutes} min • {log.date}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="
                px-3 py-1 rounded-lg
                bg-zinc-200 text-zinc-800
                dark:bg-zinc-700 dark:text-zinc-100
              "
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(log.id)}
              className="
                px-3 py-1 rounded-lg text-white
                bg-red-600 hover:bg-red-700
                dark:bg-red-500 dark:hover:bg-red-600
              "
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
