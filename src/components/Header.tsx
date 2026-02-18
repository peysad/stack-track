export default function Header() {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between border-b border-neutral-800 pb-4 mb-4 gap-4">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        StackTrack
      </h1>
      <button
        className="px-4 py-2 text-sm border border-neutral-700 rounded-lg hover:bg-neutral-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
        aria-label="Add new log"
      >
        + Add Log
      </button>
    </header>
  );
}
