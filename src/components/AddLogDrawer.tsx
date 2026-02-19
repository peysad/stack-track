import { useEffect } from "react";
import AddLogForm from "./AddLogForm";

interface Props {
  open: boolean;
  onClose: () => void;
  categories: any[];
  onAdd: (log: any) => void;
}

export default function AddLogDrawer({
  open,
  onClose,
  categories,
  onAdd,
}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-neutral-900 shadow-xl transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Log</h2>
          <button onClick={onClose} className="text-sm">
            ✕
          </button>
        </div>

        <div className="p-6">
          <AddLogForm
            categories={categories}
            onAdd={(log) => {
              onAdd(log);
              onClose();
            }}
          />
        </div>
      </div>
    </>
  );
}
