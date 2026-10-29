
import Axios from "./axios";

export const getDashboardStats = async () => {
  const response = await Axios.get("/orders/admin/dashboard");
  return response.data;
};

/**
 * Helper to generate last 7 days date strings in "Mon DD" or "YYYY-MM-DD"
 */
// const getLast7DaysKeys = () => {
//   const dates = [];

//   for (let i = 6; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);

//     dates.push({
//       dateStr: d.toISOString().split("T")[0],
//       label: d.toLocaleDateString("en-US", {
//         weekday: "short",
//         day: "numeric",
//       }),
//     });
//   }

//   return dates;
// };

/**
 * Normalizes all dashboard data from API responses.
 * Combines stats, orders, products, and users to satisfy all dashboard requirements.
 */

export const fetchComprehensiveDashboardData = async () => {
  const response = await Axios.get("/orders/admin/dashboard");

  // The actual API response is nested inside "dashboard"
  const raw = response.data?.dashboard;

  if (!raw) {
    throw new Error("Dashboard data was not found in the API response.");
  }

  const orders = raw.orders || {};
  const revenue = raw.revenue || {};

  // Normalize orders by status for the chart
  const statusLabels = {
    pending: "Pending",
    processing: "Processing",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  const ordersByStatus = Object.entries(statusLabels).map(
    ([key, label]) => ({
      name: label,
      value:
        orders[key] ??
        raw.ordersByStatus?.find(
          (item) => item._id?.toLowerCase() === key
        )?.count ??
        0,
    })
  );

  // Normalize daily revenue for the chart
  const revenueLast7Days = (raw.dailyRevenue || []).map((item) => ({
    date: item._id
      ? new Date(item._id).toLocaleDateString("en-US", {
          weekday: "short",
          day: "numeric",
        })
      : "",
    fullDate: item._id || "",
    revenue: Number(item.revenue) || 0,
    ordersCount: Number(item.orders) || 0,
  }));

  // Use actual API data for the dashboard
  const recentOrders = (raw.recentOrders || []).slice(0, 5);
  const topProducts = (raw.topProducts || []).map((product) => ({
    ...product,
    salesCount: Number(product.totalSold) || 0,
  }));

  return {
    totalOrders: Number(orders.total) || 0,
    pendingOrders: Number(orders.pending) || 0,
    totalRevenue: Number(revenue.total) || 0,
    thisMonthRevenue: Number(revenue.thisMonth) || 0,
    topProduct: topProducts[0]?.name || "N/A",
    totalUsers: Number(raw.totalCustomers) || 0,
    topProducts,
    recentOrders,
    ordersByStatus,
    revenueLast7Days,
  };
};

