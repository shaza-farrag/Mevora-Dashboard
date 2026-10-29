import { useState } from "react";
import { searchProducts } from  "@/api/productsApi"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";

export default function Search({ setProducts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [isOpen, setisOpen] = useState(false)
  const [active, setactive] = useState(false)
  async function handleSearch() {
    try {
      const params = {};

      if (search !== "") {
        params.search = search;
      }
      if (category !== "") {
        params.category = category;
      }
      if (subcategory !== "") {
        params.subcategory = subcategory;
      }

      const data = await searchProducts(params);

      setProducts(data.products);
    } catch (error) {
      console.log(error);
  }
}
  return (
    <div className="rounded-3xl border border-slate-100 bg-white/70 p-4 shadow-sm backdrop-blur my-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
         <FontAwesomeIcon icon={faSearch}/>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-300 "
          />
        </div>

        <button onClick={()=>{setisOpen(!isOpen);setactive(!active)}} className={`flex items-center justify-center gap-2 rounded-xl border ${active?"border-cyan-300 bg-cyan-50 text-cyan-600 ": "border-slate-200 text-slate-600 bg-slate-50 hover:border-slate-300 hover:text-slate-800"}   px-5 py-3 text-sm font-semibold transition`}>
          <FontAwesomeIcon icon={faSliders}/>
          Filters
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-cyan-200 transition hover:bg-cyan-600"
        >
          <FontAwesomeIcon icon={faSearch}/>
          Search
        </button>
      </div>

{isOpen &&
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-slate-500">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
          >
            <option value="">All Categories</option>
            <option value="electronics">electronics</option>
            <option value="phones">phones</option>
            <option value="fashion">fashion</option>
            <option value="home">home</option>
            <option value="beauty">beauty</option>
            <option value="sports">sports</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-slate-500">
            Subcategory
          </label>
          <input
            type="text"
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            placeholder="e.g. smartphones"
            className="w-full rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-100"
          />
        </div>
      </div>
}
    </div>
  );
}