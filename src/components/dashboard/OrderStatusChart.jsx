import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  Delivered: "#10b981", // emerald
  Shipped: "#8b5cf6",   // purple
  Processing: "#3b82f6",// blue
  Pending: "#f59e0b",   // amber
  Cancelled: "#ef4444", // red
  Refunded: "#64748b",  // slate
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-zinc-900 p-2.5 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: data.payload.color || "#3b82f6" }}
          />
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            {data.name}:
          </span>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">
            {data.value} orders
          </span>
        </div>
      </div>
    );
  }
  return null;
};

export default function OrderStatusChart({ data = [] }) {
  const chartData = (data || []).map((item) => ({
    ...item,
    color: STATUS_COLORS[item.name] || "#6366f1",
  }));

  const totalOrders = chartData.reduce((sum, item) => sum + (item.value || 0), 0);

  return (
    <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base">
            Orders by Status
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Current fulfillment status breakdown
          </p>
        </div>
        {totalOrders > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {totalOrders} Total
          </span>
        )}
      </div>

      <div className="w-full h-64 relative">
        {chartData.length > 0 && totalOrders > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-400 text-xs">
            <p>No orders status data available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
