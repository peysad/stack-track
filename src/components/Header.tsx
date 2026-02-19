import { useThemeToggle } from "../context/ThemeContext";

export default function Header({ onAdd }: { onAdd: () => void }) {
  const toggleTheme = useThemeToggle();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-4 mb-4 gap-4 transition-colors duration-500 bg-white dark:bg-neutral-950">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-[gradient_3s_ease_infinite]">
        StackTrack
      </h1>

      <div className="flex gap-3">
        <button
          onClick={toggleTheme}
          className="px-3 py-2 text-sm border rounded-lg border-neutral-700 dark:border-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-300"
        >
          Toggle Theme
        </button>

        <button
          onClick={onAdd}
          className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:scale-105 transition-transform duration-300"
        >
          + Add Log
        </button>
      </div>
    </header>
  );
}
