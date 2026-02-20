import { useState } from "react";
import type { Log, Category } from "../types";

interface Props {
  logs: Log[];
  categories: Category[];
  onUpdate: (log: Log) => void;
  onDelete: (id: string) => void;
}

export default function LogList({
  logs,
  categories,
  onUpdate,
  onDelete,
}: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState("");
  const [editMinutes, setEditMinutes] = useState(0);
  const [editCategoryId, setEditCategoryId] = useState("");

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || "Unknown";

  const startEdit = (log: Log) => {
    setEditingId(log.id);
    setEditTask(log.task);
    setEditMinutes(log.minutes);
    setEditCategoryId(log.categoryId);
  };

  const saveEdit = () => {
    onUpdate({
      id: log.id,
      task: log.task,
      minutes: log.minutes,
      categoryId: log.categoryId,
      date: log.date,
      createdAt: log.createdAt,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition"
        >
          {editingId === log.id ? (
            <div className="space-y-3">
              <input
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-lg"
              />
              <select
                value={editCategoryId}
                onChange={(e) => setEditCategoryId(e.target.value)}
                className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-lg"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={editMinutes}
                onChange={(e) => setEditMinutes(Number(e.target.value))}
                className="w-full p-2 border border-neutral-300 dark:border-neutral-700 rounded-lg"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(log.id)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">{log.task}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {getCategoryName(log.categoryId)} — {log.minutes} min
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-sm text-neutral-400">{log.date}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(log)}
                    className="text-sm px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(log.id)}
                    className="text-sm px-3 py-1 rounded-lg border border-red-300 dark:border-red-700 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
