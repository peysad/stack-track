import { useTheme } from "../context/ThemeContext";

export default function Header({ onAdd }: { onAdd: () => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-800 dark:border-neutral-800 border-neutral-200 pb-4 mb-4 gap-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        StackTrack
      </h1>

      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 text-sm border border-neutral-700 dark:border-neutral-700 border-neutral-300 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
        >
          {theme === "dark" ? "Light" : "Dark"}
        </button>

        <button
          onClick={onAdd}
          className="px-4 py-2 text-sm bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
        >
          + Add Log
        </button>
      </div>
    </header>
  );
}
