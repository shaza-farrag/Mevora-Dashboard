/**
 * Reusable Statistic Card Component
 */
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme = "blue",
}) {
  const colorMap = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/50",
      badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300",
    },
    amber: {
      bg: "bg-amber-50 dark:bg-amber-950/40",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/50",
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300",
    },
    emerald: {
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      text: "text-emerald-600 dark:text-emerald-400",
      border: "border-emerald-100 dark:border-emerald-900/50",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/40",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-100 dark:border-purple-900/50",
      badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-300",
    },
    rose: {
      bg: "bg-rose-50 dark:bg-rose-950/40",
      text: "text-rose-600 dark:text-rose-400",
      border: "border-rose-100 dark:border-rose-900/50",
      badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300",
    },
    indigo: {
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      text: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-100 dark:border-indigo-900/50",
      badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300",
    },
  };

  const scheme = colorMap[colorScheme] || colorMap.blue;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          {title}
        </span>
        <div className={`p-2.5 rounded-xl ${scheme.bg} ${scheme.text} flex items-center justify-center`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {value}
        </h3>
        {subtitle && (
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {subtitle}
          </p>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
          <span className="text-zinc-500 dark:text-zinc-400">
            {trend.label}
          </span>
          {trend.value && (
            <span
              className={`font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                trend.isPositive
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                  : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
