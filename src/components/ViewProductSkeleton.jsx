export default function ViewProductSkeleton() {
  return (
    <div className="w-full min-w-0 animate-pulse space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="space-y-4 rounded-3xl bg-slate-200 p-6 dark:bg-zinc-800 sm:p-8">
        <div className="h-4 w-20 rounded bg-slate-300 dark:bg-zinc-700" />
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-slate-300 dark:bg-zinc-700" />
          <div className="flex-1 space-y-3">
            <div className="h-8 w-2/3 max-w-72 rounded bg-slate-300 dark:bg-zinc-700" />
            <div className="h-4 w-48 max-w-full rounded bg-slate-300 dark:bg-zinc-700" />
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Images */}
        <div className="min-w-0 space-y-4">
          <div className="h-[300px] rounded-3xl bg-slate-200 dark:bg-zinc-800 sm:h-[420px]" />
          <div className="flex gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-20 w-24 rounded-xl bg-slate-200 dark:bg-zinc-800"
              />
            ))}
          </div>
          <div className="h-72 rounded-3xl bg-slate-200 dark:bg-zinc-800" />
        </div>

        {/* Product information */}
        <div className="min-w-0 space-y-5">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-4 w-24 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-8 w-3/4 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-slate-100 dark:bg-zinc-800" />
            <div className="h-4 w-5/6 rounded bg-slate-100 dark:bg-zinc-800" />
            <div className="h-4 w-2/3 rounded bg-slate-100 dark:bg-zinc-800" />
          </div>

          {/* Price, discount, stock and SKU */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-zinc-800" />
                <div className="h-6 w-28 rounded bg-slate-200 dark:bg-zinc-800" />
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-5 w-24 rounded bg-slate-200 dark:bg-zinc-800" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-7 w-16 rounded-full bg-slate-200 dark:bg-zinc-800"
                />
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="space-y-3 rounded-3xl bg-slate-100 p-5 dark:bg-zinc-800">
            <div className="h-5 w-32 rounded bg-slate-200 dark:bg-zinc-700" />
            <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-zinc-700" />
          </div>

          {/* Highlights */}
          <div className="space-y-3 rounded-3xl bg-amber-50 p-6 dark:bg-amber-950/30">
            <div className="h-5 w-28 rounded bg-amber-100 dark:bg-amber-900/50" />
            <div className="h-4 w-full rounded bg-amber-100 dark:bg-amber-900/50" />
            <div className="h-4 w-2/3 rounded bg-amber-100 dark:bg-amber-900/50" />
          </div>
        </div>
      </div>
    </div>
  );
}