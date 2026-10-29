import { useState } from "react";
import { UserPlus, X, Loader2 } from "lucide-react";
import { getErrorMessage } from "./UserUtils";

const emptyForm = { username: "", email: "", password: "", phone: "" };

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100";
const labelCls =
  "mb-2 block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400";

export default function AddUserPanel({ isOpen, onClose, onAddUser }) {
 const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState("");

  if (!isOpen) return null;

  const setField = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (submitting) return;
  if (!formData.username.trim() || !formData.email.trim()) return;

  setSubmitting(true);
  setError("");

  try {
    await onAddUser({
      username: formData.username.trim(),
      email: formData.email.trim(),
      password: formData.password,
      ...(formData.phone.trim() && { phone: formData.phone.trim() }),
    });
    setFormData(emptyForm);
    onClose();
  } catch (err) {
    setError(getErrorMessage(err));
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-cyan-900/50 dark:bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 bg-cyan-50 px-6 py-4 dark:border-slate-800 dark:bg-cyan-950/40">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500 text-white">
            <UserPlus size={18} />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Create New User</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in the details below to add a new user
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className={labelCls}>Username <span className="text-red-500">*</span></label>
            <input type="text" required placeholder="e.g. John Doe" value={formData.username} onChange={setField("username")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Email <span className="text-red-500">*</span></label>
            <input type="email" required placeholder="e.g. john@email.com" value={formData.email} onChange={setField("email")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Password <span className="text-red-500">*</span></label>
            <input type="password" required placeholder="••••••••" value={formData.password} onChange={setField("password")} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Phone</label>
            <input type="tel" placeholder="e.g. +1 234 567 890" value={formData.phone} onChange={setField("phone")} className={inputCls} />
          </div>
        </div>
          {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-500">
             {error}
              </p> 
                     )}
        <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <span className="text-red-500">*</span> Required fields
          </p>
          <div className="flex gap-3">
            <button
              type="button"
               disabled={submitting}
              onClick={() => setFormData(emptyForm)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Clear
            </button>
            <button
  type="submit"
  disabled={submitting}
  className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-70"
>
  {submitting ? <Loader2 size={16} className="animate-spin" /> : <UserPlus size={16} />}
  {submitting ? "Creating..." : "Create User"}
</button>
          </div>
        </div>
      </form>
    </div>
  );
}
