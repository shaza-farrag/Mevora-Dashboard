import { useNavigate } from "react-router-dom";
import { Bell, Sun, Moon, LogOut, Menu } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useTheme } from "../../context/useTheme";
import logo from "../../assets/Logo.png";

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const name = user?.name || user?.username || "ADMIN";
  const role = user?.role || "Admin";

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      navigate("/login");
    }
  };

  const iconBtn =
    "relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 sm:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className={`${iconBtn} lg:hidden`} aria-label="Open menu">
          <Menu size={18} />
        </button>
        <img src={logo} alt="Koda Store" className="h-12 w-auto rounded-md" />
        <div className="hidden sm:block leading-tight">
          <h1 className="text-base font-bold text-slate-900 dark:text-white">Mevora Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">E-Commerce Admin Panel</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className={iconBtn} aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
            <p className="text-xs capitalize text-slate-500 dark:text-slate-400">{role}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
