
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

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  
  useEffect(() => {
    let ignore = false;

    async function fetchProduct() {
      try {
        const response = await getProductById(id);
        const productData = response?.product ?? response?.data?.product;

        if (!productData) {
          throw new Error("Product data was not found.");
        }

        if (!ignore) {
          setProduct(productData);
          setSelectedImage(0);
          setError("");
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch product:", err);
          setProduct(null);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to load product. Please try again."
          );
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    if (id) {
      fetchProduct();
    }

    return () => {
      ignore = true;
    };
  }, [id]);


  if (isLoading) {
    return (
      <div className="p-4">
        <ViewProductSkeleton />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4 p-6 text-center">
        <p className="text-lg font-semibold text-red-600 dark:text-red-400">
          {error || "Product not found."}
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Go Back
        </button>
      </div>
    );
  }

  const images = Array.isArray(product.images) ? product.images : [];
  const validImages = images.filter((image) => image?.url);
  const safeSelectedImage =
    selectedImage < validImages.length ? selectedImage : 0;

  return (
    <div className="space-y-6 bg-[#F1F5F9] p-4 dark:bg-transparent">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-950 to-slate-800 px-6 py-6 text-white shadow-lg sm:px-8 sm:py-8 dark:border dark:border-slate-800">
        <button
          type="button"
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
              {product.name || "Product Details"}
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Product details overview
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Images */}
        <div className="min-w-0 space-y-4">
          <div className="overflow-hidden rounded-3xl bg-slate-300 shadow-md dark:bg-slate-800">
            {validImages.length > 0 ? (
              <img
                src={validImages[safeSelectedImage]?.url}
                alt={product.name || "Product"}
                className="h-[300px] w-full object-cover sm:h-[420px]"
              />
            ) : (
              <div className="flex h-[300px] items-center justify-center text-slate-500 dark:text-zinc-400 sm:h-[420px]">
                No image available
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          {validImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {validImages.map((image, index) => (
                <button
                  key={image.url || index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={safeSelectedImage === index}
                  className={`h-20 w-28 cursor-pointer overflow-hidden rounded-xl border-2 shadow-md transition ${
                    safeSelectedImage === index
                      ? "border-blue-500"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.url}
                    alt={`${product.name || "Product"} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Swiper */}
          {validImages.length > 0 && (
            <div className="h-72 w-full min-w-0 overflow-hidden rounded-3xl">
              <Swiper images={validImages} name={product.name || "Product"} />
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="min-w-0 space-y-5">
          {/* Overview */}
          <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <p className="text-sm font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
              Overview
            </p>

            <h3 className="mt-2 break-words text-3xl font-extrabold text-slate-900 dark:text-white">
              {product.name || "Unnamed Product"}
            </h3>

            <p className="mt-3 break-words leading-relaxed text-slate-600 dark:text-slate-400">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Product Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
                Price
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                ${Number(product.price ?? 0).toLocaleString()}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
                Discount Price
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                {product.discountPrice != null
                  ? `$${Number(product.discountPrice).toLocaleString()}`
                  : "N/A"}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
                Stock
              </p>
              <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                {product.stock ?? 0}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
              <p className="text-sm uppercase text-slate-500 dark:text-slate-400">
                SKU
              </p>
              <p className="mt-2 break-words text-xl font-bold text-slate-900 dark:text-white">
                {product.sku || "N/A"}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-3xl bg-white p-6 shadow ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <FontAwesomeIcon icon={faTag} />
              Tags
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {Array.isArray(product.tags) && product.tags.length > 0 ? (
                product.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300"
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
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-purple-50 p-5 dark:from-slate-900 dark:to-slate-900 dark:ring-1 dark:ring-slate-800">
            <div className="mb-3 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <svg
                className="h-5 w-5 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
          <div className="rounded-3xl bg-amber-50 p-6 shadow dark:bg-amber-500/10 dark:ring-1 dark:ring-amber-500/20">
            <div className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <FontAwesomeIcon icon={faStar} />
              Highlights
            </div>

            <p className="mt-3 break-words text-slate-700 dark:text-slate-300">
              {product.shortDescription || "No highlights available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProduct;
