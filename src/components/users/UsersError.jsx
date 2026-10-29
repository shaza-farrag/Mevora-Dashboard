import { WifiOff, RefreshCw } from "lucide-react";

export default function UsersError({ message, onRetry }) {
  return (
    <div
      role="alert"
      className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-500 dark:bg-red-500/15">
        <WifiOff size={28} />
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
        Couldn&apos;t load users
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{message}</p>
      <button
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600"
      >
        <RefreshCw size={16} />
        Try again
      </button>
    </div>
  );
}