import { ShoppingBag, Clock } from "lucide-react";

const getStatusBadge = (status) => {
  const norm = (status || "").toLowerCase();

  switch (norm) {
    case "delivered":
      return "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
    case "shipped":
      return "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800";
    case "processing":
      return "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800";
    case "pending":
      return "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    case "cancelled":
      return "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    default:
      return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700";
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function RecentOrdersTable({ orders = [] }) {
  const list = Array.isArray(orders) ? orders.slice(0, 5) : [];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Recent Orders
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Latest 5 customer transactions
          </p>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        {list.length > 0 ? (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/80 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Order / Customer</th>
                <th className="py-2.5 px-3">Product(s)</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {list.map((order, idx) => {
                const customerName =
                  order.customerName ||
                  order.user?.name ||
                  order.user?.username ||
                  order.shippingAddress?.fullName ||
                  order.user?.email ||
                  "Guest Customer";

                const orderCode =
                  order.orderNumber ||
                  order.code ||
                  (order._id ? `#${order._id.slice(-6).toUpperCase()}` : `#ORD-${idx + 1}`);

                let productsSummary = "1 Item";
                if (Array.isArray(order.items) && order.items.length > 0) {
                  const firstItem = order.items[0];
                  const firstItemName =
                    firstItem.product?.name || firstItem.name || firstItem.title || "Product";
                  productsSummary =
                    order.items.length > 1
                      ? `${firstItemName} +${order.items.length - 1} more`
                      : firstItemName;
                } else if (order.productName) {
                  productsSummary = order.productName;
                }

                const totalAmount =
                  order.totalPrice ??
                  order.total ??
                  order.totalAmount ??
                  order.finalPrice ??
                  0;

                const status = order.status || order.orderStatus || "Pending";

                return (
                  <tr
                    key={order._id || order.id || idx}
                    className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div>
                        <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 block">
                          {orderCode}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {customerName}
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate max-w-[150px] sm:max-w-[180px] block" title={productsSummary}>
                        {productsSummary}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                        {formatDate(order.createdAt || order.date)}
                      </span>
                    </td>

                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                        ${Number(totalAmount).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="h-44 flex flex-col items-center justify-center text-zinc-400 text-xs gap-2">
            <ShoppingBag className="w-8 h-8 stroke-1 text-zinc-300 dark:text-zinc-600" />
            <p>No recent orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
