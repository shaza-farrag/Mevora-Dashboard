import { useState, useEffect, useCallback } from "react";
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

  // Load Dashboard Data
  const loadDashboardData = useCallback(async (isManualRefresh = false) => {
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
      toast.error(errMsg);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const initFetch = async () => {
      try {
        const stats = await fetchComprehensiveDashboardData();
        if (!isCancelled) {
          setData(stats);
        }
      } catch (err) {
        if (!isCancelled) {
          const errMsg =
            err?.response?.data?.message ||
            err?.message ||
            "Failed to load dashboard data. Please try again.";
          setError(errMsg);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    initFetch();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Initial Loading state with Skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DashboardSkeleton />
      </div>
    );
  }

  // Error Banner State
  if (error && !data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-14 h-14 bg-red-100 dark:bg-red-900/60 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-400">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Unable to load dashboard
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            {error}
          </p>
          <button
            onClick={() => loadDashboardData(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 transition-all duration-300">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real-time business performance, sales metrics, and store activity.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadDashboardData(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700/60 shadow-sm transition-all duration-200 disabled:opacity-50 cursor-pointer"
            title="Refresh dashboard stats"
          >
            <RefreshCw
              className={`w-4 h-4 text-zinc-500 dark:text-zinc-400 ${
                refreshing ? "animate-spin text-blue-500" : ""
              }`}
            />
            <span>{refreshing ? "Refreshing..." : "Refresh Data"}</span>
          </button>
        </div>
      </div>

      {/* 2. Statistics Cards Grid (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Orders */}
        <StatCard
          title="Total Orders"
          value={data?.totalOrders?.toLocaleString() ?? 0}
          subtitle="All placed orders"
          icon={ShoppingBag}
          colorScheme="blue"
          trend={{ label: "Active pipeline", isPositive: true }}
        />

        {/* Pending Orders */}
        <StatCard
          title="Pending Orders"
          value={data?.pendingOrders?.toLocaleString() ?? 0}
          subtitle="Awaiting fulfillment"
          icon={Clock}
          colorScheme="amber"
          trend={{
            label: data?.pendingOrders > 0 ? "Requires action" : "All cleared",
            isPositive: data?.pendingOrders === 0,
            value: data?.pendingOrders > 0 ? `${data.pendingOrders} pending` : "Clean",
          }}
        />

        {/* Total Revenue */}
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

        {/* This Month */}
        <StatCard
          title="This Month"
          value={`$${Number(data?.thisMonthRevenue || 0).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          subtitle="Current calendar month"
          icon={Calendar}
          colorScheme="purple"
          trend={{ label: "Current cycle", isPositive: true }}
        />

        {/* Top Product */}
        <StatCard
          title="Top Product"
          value={data?.topProduct || "N/A"}
          subtitle="Highest units sold"
          icon={Award}
          colorScheme="indigo"
          trend={{ label: "Best Seller", isPositive: true }}
        />

        {/* Total Users */}
        <StatCard
          title="Total Users"
          value={data?.totalUsers?.toLocaleString() ?? 0}
          subtitle="Registered accounts"
          icon={Users}
          colorScheme="rose"
          trend={{ label: "Customer base", isPositive: true }}
        />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Last 7 Days (Line / Area Chart) */}
        <div className="lg:col-span-2">
          <RevenueChart data={data?.revenueLast7Days || []} />
        </div>

        {/* Orders Status Distribution (Donut Chart) */}
        <div className="lg:col-span-1">
          <OrderStatusChart data={data?.ordersByStatus || []} />
        </div>
      </div>

      {/* 4. Lists & Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Table */}
        <div>
          <TopProductsTable products={data?.topProducts || []} />
        </div>

        {/* Recent Orders Table */}
        <div>
          <RecentOrdersTable orders={data?.recentOrders || []} />
        </div>
      </div>
    </div>
  );
}
