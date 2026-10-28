export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
          <div className="h-4 w-72 bg-zinc-200 dark:bg-zinc-800 rounded mt-2"></div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
          <div className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
        </div>
      </div>

      {/* 6 Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col justify-between h-36"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
            <div>
              <div className="h-7 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-md"></div>
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded mt-2"></div>
            </div>
            <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800/60 rounded"></div>
          </div>
        ))}
      </div>

      {/* Charts Skeleton: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm h-80 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 w-44 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-3 w-32 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="h-52 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-xl flex items-end p-4 gap-3">
            {[40, 65, 30, 85, 55, 90, 75].map((height, idx) => (
              <div
                key={idx}
                className="flex-1 bg-zinc-200 dark:bg-zinc-800 rounded-t-md"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm h-80 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-3 w-28 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="w-40 h-40 rounded-full border-8 border-zinc-200 dark:border-zinc-800 border-t-zinc-300 dark:border-t-zinc-700 animate-spin"></div>
          </div>
          <div className="flex justify-center gap-4">
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
        </div>
      </div>

      {/* Tables Skeleton: Top Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Skeleton */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800"></div>
                  <div className="space-y-1.5">
                    <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                    <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                  </div>
                </div>
                <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Skeleton */}
        <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800">
            <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
          </div>
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-3 w-20 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                </div>
                <div className="h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full"></div>
                <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
