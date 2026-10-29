import { getProducts } from "@/api/productsApi"
import { useEffect, useState } from "react"
import Search from "@/components/Search"
import ProductsHeader from "@/components/ProductsHeader"
import ProductsList from "@/components/ProductsList"


function Products() {
  const [products, setProducts] = useState([])


const [stats, setStats] = useState({
  total: 0,
  featured: 0,
  inStock: 0,
  outOfStock: 0,
});
const [isLoading, setIsLoading] = useState(true)

async function getAllProduct() {
  try {
    setIsLoading(true)
    const data = await getProducts()
    setProducts(data.products)
  } catch (err) {
    console.log(err)
  } finally {
    setIsLoading(false)
  }
}
  useEffect(()=>{
    getAllProduct()
  },[])

  useEffect(() => {
  let featuredCount = 0;
  let inStockCount = 0;
  let outOfStockCount = 0;

  products.map((product) => {
    if (product.featured) {
      featuredCount++;
    }

    if (product.stock === 0) {
      outOfStockCount++;
    } else {
      inStockCount++;
    }
  });

  setStats({
    total: products.length,
    featured: featuredCount,
    inStock: inStockCount,
    outOfStock: outOfStockCount,
  });
}, [products]);

if (isLoading) {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
    </div>
  )
}
  return (
    <div>
      <ProductsHeader total={stats.total}
    featured={stats.featured}
    inStock={stats.inStock}
    outOfStock={stats.outOfStock}/>
      <Search setProducts={setProducts}/>
      <ProductsList products={products}/>
</div>
  )
}

export default Products