import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { Product } from "../../types/product";

import ProductCard from "./ProductCard";
import { getProducts, searchProducts } from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const keyword = (searchParams.get("search") ?? "").trim();
  const pageSize = 8;

  useEffect(() => {
    let active = true;
    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const data = keyword
          ? await searchProducts(keyword, page, pageSize)
          : await getProducts(page, pageSize, "id", "desc");
        if (!active) return;
        setProducts(data.content);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error(err);
        if (active) setError("Unable to load products right now. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void loadProducts();
    return () => { active = false; };
  }, [page, pageSize, keyword]);

  useEffect(() => { setPage(0); }, [keyword]);

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <section className="nc-collection-hero">
        <div className="nc-collection-hero__inner">
          <p className="nc-kicker">THE NOVACART COLLECTION / {keyword ? "SEARCH" : "THE GOOD STUFF"}</p>
          <div className="nc-collection-hero__row">
            <div>
              <h1>{keyword ? <>Finding <em>“{keyword}”</em></> : <>Shop the <em>collection.</em></>}</h1>
              <p>{keyword ? "A few good finds from your search. Try another word if your favourite isn't here." : "Objects, essentials and everyday upgrades selected to make life a little better."}</p>
            </div>
            <span className="nc-collection-count">{keyword ? "SEARCH RESULTS" : "THE FULL EDIT"}<strong>{products.length > 0 ? `${products.length.toString().padStart(2, "0")} / PAGE` : "CURATED FOR YOU"}</strong></span>
          </div>
          {keyword && <Link className="nc-clear-search" to="/products">Clear search <span aria-hidden="true">×</span></Link>}
        </div>
      </section>

      <section className="nc-collection-page">
        <div className="nc-collection-toolbar"><span>{keyword ? `RESULTS FOR “${keyword}”` : "NEWEST ARRIVALS FIRST"}</span><span>PAGE {page + 1} OF {Math.max(totalPages, 1)}</span></div>
        {loading && <div className="nc-product-grid">{Array.from({ length: pageSize }).map((_, index) => <div key={index} className="nc-skeleton"><div /><span /><span /></div>)}</div>}
        {!loading && error && <div className="nc-state-message">{error}</div>}
        {!loading && !error && products.length === 0 && <div className="nc-empty-collection"><span aria-hidden="true">✳</span><h2>{keyword ? "No matches this time." : "The shelves are getting ready."}</h2><p>{keyword ? "Try a different search term or browse the full collection." : "Check back soon for the latest good finds."}</p><Link to="/products" className="nc-button nc-button--dark">{keyword ? "Browse everything" : "Refresh the collection"} <span aria-hidden="true">↗</span></Link></div>}
        {!loading && !error && products.length > 0 && <div className="nc-product-grid">{products.map(product => <ProductCard key={product.id} product={product} />)}</div>}
        {!loading && !error && totalPages > 1 && <div className="nc-pagination"><button type="button" onClick={() => setPage(value => Math.max(0, value - 1))} disabled={page === 0}>← Previous</button><div>{Array.from({ length: totalPages }).map((_, index) => <button type="button" key={index} onClick={() => setPage(index)} aria-current={page === index ? "page" : undefined} className={page === index ? "is-current" : ""}>{index + 1}</button>)}</div><button type="button" onClick={() => setPage(value => Math.min(totalPages - 1, value + 1))} disabled={page >= totalPages - 1}>Next →</button></div>}
      </section>
    </main>
  );
}
