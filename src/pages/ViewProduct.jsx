import { getProductById } from '@/api/productsApi'
import Swiper from '@/components/Swiper'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { faStar ,faEye, faTag, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchProduct() {
      setIsLoading(true);

      try {
        const data = await getProductById(id);

        if (!ignore) {
          setProduct(data.product);
          setSelectedImage(0);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch product:", err);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchProduct();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600 dark:border-slate-700 dark:border-t-blue-500" />
      </div>
    );
  }

  const images = product.images || []

  return (
    <div className="space-y-6 p-4 bg-[#F1F5F9] dark:bg-transparent">
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-6 text-white shadow-lg sm:px-8 sm:py-8 dark:border dark:border-slate-800">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-slate-100 transition hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft}/>
          <span>Back</span>
        </button>
        <div className="mt-5 flex items-center gap-4">
          <FontAwesomeIcon icon={faEye}/>
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">{product.name}</h2>
            <p className="text-sm mt-1 text-white/60">Product details overview</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl bg-slate-300 shadow-md dark:bg-slate-800">
            {images.length > 0 && (
              <img
                src={images[selectedImage]?.url}
                alt={product.name}
                className="h-[420px] w-full object-cover"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <button
                key={image.url || index}
                onClick={() => setSelectedImage(index)}
                className={`h-20 w-28 cursor-pointer overflow-hidden rounded-xl border-2 shadow-md transition ${
                  selectedImage === index
                    ? 'border-blue-500'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={image.url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="h-72 w-[700px] max-w-full overflow-hidden rounded-3xl">
            <Swiper images={product.images} name={product.name} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">Overview</p>
            <h3 className="mt-2 text-3xl font-extrabold dark:text-white">{product.name}</h3>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{product.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500">Price</p>
              <p className="mt-2 text-xl font-bold dark:text-white">${product.price}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500">Discount</p>
              <p className="mt-2 text-xl font-bold dark:text-white">${product.discountPrice}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500">Stock</p>
              <p className="mt-2 text-xl font-bold dark:text-white">{product.stock}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500">SKU</p>
              <p className="mt-2 text-xl font-bold dark:text-white">{product.sku}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <div className="flex items-center gap-2 font-semibold dark:text-white">
              <FontAwesomeIcon icon={faTag}/>
              Tags
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags?.length > 0 &&
                product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs dark:bg-slate-800 dark:text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>

          <div className='p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl dark:from-slate-900 dark:to-slate-900 dark:ring-1 dark:ring-slate-800'>
            <div className="flex items-center gap-2 font-semibold mb-3 dark:text-white">
              <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>
              Category Info
            </div>
            <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              {[product.category, product.subcategory, product.brand]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>

          <div className="rounded-3xl bg-amber-50 p-6 shadow dark:bg-amber-500/10 dark:ring-1 dark:ring-amber-500/20">
            <div className="flex items-center gap-2 font-semibold mb-2 dark:text-white">
              <FontAwesomeIcon icon={faStar} />
              Highlights
              </div>
            <p className="mt-3 text-slate-700 dark:text-slate-300">{product.shortDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProduct