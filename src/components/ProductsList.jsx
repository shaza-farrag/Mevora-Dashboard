import Swiper from './Swiper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faEye, faSliders, faStar, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function ProductsList({products}) {
  return (
    <div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-10 gap-y-6 p-4 bg-[#F1F5F9] dark:bg-transparent">
  {products?.map((product) => (
    <div
      key={product._id}
      className="group flex flex-col  bg-white/80 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition overflow-hidden dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700 dark:hover:shadow-none"
    >
      <div className="relative h-64 bg-slate-100 rounded-t-3xl dark:bg-slate-800">
        <Swiper images={product.images} name={product.name}/>

        {product.featured && (
          <div className="absolute z-3 left-4 top-4 flex items-center gap-1 bg-amber-400 rounded-full text-slate-900 font-bold text-sm px-3 py-1">
            <FontAwesomeIcon icon={faStar} />
            <span>Featured</span>
          </div>
        )}

        <span
          className={`absolute z-3 bottom-4 right-4 rounded-full shadow text-sm font-bold py-1.5 px-3 ${
            product.stock === 0
              ? "bg-rose-100/90 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300 dark:border dark:border-rose-500/30"
              : "bg-emerald-100/90 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border dark:border-emerald-500/30"
          }`}
        >
          {product.stock === 0 ? "Out of Stock" : `${product.stock} in stock`}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-2">
        <h3 className="text-slate-900 font-bold text-lg dark:text-white">{product.name}</h3>

        <p className="uppercase text-slate-400 text-xs font-medium tracking-wide">
          {[product.category ,product.subcategory ,product.brand]
            .join(" · ")}
        </p>

        <p className="text-sm my-2 text-slate-500 line-clamp-2 dark:text-slate-400">
          {product.shortDescription}
        </p>

        <div className="flex flex-wrap items-baseline gap-3 mt-2">
          <span className="text-3xl text-slate-900 font-black dark:text-white">
            ${product.price}
          </span>
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              -${product.discountPrice} off
            </span>
        </div>

        {product.tags?.length >0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="bg-slate-100 text-slate-500 text-xs px-3 py-1 rounded-full dark:border dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-auto pt-4 justify-between border-t border-slate-100 dark:border-slate-800">
          <Link to={`/products/${product._id}`} className="p-2 text-sm text-slate-600 bg-slate-50 font-semibold rounded-xl border border-slate-200 hover:bg-cyan-50 hover:border-cyan-200 transition hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-cyan-500/40 dark:hover:text-cyan-300">
            <FontAwesomeIcon icon={faEye} className="pr-1" />
            View
          </Link>
          <button className="p-2 text-sm text-slate-600 bg-slate-50 font-semibold rounded-xl border border-slate-200 transition hover:bg-violet-50 hover:border-violet-200 hover:text-violet-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-violet-500/40 dark:hover:text-violet-300">
            <FontAwesomeIcon icon={faEdit} className="pr-1"/>
            Edit
          </button>
          <button className="p-2 text-sm text-slate-600 bg-slate-50 font-semibold rounded-xl border border-slate-200 transition hover:bg-amber-50 hover:border-amber-200 hover:text-amber-60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-amber-500/40 dark:hover:text-amber-300">
            <FontAwesomeIcon icon={faSliders} className="pr-1"/>
            Quick Edit
          </button>
          <button className="p-2 text-sm text-rose-600 bg-rose-50 font-semibold rounded-xl border border-rose-200 transition hover:bg-rose-100  dark:border-rose-500/20 dark:bg-rose-500/5 dark:text-rose-400 dark:hover:bg-rose-500/10">
            <FontAwesomeIcon icon={faTrash} className="pr-1"/>
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  )
}