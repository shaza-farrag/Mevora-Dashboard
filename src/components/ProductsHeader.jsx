
import {
  faArrowTrendUp,
  faBox,
  faCubes,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function ProductsHeader({
  total,
  featured,
  inStock,
  outOfStock,
}) {
  const stats = [
    {
      label: "Total",
      value: total,
      icon: faBox,
      iconClass: "bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400",
    },
    {
      label: "Featured",
      value: featured,
      icon: faStar,
      iconClass: "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      label: "In Stock",
      value: inStock,
      icon: faArrowTrendUp,
      iconClass: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: faCubes,
      iconClass: "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
    },
  ];

  return (
    <div className="space-y-6 my-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/60 to-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900">
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-100 text-3xl text-cyan-600 dark:bg-slate-800 dark:text-slate-300">
            <FontAwesomeIcon icon={faBox}/>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-slate-500 dark:text-slate-500">
              Product Dashboard
            </p>
            <h1 className="mt-1 text-4xl font-extrabold text-slate-800 dark:text-white">
              Products
            </h1>
          </div>
        </div>

        <Link to="/products/add" className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-200 transition hover:bg-cyan-600 dark:shadow-none">
          <FontAwesomeIcon icon={faPlus}/>
          Add Product
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-xl text-cyan-600 dark:bg-slate-800 dark:text-slate-300">
            <FontAwesomeIcon icon={faBox}/>
          </div>
          <p className="mt-6 text-2xl font-extrabold text-slate-800 dark:text-white">{total}</p>
          <p className="mt-1 text-slate-500 text-sm dark:text-slate-500">Total</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-xl text-amber-600 dark:bg-slate-800 dark:text-slate-300">
            <FontAwesomeIcon icon={faStar}/>
          </div>
          <p className="mt-6 text-2xl font-extrabold text-slate-800 dark:text-white">{featured}</p>
          <p className="mt-1 text-slate-500 text-sm dark:text-slate-500">Featured</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-xl text-emerald-600 dark:bg-slate-800 dark:text-slate-300">
            <FontAwesomeIcon icon={faArrowTrendUp}/>
          </div>
          <p className="mt-6 text-2xl font-extrabold text-slate-800 dark:text-white">{inStock}</p>
          <p className="mt-1 text-slate-500 text-sm dark:text-slate-500">In Stock</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-xl text-rose-600 dark:bg-slate-800 dark:text-slate-300">
            <FontAwesomeIcon icon={faCubes}/>
          </div>
          <p className="mt-6 text-2xl font-extrabold text-slate-800 dark:text-white">{outOfStock}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">Out of Stock</p>
        </div>
      </div>
    </div>
  );
}
