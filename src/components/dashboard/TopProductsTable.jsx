import { Package, TrendingUp } from "lucide-react";

export default function TopProductsTable({ products = [] }) {
  const list = Array.isArray(products) ? products : [];

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Top Selling Products
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Highest performing products by sales & revenue
          </p>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        {list.length > 0 ? (
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800/80 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">Product</th>
                <th className="py-2.5 px-3 text-center">Units Sold</th>
                <th className="py-2.5 px-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/50">
              {list.map((item, index) => {
                const imgUrl =
                  item.image ||
                  (Array.isArray(item.images) && item.images[0]?.url) ||
                  (Array.isArray(item.images) && typeof item.images[0] === "string" ? item.images[0] : null);

                return (
                  <tr
                    key={item.id || item._id || index}
                    className="hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "";
                                e.target.parentElement.innerHTML = '<span class="text-xs text-zinc-400">📦</span>';
                              }}
                            />
                          ) : (
                            <Package className="w-5 h-5 text-zinc-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-zinc-800 dark:text-zinc-200 text-xs sm:text-sm truncate max-w-[160px] sm:max-w-[200px]">
                            {item.name || "Unnamed Product"}
                          </p>
                          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">
                            {item.category?.name || item.category || item.brand || "General"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        {item.salesCount || item.sold || item.unitsSold || item.quantity || 0}
                      </span>
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 text-xs sm:text-sm">
                        ${Number(item.revenue || (item.price * (item.salesCount || 1)) || 0).toLocaleString(undefined, {
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
            <Package className="w-8 h-8 stroke-1 text-zinc-300 dark:text-zinc-600" />
            <p>No top products found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
