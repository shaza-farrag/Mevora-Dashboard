
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
} from "../components/users/UserUtils";

import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../api/usersApi";

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
  const [actionSuccess, setActionSuccess] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const slowTimer = setTimeout(() => setSlow(true), SLOW_AFTER_MS);

    async function loadUsers() {
      try {
        const response = await getAllUsers(
          {},
          { signal: controller.signal }
        );

        if (controller.signal.aborted) return;

        setUsers(extractUsers(response).map(normalizeUser));
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
    }

    loadUsers();

    return () => {
      controller.abort();
      clearTimeout(slowTimer);
    };
  }, [reloadKey]);

  const reload = useCallback(() => {
    setError(null);
    setSlow(false);
    setLoading(true);
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    if (!error) return undefined;

    window.addEventListener("online", reload);
    return () => window.removeEventListener("online", reload);
  }, [error, reload]);

  const refreshUsers = useCallback(async () => {
    const response = await getAllUsers();
    setUsers(extractUsers(response).map(normalizeUser));
  }, []);

  const runForUser = async (id, action, successMessage) => {
    setActionError(null);
    setActionSuccess("");
    setBusyIds((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );

    try {
      await action();
      if (successMessage) setActionSuccess(successMessage);
    } catch (err) {
      setActionError(getErrorMessage(err));
      throw err;
    } finally {
      setBusyIds((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleAddUser = async (payload) => {
    setActionError(null);
    setActionSuccess("");

    try {
      await addUser({
        username: payload.username ?? payload.name,
        email: payload.email,
        password: payload.password,
        phone: payload.phone ?? "",
      });

      setIsAddPanelOpen(false);

      try {
        await refreshUsers();
      } catch {
        reload();
      }

      setActionSuccess("User added successfully.");
    } catch (err) {
      setActionError(getErrorMessage(err));
      throw err;
    }
  };

  const handleEditUser = async (id, payload) => {
    return runForUser(
      id,
      async () => {
        const response = await updateUser(id, {
          username: payload.username,
          phone: payload.phone,
          avatar: payload.avatar,
        });

        const updatedUser = response?.user;

        if (updatedUser) {
          setUsers((prev) =>
            prev.map((user) =>
              user.id === id
                ? normalizeUser({ ...user, ...updatedUser })
                : user
            )
          );
        } else {
          await refreshUsers();
        }
      },
      "User updated successfully."
    );
  };

  const handleToggleRole = async (id) => {
    const user = users.find((item) => item.id === id);
    if (!user) return;

    const role = user.role === "admin" ? "customer" : "admin";

    await runForUser(
      id,
      async () => {
        // Confirm the expected body against the backend controller.
        await changeUserRole({ userId: id, role });

        setUsers((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, role } : item
          )
        );
      },
      "User role updated successfully."
    );
  };

  const handleToggleVerify = async (id) => {
    const user = users.find((item) => item.id === id);
    if (!user) return;

    const verified = !user.verified;

    await runForUser(
      id,
      async () => {
        // Use this only if the backend supports updating isVerified.
        await updateUser(id, { isVerified: verified });

        setUsers((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, verified } : item
          )
        );
      },
      "Verification status updated."
    );
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    await runForUser(
      id,
      async () => {
        await deleteUser(id);
        setUsers((prev) => prev.filter((item) => item.id !== id));
      },
      "User deleted successfully."
    );
  };

  const term = searchTerm.trim().toLowerCase();

  const filteredUsers = users.filter((user) =>
    [user.name, user.username, user.email].some((value) =>
      String(value ?? "").toLowerCase().includes(term)
    )
  );

  const ToggleIcon = isAddPanelOpen ? ChevronUp : ChevronDown;

  if (loading) {
    return <UsersLoading slow={slow} />;
  }

  if (error) {
    return <UsersError message={error} onRetry={reload} />;
  }

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

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Manage customer accounts and permissions.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative sm:w-80">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search users..."
              aria-label="Search users"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsAddPanelOpen((open) => !open)}
            aria-expanded={isAddPanelOpen}
            className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600"
          >
            <UserPlus size={18} />
            Add User
            <ToggleIcon size={14} />
          </button>
        </div>
      </div>

      {/* Action feedback */}
      {(actionError || actionSuccess) && (
        <div
          role="status"
          className={`flex items-center justify-between gap-4 rounded-2xl border px-5 py-3 text-sm ${
            actionError
              ? "border-red-200 bg-red-50 text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
              : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
          }`}
        >
          <span>{actionError || actionSuccess}</span>

          <button
            type="button"
            onClick={() => {
              setActionError(null);
              setActionSuccess("");
            }}
            aria-label="Dismiss message"
          >
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
        onEditUser={handleEditUser}
        onToggleRole={handleToggleRole}
        onToggleVerify={handleToggleVerify}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}
