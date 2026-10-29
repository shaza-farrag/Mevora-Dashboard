
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import Axios from "../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await Axios.post("/auth/login", formData);
      const result = response.data;

      // Support common API response shapes
      const payload = result?.data ?? result;
      const token =
        payload?.token ??
        payload?.accessToken ??
        payload?.access_token;

      const user = payload?.user ?? result?.user;

      if (!token) {
        setError(
          "Login response did not contain a token. Check the API response."
        );
        return;
      }

      // Do not allow a known non-admin account into the admin dashboard
      const role = user?.role ?? payload?.role;

      if (role && String(role).toLowerCase() !== "admin") {
        setError("This account does not have Admin access.");
        return;
      }

      // Use the token key already supported by Axios
      localStorage.setItem("token", token);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

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
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
            <LockKeyhole size={27} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Sign in to your admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-pink-950"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-12 text-gray-900 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-pink-950"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-pink-600 py-3 font-semibold text-white transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Authorized administrators only
        </p>
      </section>
    </main>
  );
}
