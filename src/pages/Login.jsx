
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import Axios from "../api/axios";
import logo from "../assets/Logo.png";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await Axios.post("/auth/login", formData);
      const result = response.data;
      const payload = result?.data ?? result;

      const token =
        payload?.token ??
        payload?.accessToken ??
        payload?.access_token;

      const user = payload?.user ?? result?.user;
      const role = user?.role ?? payload?.role;

      if (!token) {
        setError("Login response did not contain an access token.");
        return;
      }

      if (!role || String(role).toLowerCase() !== "admin") {
        setError("This account does not have Admin access.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.removeItem("accessToken");
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30 lg:grid-cols-2">
        {/* Branding panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-cyan-500 p-10 text-white lg:flex xl:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[35px] border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border-[35px] border-white/10" />

          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/15 backdrop-blur">
                <ShieldCheck size={27} />
              </div>

              <div>
                <p className="text-xl font-extrabold">Mevora</p>
                <p className="text-xs tracking-widest text-white/70">
                  COMMERCE DASHBOARD
                </p>
              </div>
            </div>

            <h1 className="mt-16 max-w-sm text-4xl font-extrabold leading-tight xl:text-5xl">
              Manage Your Store
              <br />
              Like a Pro.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/80 xl:text-base">
              Control products, orders, customers and analytics from one
              modern dashboard.
            </p>
          </div>

          <div className="relative space-y-3">
            {[
              "Product Management",
              "Order Tracking",
              "Customer Insights",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-sm">
                  ✓
                </span>
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Login form */}
        <div className="flex min-w-0 flex-col justify-center p-6 sm:p-10 lg:p-12">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-24 w-44 items-center justify-center overflow-hidden rounded-2xl border border-slate-700/70 bg-white p-3 shadow-lg shadow-cyan-950/20">
              <img
                src={logo}
                alt="Mevora Dashboard Logo"
                className="h-full w-full object-contain"
              />
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Admin Portal
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-white">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Sign in to your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/90 py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-cyan-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-950/20 transition hover:bg-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />
            <span className="text-xs text-slate-500">SECURE ACCESS</span>
            <div className="h-px flex-1 bg-slate-800" />
          </div>

          <p className="mt-5 text-center text-xs text-slate-500">
            Authorized administrators only
          </p>
        </div>
      </section>
    </main>
  );
}
