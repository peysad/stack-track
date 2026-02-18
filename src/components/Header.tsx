import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-800 pb-4 mb-4 gap-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
        StackTrack
      </h1>
      <div className="flex gap-2 items-center">
        <button className="px-4 py-2 text-sm border border-neutral-700 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition">
          + Add Log
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
