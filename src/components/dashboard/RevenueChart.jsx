import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 text-xs">
        <p className="font-semibold text-zinc-700 dark:text-zinc-200 mb-1">{label}</p>
        <p className="text-emerald-600 dark:text-emerald-400 font-bold">
          Revenue: ${Number(payload[0].value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        {payload[0].payload.ordersCount !== undefined && (
          <p className="text-zinc-500 dark:text-zinc-400 mt-0.5">
            Orders: {payload[0].payload.ordersCount}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function RevenueChart({ data = [] }) {
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
            Revenue (Last 7 Days)
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Daily income performance
          </p>
        </div>
      </div>

      <div className="w-full h-64 mt-2">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e4e4e7"
                className="dark:stroke-zinc-800"
              />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#71717a", fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#71717a", fontSize: 11 }}
                tickFormatter={(val) => `$${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#revenueGradient)"
                activeDot={{ r: 6, fill: "#10b981", stroke: "#ffffff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xs">
            <p>No revenue data available for this period.</p>
          </div>
        )}
      </div>
    </div>
  );
}
