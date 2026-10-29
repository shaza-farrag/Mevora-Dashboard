
import { useState, useEffect } from "react";
import {
  ShoppingBag,
  Clock,
  DollarSign,
  Calendar,
  Award,
  Users,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

import { fetchComprehensiveDashboardData } from "../api/dashboardApi";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import OrderStatusChart from "../components/dashboard/OrderStatusChart";
import TopProductsTable from "../components/dashboard/TopProductsTable";
import RecentOrdersTable from "../components/dashboard/RecentOrdersTable";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";

export default function Dashboard() {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [error, setError] = useState(null);

async function loadDashboardData(isManualRefresh = false) {
  if (isManualRefresh) {
    setRefreshing(true);
  }

  setError(null);

  try {
    const stats = await fetchComprehensiveDashboardData();

    setData(stats);

    if (isManualRefresh) {
      toast.success("Dashboard data updated successfully!");
    }
  } catch (err) {
    console.error("Dashboard data fetching error:", err);

    const errMsg =
      err?.response?.data?.message ||
      err?.message ||
      "Failed to load dashboard data. Please try again.";

    setError(errMsg);

    if (isManualRefresh) {
      toast.error(errMsg);
    }
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
}

useEffect(() => {
  let cancelled = false;

  async function fetchInitialData() {
    try {
      const stats = await fetchComprehensiveDashboardData();

      if (!cancelled) {
        setData(stats);
      }
    } catch (err) {
      if (!cancelled) {
        console.error("Dashboard data fetching error:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Failed to load dashboard data. Please try again."
        );
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  fetchInitialData();

  return () => {
    cancelled = true;
  };
}, []);


  // Initial loading
  if (loading) {
    return (
      <div className="w-full min-w-0 px-4 py-6 sm:px-6 lg:px-8">
        <DashboardSkeleton />
      </div>
    );
  }

  // Error state when no data is available
  if (error && !data) {
    return (
      <div className="w-full min-w-0 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm dark:border-red-900 dark:bg-red-950/40">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/60 dark:text-red-400">
            <AlertCircle className="h-7 w-7" />
          </div>

          <h2 className="mb-2 text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Unable to load dashboard
          </h2>

          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
            {error}
          </p>

          <button
            onClick={() => loadDashboardData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-6 px-4 py-6 text-zinc-900 transition-colors duration-300 dark:text-zinc-100 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-zinc-200/80 pb-4 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 sm:text-sm">
            Real-time business performance, sales metrics, and store activity.
          </p>
        </div>

        <button
          onClick={() => loadDashboardData(true)}
          disabled={refreshing}
          title="Refresh dashboard stats"
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/60 sm:text-sm"
        >
          <RefreshCw
            className={`h-4 w-4 text-zinc-500 dark:text-zinc-400 ${
              refreshing ? "animate-spin text-blue-500" : ""
            }`}
          />
          <span>{refreshing ? "Refreshing..." : "Refresh Data"}</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          title="Total Orders"
          value={data?.totalOrders?.toLocaleString() ?? 0}
          subtitle="All placed orders"
          icon={ShoppingBag}
          colorScheme="blue"
          trend={{ label: "Active pipeline", isPositive: true }}
        />

        <StatCard
          title="Pending Orders"
          value={data?.pendingOrders?.toLocaleString() ?? 0}
          subtitle="Awaiting fulfillment"
          icon={Clock}
          colorScheme="amber"
          trend={{
            label: data?.pendingOrders > 0 ? "Requires action" : "All cleared",
            isPositive: data?.pendingOrders === 0,
            value:
              data?.pendingOrders > 0
                ? `${data.pendingOrders} pending`
                : "Clean",
          }}
        />

        <StatCard
          title="Total Revenue"
          value={`$${Number(data?.totalRevenue || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitle="Gross lifetime sales"
          icon={DollarSign}
          colorScheme="emerald"
          trend={{ label: "All-time revenue", isPositive: true }}
        />

        <StatCard
          title="This Month"
          value={`$${Number(data?.thisMonthRevenue || 0).toLocaleString(
            undefined,
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          )}`}
          subtitle="Current calendar month"
          icon={Calendar}
          colorScheme="purple"
          trend={{ label: "Current cycle", isPositive: true }}
        />

        <StatCard
          title="Top Product"
          value={data?.topProduct || "N/A"}
          subtitle="Highest units sold"
          icon={Award}
          colorScheme="indigo"
          trend={{ label: "Best Seller", isPositive: true }}
        />

        <StatCard
          title="Total Users"
          value={data?.totalUsers?.toLocaleString() ?? 0}
          subtitle="Registered accounts"
          icon={Users}
          colorScheme="rose"
          trend={{ label: "Customer base", isPositive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="min-w-0 lg:col-span-2">
          <RevenueChart data={data?.revenueLast7Days || []} />
        </div>

        <div className="min-w-0 lg:col-span-1">
          <OrderStatusChart data={data?.ordersByStatus || []} />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="min-w-0">
          <TopProductsTable products={data?.topProducts || []} />
        </div>

        <div className="min-w-0">
          <RecentOrdersTable orders={data?.recentOrders || []} />
        </div>
      </div>

      {/* Non-blocking refresh error */}
      {error && data && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error} Showing the previously loaded data.</p>

          <button
            onClick={() => loadDashboardData(true)}
            disabled={refreshing}
            className="inline-flex shrink-0 items-center gap-2 self-start font-semibold hover:underline disabled:opacity-50 sm:self-auto"
          >
            <RefreshCw
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
            />
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
