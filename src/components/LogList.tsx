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
  const [editDate, setEditDate] = useState("");

  const startEdit = (log: Log) => {
    setEditingId(log.id);
    setEditTask(log.task);
    setEditMinutes(log.minutes);
    setEditCategoryId(log.categoryId);
    setEditDate(log.date);
  };

  const saveEdit = (id: string) => {
    const updatedLog: Log = {
      id,
      task: editTask,
      minutes: editMinutes,
      categoryId: editCategoryId,
      date: editDate,
      createdAt:
        logs.find((l) => l.id === id)?.createdAt || new Date().toISOString(),
    };
    onUpdate(updatedLog);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="p-4 border rounded-lg bg-white dark:bg-neutral-900 shadow-md"
        >
          {editingId === log.id ? (
            <div className="flex flex-col gap-2">
              <input
                value={editTask}
                onChange={(e) => {
                  setEditTask(e.target.value);
                  saveEdit(log.id);
                }}
                placeholder="Task"
                className="p-2 border rounded"
              />
              <input
                type="number"
                min={1}
                value={editMinutes}
                onChange={(e) => {
                  setEditMinutes(Number(e.target.value));
                  saveEdit(log.id);
                }}
                className="p-2 border rounded"
              />
              <select
                value={editCategoryId}
                onChange={(e) => {
                  setEditCategoryId(e.target.value);
                  saveEdit(log.id);
                }}
                className="p-2 border rounded"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={editDate}
                onChange={(e) => {
                  setEditDate(e.target.value);
                  saveEdit(log.id);
                }}
                className="p-2 border rounded"
              />
              <button
                onClick={() => setEditingId(null)}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{log.task}</h3>
                <p className="text-sm">
                  {log.minutes} mins -{" "}
                  {categories.find((c) => c.id === log.categoryId)?.name ||
                    "Unknown"}{" "}
                  - {log.date}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(log)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(log.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
