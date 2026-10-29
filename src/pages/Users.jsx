import { useEffect, useState } from "react";
import { Search, UserPlus, ChevronDown, ChevronUp } from "lucide-react";
import StatsCards from "../components/users/UserStatsCards";
import AddUserPanel from "../components/users/AddUserPanel";
import UserTable from "../components/users/UserTable";
import UsersLoading from "../components/users/UsersLoading";
import { initialUsers } from "../data/mockUsers";

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fake loading delay. When you connect the real API, set loading to false after the fetch finishes.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleAddUser = (newUser) => setUsers((prev) => [newUser, ...prev]);

  const handleToggleRole = (id) =>
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, role: u.role === "admin" ? "customer" : "admin" } : u
      )
    );

  const handleToggleVerify = (id) =>
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, verified: !u.verified } : u)));

  const handleDeleteUser = (id) => {
    if (window.confirm("Delete this user?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const term = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
  );

  const ToggleIcon = isAddPanelOpen ? ChevronUp : ChevronDown;

  if (loading) return <UsersLoading />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-cyan-500">
            User Management
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
            Manage Users
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <button
            onClick={() => setIsAddPanelOpen((open) => !open)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600"
          >
            <UserPlus size={18} />
            Add User
            <ToggleIcon size={14} />
          </button>
        </div>
      </div>

      <AddUserPanel
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
        onAddUser={handleAddUser}
      />

      <StatsCards users={users} />

      <UserTable
        users={filteredUsers}
        onToggleRole={handleToggleRole}
        onToggleVerify={handleToggleVerify}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
