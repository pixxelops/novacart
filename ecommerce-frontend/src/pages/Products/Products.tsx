import { useEffect, useState } from 'react'
import type { Product } from '../../types/product'
import { getProducts } from '../../services/productService';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function Products(){

    const [products,setProducts] =useState<Product[]>([]);

    const [page,setPage] = useState(0);
    const [totalPages,setTotalPages] = useState(0);

    const[loading,setLoading] = useState(false);

    const[error,setError] = useState("");

    const pageSize = 8;

    useEffect(() => {
        async function loadProducts(){
             try{
                setLoading(true);
                setError("");

                const data = await getProducts(page,pageSize,"id","desc");


                setProducts(data.content);
                setTotalPages(data.totalPages);
        }catch(error){
            console.error(error);
            setError("Unable to load products");
        }finally{
            setLoading(false);
        }

        }

        loadProducts();
       
    },[page]);
    
  return (
    <main className="min-h-screen bg-[#faf9f6]">
        {/* Header */}
        <section className="border-b border-gray-200 bg-[#f1efe9]">
            <div className="mx-auto max-w-7xl px-6 py-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                    NovaCart collection
                     </p>

                     <div className="mt-4 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <h1 className="text-5xl font-black tracking-tight text-gray-950">
                                Shop
                            </h1>

                            <p className="mt-3 max-w-xl text-gray-600">
                                Explore our latestt products and find something worth keeping.
                            </p>
                        </div>
                        <span className="text-sm text-gray-500">
                            Page {page + 1} of {Math.max(totalPages, 1)}
                        </span>
                    
                     </div>

            </div>
        </section>

        {/* Products */}
        <section className="mx-auto max-w-7xl px-6 py-16">
            {loading &&(
                <div className="grid grid-cols-2 grap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-3 lg:grid:cols-4">
                    {Array.from({length:pageSize}).map((_,index) =>(
                        <div key={index} >
                              <div className="aspect-4/5 animate-pulse rounded-2xl bg-gray-200" />

                <div className="mt-4 h-3 w-20 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-5 w-40 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-200" />


                        </div>
                        
                    ))}
                </div>
            )}

             {!loading && !error && products.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-16 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No products found
            </h2>

            <Link
              to="/"
              className="mt-4 inline-block text-sm font-semibold underline underline-offset-4"
            >
              Return home
            </Link>
          </div>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

         {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-3">

            <button
              onClick={() => setPage((current) => current - 1)}
              disabled={page === 0}
              className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
                    page === index
                      ? "bg-black text-white"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((current) => current + 1)}
              disabled={page === totalPages - 1}
              className="rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>

          </div>
        )}
        </section>

    </main>
   

  )
}
