export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-neutral-800 pb-4">
      <h1 className="text-2xl font-semibold tracking-tight">StackTrack</h1>

      <button className="px-4 py-2 text-sm border border-neutral-700 rounded-lg hover:bg-neutral-800 transition">
        + Add Log
      </button>
    </header>
  );
}
