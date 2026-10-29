import { User, SquareCheck, X, Pencil, ShieldCheck, Trash2 } from "lucide-react";

const th = "px-6 py-4 text-sm font-semibold text-slate-700 dark:text-slate-200";
const actionBtn =
  "flex h-9 w-9 items-center justify-center rounded-full text-white transition";

export default function UserTable({ users, onToggleRole, onToggleVerify, onDeleteUser }) {
  return (
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
                <td colSpan={4} className="px-6 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                  No users found.
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr key={user.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-300">
                      <User size={22} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
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
                      <SquareCheck size={18} /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                      <X size={18} className="text-red-500" /> No
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleRole(user.id)}
                      className={`${actionBtn} bg-blue-500 hover:bg-blue-600`}
                      title="Change role"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onToggleVerify(user.id)}
                      className={`${actionBtn} bg-emerald-500 hover:bg-emerald-600`}
                      title="Toggle verified"
                    >
                      <ShieldCheck size={15} />
                    </button>
                    <button
                      onClick={() => onDeleteUser(user.id)}
                      className={`${actionBtn} bg-red-500 hover:bg-red-600`}
                      title="Delete user"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
