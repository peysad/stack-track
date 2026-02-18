import { useState } from "react";
import type { Log, Category } from "../types";

interface Props {
  log: Log;
  categories: Category[];
  onUpdate: (log: Log) => void;
  onDelete: (id: string) => void;
}

export default function LogItem({
  log,
  categories,
  onUpdate,
  onDelete,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(log.task);
  const [minutes, setMinutes] = useState(log.minutes);
  const [date, setDate] = useState(log.date);

  const handleSave = () => {
    onUpdate({ ...log, task, minutes, date });
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between p-4 bg-neutral-900/70 dark:bg-neutral-100/10 backdrop-blur-md border border-neutral-700 rounded-xl hover:scale-105 transition-transform duration-200">
      {isEditing ? (
        <div className="flex gap-2 flex-1">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="p-1 border rounded-lg flex-1"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="p-1 border rounded-lg w-20"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-1 border rounded-lg"
          />
          <button onClick={handleSave} className="px-2 bg-green-600 rounded-lg">
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-2 bg-neutral-700 rounded-lg"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div>
            <p className="font-semibold">{log.task}</p>
            <p className="text-sm text-neutral-400">
              {categories.find((c) => c.id === log.categoryId)?.name ||
                "Unknown"}{" "}
              — {log.minutes} min
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 bg-blue-600 rounded-lg"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(log.id)}
              className="px-2 bg-red-600 rounded-lg"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
