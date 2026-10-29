
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "@/api/productsApi";
import Search from "@/components/Search";
import ProductsHeader from "@/components/ProductsHeader";
import ProductsList from "@/components/ProductsList";
import ProductsSkeleton from "@/components/ProductsSkeleton";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchProducts() {
      try {
        const data = await getProducts();

        if (!ignore) {
          setProducts(data.products);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to fetch products:", err);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const stats = useMemo(() => {
    const featured = products.filter(
      (product) => product.featured
    ).length;

    const outOfStock = products.filter(
      (product) => product.stock === 0
    ).length;

    return {
      total: products.length,
      featured,
      inStock: products.length - outOfStock,
      outOfStock,
    };
  }, [products]);

  if (isLoading) {
    return (
      <div className="w-full min-w-0">
        <ProductsSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-6 p-4 text-slate-900 transition-colors duration-300 dark:text-zinc-100 sm:p-6">
      <ProductsHeader
        total={stats.total}
        featured={stats.featured}
        inStock={stats.inStock}
        outOfStock={stats.outOfStock}
      />

      <Search setProducts={setProducts} />

      <ProductsList products={products} />
    </div>
  );
}

export default Products;
