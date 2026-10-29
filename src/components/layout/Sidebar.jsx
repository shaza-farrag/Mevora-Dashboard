import { NavLink } from "react-router-dom";
import {
  House,
  Users,
  Package,
  Plus,
  FileText,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { navLinks } from "../../config/navLinks";

const icons = { House, Users, Package, Plus, FileText, ShoppingCart, Settings };

function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-white dark:bg-slate-950 p-4">
      <div className="px-2 pt-2 pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-cyan-500">
          Commerce
        </p>
        <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
          Admin Panel
        </h2>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navLinks.map(({ to, label, icon, end }) => {
          const Icon = icons[icon];
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-900 text-white dark:bg-slate-800"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-500 p-5 text-white shadow-lg">
        <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-white/80">
          Live
        </p>
        <p className="mt-2 text-base font-semibold leading-snug">
          Connected to the E-commerce API
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
