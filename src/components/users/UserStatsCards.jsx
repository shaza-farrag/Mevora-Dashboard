import { Users, Shield, UserCheck } from "lucide-react";

export default function StatsCards({ users }) {
  const stats = [
    { title: "Total Users", value: users.length, icon: Users },
    { title: "Admins", value: users.filter((u) => u.role === "admin").length, icon: Shield },
    { title: "Customers", value: users.filter((u) => u.role === "customer").length, icon: Users },
    { title: "Verified", value: users.filter((u) => u.verified).length, icon: UserCheck },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ title, value, icon: Icon }) => (
        <div
          key={title}
          className="flex items-center justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500 text-white">
            <Icon size={24} />
          </div>
        </div>
      ))}
    </div>
  );
}
