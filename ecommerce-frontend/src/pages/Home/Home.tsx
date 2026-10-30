import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Product } from "../../types/product";

import ProductCard from "../Products/ProductCard";
import { getProducts } from "../../services/productService";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");
        const data = await getProducts(0, 8, "id", "desc");
        if (active) setProducts(data.content);
      } catch (err) {
        console.error(err);
        if (active) setError("We couldn't load the latest products. Please try again in a moment.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadProducts();
    return () => { active = false; };
  }, []);

  const featured = products[0];
  const heroImage = featured?.imageUrls?.[0] ? `${API_BASE_URL}${featured.imageUrls[0]}` : null;

  return (
    <main className="nc-home">
      <section className="nc-hero">
        <div className="nc-hero__grain" aria-hidden="true" />
        <div className="nc-hero__copy">
          <div className="nc-eyebrow"><span className="nc-eyebrow__dot" /> THE GOOD FINDS CLUB <span className="nc-eyebrow__edition">— VOL. 01</span></div>
          <h1>Everyday things.<br /><em>Extraordinary</em><br />feeling.</h1>
          <p className="nc-hero__description">A considered collection of technology, essentials and little upgrades that make daily life better.</p>
          <div className="nc-hero__actions">
            <Link to="/products" className="nc-button nc-button--lime">Explore the collection <span aria-hidden="true">↗</span></Link>
            <a href="#new-arrivals" className="nc-text-link">See what’s new <span aria-hidden="true">↘</span></a>
          </div>
          <div className="nc-hero__meta"><span><strong>01</strong> / THE EVERYDAY EDIT</span><span>MADE FOR YOUR EVERY DAY</span></div>
        </div>

        <div className="nc-hero__visual">
          <div className="nc-hero__image-frame">
            {heroImage ? <img src={heroImage} alt={featured?.name ?? "Featured NovaCart product"} /> : <div className="nc-hero__image-placeholder"><span className="nc-placeholder-star">✳</span><span>YOUR NEXT<br />FAVOURITE THING</span></div>}
            <div className="nc-hero__image-wash" />
            <span className="nc-hero__vertical-label">OBJECTS OF EVERYDAY WONDER</span>
          </div>
          <div className="nc-sticker" aria-label="Good things"><span>GOOD<br />THINGS</span><b>✳</b></div>
          {featured && <Link to={`/products/${featured.id}`} className="nc-featured-note"><span className="nc-featured-note__copy"><span className="nc-featured-note__label">THE ONE TO KNOW</span><span className="nc-featured-note__name">{featured.name}</span></span><span aria-hidden="true">↗</span></Link>}
          <div className="nc-hero__orbit" aria-hidden="true">N<span>✳</span>C</div>
        </div>
        <div className="nc-hero__bottom"><span>CURIOUS BY NATURE. BETTER BY DESIGN.</span><a href="#new-arrivals">SCROLL TO DISCOVER ↓</a></div>
      </section>

      <section className="nc-benefits" aria-label="Shopping benefits">
        <div><span className="nc-benefit-icon" aria-hidden="true">↗</span><span><strong>Delivery made easy</strong><small>From our store to your door</small></span></div>
        <div><span className="nc-benefit-icon" aria-hidden="true">◇</span><span><strong>Checkout with confidence</strong><small>Secure Razorpay payments</small></span></div>
        <div><span className="nc-benefit-icon" aria-hidden="true">↻</span><span><strong>Here for the long run</strong><small>Support when you need it</small></span></div>
      </section>

      <section className="nc-arrivals" id="new-arrivals">
        <div className="nc-section-heading">
          <div><p className="nc-kicker">A LITTLE SOMETHING NEW</p><h2>Find your <em>favourite.</em></h2><p className="nc-section-copy">Thoughtful picks for your desk, your downtime and everywhere in between.</p></div>
          <Link to="/products" className="nc-view-all">Shop all products <span aria-hidden="true">↗</span></Link>
        </div>

        {loading && <div className="nc-product-grid">{Array.from({ length: 8 }).map((_, i) => <div className="nc-skeleton" key={i}><div /><span /><span /></div>)}</div>}
        {!loading && error && <div className="nc-state-message">{error} <Link to="/products">Browse all products →</Link></div>}
        {!loading && !error && products.length === 0 && <div className="nc-state-message">The shelves are getting ready. Check back soon for our latest finds.</div>}
        {!loading && !error && products.length > 0 && <div className="nc-product-grid">{products.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)}</div>}
      </section>

      <section className="nc-manifesto">
        <div className="nc-manifesto__mark" aria-hidden="true">✳</div>
        <p className="nc-kicker">A NOTE FROM NOVACART</p>
        <h2>Less scrolling.<br /><em>More discovering.</em></h2>
        <p>Good design isn’t just how something looks. It’s how it fits into your life. We’re here to make the everyday a little more interesting, one good find at a time.</p>
        <Link to="/products" className="nc-button nc-button--dark">Find your next favourite <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
