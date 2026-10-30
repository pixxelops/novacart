import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface ProductCardProps { product: Product; }
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080").replace(/\/$/, "");

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.imageUrls?.length ? `${API_BASE_URL}${product.imageUrls[0]}` : null;
  const discountedPrice = product.price - (product.price * product.discountPercentage) / 100;

  return (
    <article className="nc-product-card">
      <Link to={`/products/${product.id}`} className="nc-product-card__image-link" aria-label={`View ${product.name}`}>
        <div className="nc-product-card__image">
          {imageUrl ? <img src={imageUrl} alt={product.name} loading="lazy" /> : <div className="nc-product-card__no-image"><span aria-hidden="true">✳</span><span>NOVACART FIND</span></div>}
          {product.discountPercentage > 0 && <span className="nc-product-card__discount">−{Math.round(product.discountPercentage)}%</span>}
          <span className="nc-product-card__open" aria-hidden="true">↗</span>
          <span className="nc-product-card__quick">Discover item <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
      <div className="nc-product-card__details">
        <p className="nc-product-card__brand">{product.brand || "THE EVERYDAY EDIT"}</p>
        <Link to={`/products/${product.id}`} className="nc-product-card__name">{product.name}</Link>
        <div className="nc-product-card__price"><strong>₹{Math.round(discountedPrice).toLocaleString("en-IN")}</strong>{product.discountPercentage > 0 && <span>₹{Math.round(product.price).toLocaleString("en-IN")}</span>}</div>
      </div>
    </article>
  );
}
