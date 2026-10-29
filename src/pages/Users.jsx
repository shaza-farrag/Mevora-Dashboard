import { useCallback, useEffect, useState } from "react";
import { Search, UserPlus, ChevronDown, ChevronUp, X } from "lucide-react";
import StatsCards from "../components/users/UserStatsCards";
import AddUserPanel from "../components/users/AddUserPanel";
import UserTable from "../components/users/UserTable";
import UsersLoading from "../components/users/UsersLoading";
import UsersError from "../components/users/UsersError";
import {
  extractUsers,
  normalizeUser,
  getErrorMessage,
} from "../components/users/userUtils";
import { getAllUsers, addUser, updateUser, deleteUser } from "../api/usersApi";
import { changeUserRole } from "../api/authApi";

const SLOW_AFTER_MS = 4000;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [slow, setSlow] = useState(false);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const [busyIds, setBusyIds] = useState([]);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const slowTimer = setTimeout(() => setSlow(true), SLOW_AFTER_MS);

    (async () => {
      try {
        const data = await getAllUsers({}, { signal: controller.signal });
        if (controller.signal.aborted) return;
        setUsers(extractUsers(data).map(normalizeUser));
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(getErrorMessage(err));
      } finally {
        clearTimeout(slowTimer);
        if (!controller.signal.aborted) {
          setLoading(false);
          setSlow(false);
        }
      }
    })();

    return () => {
      controller.abort();
      clearTimeout(slowTimer);
    };
  }, [reloadKey]);

  const reload = useCallback(() => {
    setError(null);
    setSlow(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!error) return undefined;
    window.addEventListener("online", reload);
    return () => window.removeEventListener("online", reload);
  }, [error, reload]);

  const refreshUsers = useCallback(async () => {
    const data = await getAllUsers();
    setUsers(extractUsers(data).map(normalizeUser));
  }, []);

  const runForUser = async (id, action) => {
    setActionError(null);
    setBusyIds((prev) => [...prev, id]);
    try {
      await action();
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setBusyIds((prev) => prev.filter((x) => x !== id));
    }
  };

  const handleAddUser = async (payload) => {
    await addUser(payload);
    try {
      await refreshUsers();
    } catch {
      // اليوزر اتضاف، والقائمة هتتحدث في أول تحميل جاي
    }
  };

  const handleToggleRole = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const role = user.role === "admin" ? "customer" : "admin";

    runForUser(id, async () => {
      // TODO: تأكد من شكل الـ body المطلوب في PATCH /auth/change-role
      await changeUserRole({ userId: id, role });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
    });
  };

  const handleToggleVerify = (id) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const verified = !user.verified;

    runForUser(id, async () => {
      // TODO: تأكد من اسم الحقل في الباك إند (isVerified ولا verified)
      await updateUser(id, { isVerified: verified });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, verified } : u)));
    });
  };

  const handleDeleteUser = (id) => {
    if (!window.confirm("Delete this user?")) return;

    runForUser(id, async () => {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    });
  };

  const term = searchTerm.trim().toLowerCase();
  const filteredUsers = users.filter(
    (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)
  );

  const ToggleIcon = isAddPanelOpen ? ChevronUp : ChevronDown;

  if (loading) return <UsersLoading slow={slow} />;
  if (error) return <UsersError message={error} onRetry={reload} />;

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

      {actionError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
        >
          <span>{actionError}</span>
          <button onClick={() => setActionError(null)} aria-label="Dismiss">
            <X size={16} />
          </button>
        </div>
      )}

      <AddUserPanel
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
        onAddUser={handleAddUser}
      />

      <StatsCards users={users} />

      <UserTable
        users={filteredUsers}
        busyIds={busyIds}
        onToggleRole={handleToggleRole}
        onToggleVerify={handleToggleVerify}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
