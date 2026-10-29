
import { useState } from "react";
import { searchProducts } from "@/api/productsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

export default function Search({ setProducts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e?.preventDefault();
    setLoading(true);
    setError("");

    try {
      const params = {};

      if (search.trim()) {
        params.search = search.trim();
      }

      if (category) {
        params.category = category;
      }

      if (subcategory.trim()) {
        params.subcategory = subcategory.trim();
      }

      const data = await searchProducts(params);

      setProducts(data?.products ?? data?.data?.products ?? []);
    } catch (err) {
      console.error("Product search failed:", err);
      setError(
        err.response?.data?.message ||
          "Failed to search products. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setSearch("");
    setCategory("");
    setSubcategory("");
    setError("");
    // Re-run the search without filters
    handleClearSearch();
  }

  async function handleClearSearch() {
    setLoading(true);

    try {
      const data = await searchProducts({});
      setProducts(data?.products ?? data?.data?.products ?? []);
      setError("");
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="my-6 rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900">
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-3 md:flex-row md:items-center"
      >
        {/* Search Input */}
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
          <FontAwesomeIcon
            icon={faSearch}
            className="text-slate-400 dark:text-slate-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        {/* Filters Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
            isOpen
              ? "border-cyan-300 bg-cyan-50 text-cyan-600 dark:border-cyan-500/40 dark:bg-cyan-500/10 dark:text-cyan-300"
              : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          }`}
        >
          <FontAwesomeIcon icon={faSliders} />
          Filters
        </button>

        {/* Search Button */}
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-200 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60 dark:shadow-none"
        >
          <FontAwesomeIcon icon={faSearch} />
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Filter Fields */}
      {isOpen && (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="product-category"
              className="mb-2 block text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Category
            </label>

            <select
              id="product-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-cyan-500/60 dark:focus:ring-cyan-500/10"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="phones">Phones</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="beauty">Beauty</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="product-subcategory"
              className="mb-2 block text-sm font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Subcategory
            </label>

            <input
              id="product-subcategory"
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              placeholder="e.g. smartphones"
              className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-500/60 dark:focus:ring-cyan-500/10"
            />
          </div>

          <div className="flex flex-wrap gap-3 md:col-span-2">
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 disabled:opacity-60"
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}
