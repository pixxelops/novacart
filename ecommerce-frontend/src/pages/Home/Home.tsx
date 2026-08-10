import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import { getProducts } from "../../services/productService";
import ProductCard from "../Products/ProductCard";

export default function Home() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    async function loadProducts() {

      try {

        setLoading(true);

        const data = await getProducts(0, 8, "id", "desc");

        setProducts(data.content);

      } catch (error) {

        console.error(error);

        setError("Unable to load products.");

      } finally {

        setLoading(false);

      }
    }

    loadProducts();

  }, []);

  return (
    <main className="bg-[#faf9f6]">

      {/* Hero */}
      <section className="border-b border-gray-200 bg-[#f1efe9]">

        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">

          <div>

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
              The everyday edit
            </p>

            <h1 className="max-w-2xl text-6xl font-black leading-[0.95] tracking-tight text-gray-950 sm:text-7xl">
              Products worth
              <span className="block italic font-medium">
                keeping.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-gray-600">
              Discover thoughtfully selected products for work, home,
              technology and everyday life.
            </p>

            <Link
              to="/products"
              className="mt-9 inline-flex rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Explore collection →
            </Link>

          </div>

          {/* Editorial visual */}
          <div className="relative hidden lg:block">

            <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#ddd9d0]">

              {products[0]?.imageUrls?.[0] ? (
                <img
                  src={`http://localhost:8080${products[0].imageUrls[0]}`}
                  alt={products[0].name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-500">
                  NovaCart
                </div>
              )}

            </div>

            {products[0] && (
              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl">

                <p className="text-xs uppercase tracking-widest text-gray-500">
                  Featured
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {products[0].name}
                </p>

              </div>
            )}

          </div>

        </div>

      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="mb-10 flex items-end justify-between">

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              Fresh picks
            </p>

            <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
              New arrivals
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden text-sm font-semibold text-gray-700 underline underline-offset-4 sm:block"
          >
            View all
          </Link>

        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">

            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>

                <div className="aspect-[4/5] animate-pulse rounded-2xl bg-gray-200" />

                <div className="mt-4 h-3 w-20 animate-pulse rounded bg-gray-200" />

                <div className="mt-2 h-5 w-40 animate-pulse rounded bg-gray-200" />

              </div>
            ))}

          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {error}
          </div>
        )}

        {/* Products */}
        {!loading && !error && (
          <>
            {products.length === 0 ? (
              <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
                No products available yet.
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">

                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>
            )}
          </>
        )}

      </section>

    </main>
  );
}