
import { useState } from "react";
import { UserPlus, X, Loader2 } from "lucide-react";
import { getErrorMessage } from "./UserUtils";

const emptyForm = {
  username: "",
  email: "",
  password: "",
  phone: "",
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100";

const labelCls =
  "mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";

export default function AddUserPanel({
  isOpen,
  onClose,
  onAddUser,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const setField = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleClose = () => {
    if (submitting) return;

    setError("");
    onClose();
  };

  const handleClear = () => {
    setFormData({ ...emptyForm });
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    const username = formData.username.trim();
    const email = formData.email.trim();
    const password = formData.password;

    if (!username || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await onAddUser({
        username,
        email,
        password,
        phone: formData.phone.trim(),
      });

      setFormData({ ...emptyForm });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-cyan-900/50 dark:bg-slate-900">
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-cyan-50 px-6 py-4 dark:border-slate-800 dark:bg-cyan-950/40">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-white">
            <UserPlus size={18} />
          </div>

          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Create New User
            </p>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in the details below to add a new user
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          aria-label="Close add user form"
          className="text-slate-500 transition hover:text-slate-900 disabled:opacity-50 dark:text-slate-400 dark:hover:text-white"
        >
          <X size={20} />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label htmlFor="new-username" className={labelCls}>
              Username <span className="text-red-500">*</span>
            </label>

            <input
              id="new-username"
              name="username"
              type="text"
              autoComplete="off"
              required
              value={formData.username}
              onChange={setField("username")}
              placeholder="e.g. john_doe"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="new-email" className={labelCls}>
              Email <span className="text-red-500">*</span>
            </label>

            <input
              id="new-email"
              name="email"
              type="email"
              autoComplete="off"
              required
              value={formData.email}
              onChange={setField("email")}
              placeholder="e.g. john@email.com"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="new-password" className={labelCls}>
              Password <span className="text-red-500">*</span>
            </label>

            <input
              id="new-password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={6}
              required
              value={formData.password}
              onChange={setField("password")}
              placeholder="Min. 6 characters"
              className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="new-phone" className={labelCls}>
              Phone
            </label>

            <input
              id="new-phone"
              name="phone"
              type="tel"
              autoComplete="off"
              value={formData.phone}
              onChange={setField("phone")}
              placeholder="e.g. +1 234 567 890"
              className={inputCls}
            />
          </div>
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
          >
            {error}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-4 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <span className="text-red-500">*</span> Required fields
          </p>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              disabled={submitting}
              onClick={handleClear}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <UserPlus size={16} />
              )}

              {submitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
