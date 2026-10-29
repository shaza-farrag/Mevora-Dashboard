
import { getProductById } from "@/api/productsApi";
import Swiper from "@/components/Swiper";
import ViewProductSkeleton from "@/components/ViewProductSkeleton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  faStar,
  faEye,
  faTag,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  
useEffect(() => {
  let ignore = false;

  async function fetchProduct() {
    try {
      const data = await getProductById(id);

      if (!ignore) {
        setProduct(data.product);
        setSelectedImage(0);
        setError(false);
      }
    } catch (err) {
      if (!ignore) {
        console.error("Failed to fetch product:", err);
        setError(true);
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
      <div className="w-full min-w-0">
        <ViewProductSkeleton />
      </div>
    );
  }

  if (error || !product?._id) {
    return (
      <div className="flex min-h-64 w-full flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center text-slate-800 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
        <h2 className="text-xl font-bold">
          {error ? "Failed to load product" : "Product not found"}
        </h2>

        <p className="text-sm text-slate-500 dark:text-zinc-400">
          Please try again or return to the previous page.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </button>
      </div>
    );
  }

  const images = product.images || [];

  return (
    <div className="w-full min-w-0 space-y-6 p-4 text-slate-900 transition-colors duration-300 dark:text-zinc-100 sm:p-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-6 text-white shadow-lg sm:px-8 sm:py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-slate-100 transition hover:text-white"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>

        <div className="mt-5 flex items-center gap-4">
          <FontAwesomeIcon icon={faEye} className="text-xl" />

          <div className="min-w-0">
            <h2 className="break-words text-2xl font-extrabold sm:text-3xl">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Product details overview
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Images Section */}
        <div className="min-w-0 space-y-4">
          <div className="overflow-hidden rounded-3xl bg-slate-200 shadow-md dark:bg-zinc-800">
            {images.length > 0 ? (
              <img
                src={images[selectedImage]?.url}
                alt={product.name}
                className="h-[300px] w-full object-cover sm:h-[420px]"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-slate-500 dark:text-zinc-400 sm:h-[420px]">
                No image available
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="flex flex-wrap gap-3">
            {images.map((image, index) => (
              <button
                key={image.url || index}
                onClick={() => setSelectedImage(index)}
                aria-label={`View product image ${index + 1}`}
                className={`h-20 w-28 cursor-pointer overflow-hidden rounded-xl border-2 shadow-md transition ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Swiper */}
          {images.length > 0 && (
            <div className="h-72 w-full min-w-0 overflow-hidden rounded-3xl">
              <Swiper images={product.images} name={product.name} />
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="min-w-0 space-y-5">
          {/* Overview */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-cyan-400">
              Overview
            </p>

            <h3 className="mt-2 break-words text-3xl font-extrabold">
              {product.name}
            </h3>

            <p className="mt-3 leading-relaxed text-slate-600 dark:text-zinc-400">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Product Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm uppercase text-slate-500 dark:text-zinc-400">
                Price
              </p>
              <p className="mt-2 text-xl font-bold">
                ${product.price ?? "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm uppercase text-slate-500 dark:text-zinc-400">
                Discount
              </p>
              <p className="mt-2 text-xl font-bold">
                {product.discountPrice != null
                  ? `$${product.discountPrice}`
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm uppercase text-slate-500 dark:text-zinc-400">
                Stock
              </p>
              <p className="mt-2 text-xl font-bold">
                {product.stock ?? "N/A"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
              <p className="text-sm uppercase text-slate-500 dark:text-zinc-400">
                SKU
              </p>
              <p className="mt-2 break-words text-xl font-bold">
                {product.sku || "N/A"}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-2 font-semibold">
              <FontAwesomeIcon
                icon={faTag}
                className="text-blue-600 dark:text-cyan-400"
              />
              Tags
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {product.tags?.length > 0 ? (
                product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    #{tag}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  No tags available.
                </p>
              )}
            </div>
          </div>

          {/* Category Info */}
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 p-5 transition-colors duration-300 dark:from-zinc-900 dark:to-slate-900">
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <svg
                className="h-5 w-5 text-slate-500 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
              </svg>

              Category Info
            </div>

            <p className="mt-2 break-words text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-zinc-400">
              {[product.category, product.subcategory, product.brand]
                .filter(Boolean)
                .join(" · ") || "No category information"}
            </p>
          </div>

          {/* Highlights */}
          <div className="rounded-3xl bg-amber-50 p-6 text-slate-900 shadow-sm transition-colors duration-300 dark:bg-amber-950/30 dark:text-zinc-100">
            <div className="mb-2 flex items-center gap-2 font-semibold">
              <FontAwesomeIcon
                icon={faStar}
                className="text-amber-500"
              />
              Highlights
            </div>

            <p className="mt-3 text-slate-700 dark:text-zinc-300">
              {product.shortDescription || "No highlights available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
