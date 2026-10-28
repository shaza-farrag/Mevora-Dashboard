import Axios from "./axios";

/**
 * Fetch raw dashboard stats from the server
 */
export const getDashboardStats = async () => {
  const response = await Axios.get("/orders/admin/dashboard");
  return response.data;
};

/**
 * Helper to generate last 7 days date strings in "Mon DD" or "YYYY-MM-DD"
 */
const getLast7DaysKeys = () => {
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push({
      dateStr: d.toISOString().split("T")[0],
      label: d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
    });
  }
  return dates;
};

/**
 * Normalizes all dashboard data from API responses.
 * Combines stats, orders, products, and users to satisfy all dashboard requirements.
 */
export const fetchComprehensiveDashboardData = async () => {
  let dashboardRes = null;
  let ordersRes = null;
  let productsRes = null;
  let usersRes = null;

  // 1. Attempt main dashboard endpoint
  try {
    const res = await Axios.get("/orders/admin/dashboard");
    dashboardRes = res.data;
  } catch (err) {
    console.warn("Notice: /orders/admin/dashboard call had an issue, falling back to specific endpoints", err?.message);
  }

  // 2. Fetch orders list (used for Recent Orders and real calculation fallbacks)
  try {
    const res = await Axios.get("/orders/admin?limit=50");
    ordersRes = res.data;
  } catch (err) {
    console.warn("Notice: /orders/admin fetch:", err?.message);
  }

  // 3. Fetch products list (used for Top Products if not in dashboard stats)
  try {
    const res = await Axios.get("/products?limit=20");
    productsRes = res.data;
  } catch (err) {
    console.warn("Notice: /products fetch:", err?.message);
  }

  // 4. Fetch users count
  try {
    const res = await Axios.get("/users/all");
    usersRes = res.data;
  } catch (err) {
    console.warn("Notice: /users/all fetch:", err?.message);
  }

  // Extract raw lists
  const ordersList =
    ordersRes?.orders ||
    ordersRes?.data?.orders ||
    (Array.isArray(ordersRes?.data) ? ordersRes.data : []) ||
    (Array.isArray(ordersRes) ? ordersRes : []) ||
    dashboardRes?.recentOrders ||
    [];

  const productsList =
    productsRes?.products ||
    productsRes?.data?.products ||
    (Array.isArray(productsRes?.data) ? productsRes.data : []) ||
    (Array.isArray(productsRes) ? productsRes : []) ||
    dashboardRes?.topProducts ||
    [];

  const usersList =
    usersRes?.users ||
    usersRes?.data?.users ||
    (Array.isArray(usersRes?.data) ? usersRes.data : []) ||
    (Array.isArray(usersRes) ? usersRes : []) ||
    [];

  // --- Calculate Totals ---
  // 1. Total Orders
  const totalOrders =
    dashboardRes?.totalOrders ??
    dashboardRes?.data?.totalOrders ??
    ordersRes?.total ??
    ordersRes?.totalOrders ??
    ordersList.length;

  // 2. Pending Orders
  let pendingOrders =
    dashboardRes?.pendingOrders ??
    dashboardRes?.data?.pendingOrders;

  if (pendingOrders === undefined) {
    pendingOrders = ordersList.filter(
      (o) => (o.status || o.orderStatus || "").toLowerCase() === "pending"
    ).length;
  }

  // 3. Total Revenue
  let totalRevenue =
    dashboardRes?.totalRevenue ??
    dashboardRes?.data?.totalRevenue ??
    dashboardRes?.revenue;

  if (totalRevenue === undefined) {
    totalRevenue = ordersList.reduce((sum, o) => {
      const amt = o.totalPrice ?? o.total ?? o.totalAmount ?? 0;
      return sum + Number(amt);
    }, 0);
  }

  // 4. This Month Revenue
  let thisMonthRevenue =
    dashboardRes?.thisMonthRevenue ??
    dashboardRes?.monthlyRevenue ??
    dashboardRes?.data?.thisMonthRevenue;

  if (thisMonthRevenue === undefined) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    thisMonthRevenue = ordersList
      .filter((o) => {
        const d = new Date(o.createdAt || o.date);
        return !isNaN(d) && d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      })
      .reduce((sum, o) => sum + Number(o.totalPrice ?? o.total ?? o.totalAmount ?? 0), 0);
  }

  // 5. Total Users
  const totalUsers =
    dashboardRes?.totalUsers ??
    dashboardRes?.data?.totalUsers ??
    usersRes?.total ??
    usersRes?.totalUsers ??
    usersList.length;

  // 6. Top Product & Top Products list
  let topProducts =
    dashboardRes?.topProducts ||
    dashboardRes?.data?.topProducts ||
    [];

  if (!topProducts.length && productsList.length > 0) {
    topProducts = [...productsList]
      .sort((a, b) => (b.salesCount || b.sold || b.unitsSold || 0) - (a.salesCount || a.sold || a.unitsSold || 0))
      .slice(0, 5);
  }

  const topProduct =
    dashboardRes?.topProduct?.name ||
    dashboardRes?.data?.topProduct?.name ||
    topProducts[0]?.name ||
    "N/A";

  // 7. Recent 5 Orders
  const recentOrders =
    (dashboardRes?.recentOrders || dashboardRes?.data?.recentOrders || ordersList)
      .slice(0, 5);

  // 8. Orders by Status
  let ordersByStatus =
    dashboardRes?.ordersByStatus ||
    dashboardRes?.data?.ordersByStatus;

  if (!ordersByStatus) {
    const statusCounts = {
      Delivered: 0,
      Shipped: 0,
      Processing: 0,
      Pending: 0,
      Cancelled: 0,
    };

    ordersList.forEach((order) => {
      const s = (order.status || order.orderStatus || "pending").toLowerCase();
      if (s === "delivered") statusCounts.Delivered++;
      else if (s === "shipped") statusCounts.Shipped++;
      else if (s === "processing") statusCounts.Processing++;
      else if (s === "pending") statusCounts.Pending++;
      else if (s === "cancelled") statusCounts.Cancelled++;
      else {
        // Map other unknown statuses to Pending or Processing
        statusCounts.Pending++;
      }
    });

    ordersByStatus = Object.keys(statusCounts).map((status) => ({
      name: status,
      value: statusCounts[status],
    }));
  }

  // 9. Revenue Last 7 Days Chart Data
  let revenueLast7Days =
    dashboardRes?.revenueLast7Days ||
    dashboardRes?.data?.revenueLast7Days ||
    dashboardRes?.dailyRevenue;

  if (!revenueLast7Days || !revenueLast7Days.length) {
    const last7Days = getLast7DaysKeys();
    revenueLast7Days = last7Days.map(({ dateStr, label }) => {
      const matchingOrders = ordersList.filter((o) => {
        const orderDateStr = (o.createdAt || o.date || "").split("T")[0];
        return orderDateStr === dateStr;
      });

      const dayRevenue = matchingOrders.reduce(
        (sum, o) => sum + Number(o.totalPrice ?? o.total ?? o.totalAmount ?? 0),
        0
      );

      return {
        date: label,
        fullDate: dateStr,
        revenue: dayRevenue,
        ordersCount: matchingOrders.length,
      };
    });
  }

  return {
    totalOrders: Number(totalOrders) || 0,
    pendingOrders: Number(pendingOrders) || 0,
    totalRevenue: Number(totalRevenue) || 0,
    thisMonthRevenue: Number(thisMonthRevenue) || 0,
    topProduct: String(topProduct),
    totalUsers: Number(totalUsers) || 0,
    topProducts,
    recentOrders,
    ordersByStatus,
    revenueLast7Days,
  };
};
