
import { useState } from "react";
import {
  User,
  SquareCheck,
  X,
  Pencil,
  ShieldCheck,
  Trash2,
} from "lucide-react";

const th =
  "px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200";

const actionBtn =
  "flex h-9 w-9 items-center justify-center rounded-full text-white transition disabled:cursor-not-allowed disabled:opacity-50";

export default function UserTable({
  users,
  busyIds = [],
  onEditUser,
  onToggleRole,
  onToggleVerify,
  onDeleteUser,
}) {
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    phone: "",
    avatar: "",
  });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  function openEdit(user) {
    setEditingUser(user);
    setForm({
      username: user.username ?? user.name ?? "",
      phone: user.phone ?? "",
      avatar: user.avatar ?? "",
    });
    setEditError("");
  }

  async function handleSave(event) {
    event.preventDefault();

    if (!form.username.trim()) {
      setEditError("Username is required.");
      return;
    }

    setSaving(true);
    setEditError("");

    try {
      await onEditUser(editingUser.id, {
        username: form.username.trim(),
        phone: form.phone.trim(),
        avatar: form.avatar.trim(),
      });

      setEditingUser(null);
    } catch (err) {
      setEditError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update user."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60">
              <tr>
                <th className={th}>User</th>
                <th className={th}>Role</th>
                <th className={th}>Verified</th>
                <th className={th}>Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}

              {users.map((user) => {
                const busy = busyIds.includes(user.id);

                return (
                  <tr
                    key={user.id}
                    className={`transition hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                      busy ? "opacity-60" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt=""
                            className="h-12 w-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                            <User size={22} />
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {user.name || user.username || "Unnamed user"}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400"
                            : "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-400"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {user.verified ? (
                        <span className="flex items-center gap-2 text-sm font-medium text-emerald-500">
                          <SquareCheck size={18} />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                          <X size={18} className="text-red-500" />
                          No
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(user)}
                          disabled={busy}
                          className={`${actionBtn} bg-blue-500 hover:bg-blue-600`}
                          title="Edit user details"
                          aria-label={`Edit ${user.name || user.username}`}
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleRole(user.id)}
                          disabled={busy}
                          className={`${actionBtn} bg-purple-500 hover:bg-purple-600`}
                          title="Change role"
                          aria-label="Change user role"
                        >
                          <ShieldCheck size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onToggleVerify(user.id)}
                          disabled={busy}
                          className={`${actionBtn} bg-emerald-500 hover:bg-emerald-600`}
                          title="Toggle verified"
                          aria-label="Toggle verification"
                        >
                          <SquareCheck size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteUser(user.id)}
                          disabled={busy}
                          className={`${actionBtn} bg-red-500 hover:bg-red-600`}
                          title="Delete user"
                          aria-label="Delete user"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {editingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              setEditingUser(null);
            }
          }}
        >
          <form
            onSubmit={handleSave}
            className="w-full max-w-lg space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500">
                  User Management
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                  Edit User
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setEditingUser(null)}
                disabled={saving}
                className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                aria-label="Close edit form"
              >
                <X size={20} />
              </button>
            </div>

            <div>
              <label
                htmlFor="edit-username"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Username *
              </label>
              <input
                id="edit-username"
                value={form.username}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="edit-phone"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Phone
              </label>
              <input
                id="edit-phone"
                value={form.phone}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    phone: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="edit-avatar"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Avatar URL
              </label>
              <input
                id="edit-avatar"
                type="url"
                value={form.avatar}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    avatar: event.target.value,
                  }))
                }
                placeholder="https://example.com/avatar.png"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {editError && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400"
              >
                {editError}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                disabled={saving}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
