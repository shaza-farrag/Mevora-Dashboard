
import Swiper from "./Swiper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faSliders,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductsList({ products }) {
  return (
    <div className="w-full min-w-0 rounded-3xl p-4 transition-colors duration-300">
      <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => (
          <div
            key={product._id}
            className="group flex min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            {/* Product Image */}
            <div className="relative h-64 rounded-t-3xl bg-slate-100 dark:bg-zinc-800">
              <Swiper images={product.images} name={product.name} />

              {product.featured && (
                <div className="absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-slate-900">
                  <FontAwesomeIcon icon={faStar} />
                  <span>Featured</span>
                </div>
              )}

              <span
                className={`absolute bottom-4 right-4 z-10 rounded-full px-3 py-1.5 text-sm font-bold shadow ${
                  product.stock === 0
                    ? "bg-rose-100/95 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    : "bg-emerald-100/95 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                }`}
              >
                {product.stock === 0
                  ? "Out of Stock"
                  : `${product.stock} in stock`}
              </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">
                {product.name}
              </h3>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-zinc-500">
                {[product.category, product.subcategory, product.brand]
                  .filter(Boolean)
                  .join(" · ")}
              </p>

              <p className="my-2 line-clamp-2 text-sm text-slate-500 dark:text-zinc-400">
                {product.shortDescription}
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-black text-slate-900 dark:text-zinc-100">
                  ${product.price}
                </span>
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  -${product.discountPrice} off
                </span>
              </div>

              {product.tags?.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto flex flex-wrap justify-between gap-2 border-t border-slate-100 pt-4 dark:border-zinc-800">
                <Link
                  to={`/products/${product._id}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-cyan-200 hover:bg-cyan-50 hover:text-cyan-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-cyan-800 dark:hover:bg-cyan-950 dark:hover:text-cyan-400"
                >
                  <FontAwesomeIcon icon={faEye} className="pr-2" />
                  View
                </Link>

                <Link
                  to={`/products/edit/${product._id}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-violet-800 dark:hover:bg-violet-950 dark:hover:text-violet-400"
                >
                  <FontAwesomeIcon icon={faEdit} className="pr-2" />
                  Edit
                </Link>

                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-amber-800 dark:hover:bg-amber-950 dark:hover:text-amber-400"
                >
                  <FontAwesomeIcon icon={faSliders} className="pr-2" />
                  Quick Edit
                </button>

                <button
                  type="button"
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300 dark:hover:bg-rose-950"
                >
                  <FontAwesomeIcon icon={faTrash} className="pr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
