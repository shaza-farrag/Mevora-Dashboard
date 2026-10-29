import smallLogo from "../../assets/Small Logo.png";

const block = "animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800";

export default function UsersLoading({ slow = false })  {
  return (
    <div className="space-y-6" role="status" aria-live="polite">
      {/* Logo + text */}
      <div className="flex flex-col items-center pt-2 text-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-800">
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-b-cyan-500" />
          <img src={smallLogo} alt="Koda" className="h-12 w-12 rounded-md object-contain" />
        </div>
        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">Koda Dashboard</h2>
       <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
  {slow
    ? "Slow connection detected, still loading. Hang tight..."
    : "Loading users..."}
</p>
      </div>

      {/* Header skeleton */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className={`${block} h-3 w-40`} />
        <div className={`${block} mt-4 h-9 w-72`} />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className={`${block} h-3 w-24`} />
            <div className={`${block} mt-4 h-9 w-20`} />
            <div className={`${block} mt-4 h-3 w-32`} />
          </div>
        ))}
      </div>

      {/* Table skeleton */}
      <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4">
            <div className={`${block} h-12 w-12 shrink-0 rounded-full`} />
            <div className="flex-1 space-y-2">
              <div className={`${block} h-3 w-1/3`} />
              <div className={`${block} h-3 w-1/2`} />
            </div>
          </div>
        ))}
      </div>

      <span className="sr-only">Loading users</span>
    </div>
  );
}
