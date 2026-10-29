
export default function ProductsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-64 max-w-full rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="h-10 w-36 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="flex h-32 flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-10 w-10 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            </div>

            <div className="space-y-2">
              <div className="h-7 w-20 rounded-md bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-3 w-28 rounded bg-zinc-100 dark:bg-zinc-800/60" />
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters Skeleton */}
      <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-11 flex-1 rounded-xl bg-zinc-100 dark:bg-zinc-800" />
        <div className="h-11 w-full rounded-xl bg-zinc-100 sm:w-32 dark:bg-zinc-800" />
        <div className="h-11 w-full rounded-xl bg-zinc-100 sm:w-32 dark:bg-zinc-800" />
      </div>

      {/* Products Section Header */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            {/* Product Image */}
            <div className="h-48 bg-zinc-100 dark:bg-zinc-800" />

            <div className="space-y-4 p-4">
              {/* Category and Status */}
              <div className="flex items-center justify-between gap-3">
                <div className="h-4 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-5 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
              </div>

              {/* Product Name */}
              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-3 w-full rounded bg-zinc-100 dark:bg-zinc-800/60" />
              </div>

              {/* Price and Stock */}
              <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
                <div className="space-y-2">
                  <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-5 w-20 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>

                <div className="space-y-2">
                  <div className="h-3 w-12 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="h-5 w-14 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <div className="h-9 flex-1 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                <div className="h-9 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-800/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
