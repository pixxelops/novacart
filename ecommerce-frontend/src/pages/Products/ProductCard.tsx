import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

const API_URL = "http://localhost:8080";

export default function ProductCard({ product }: ProductCardProps) {

  const imageUrl =
    product.imageUrls && product.imageUrls.length > 0
      ? `${API_URL}${product.imageUrls[0]}`
      : null;

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
    >

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f1f0ec]">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-400">
            No image available
          </div>
        )}

        {/* Discount */}
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Hover action */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-3 rounded-full bg-white/95 px-4 py-3 text-center text-sm font-semibold opacity-0 shadow-lg transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View product
        </div>

      </div>

      {/* Information */}
      <div className="mt-4">

        <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900">
          {product.name}
        </h3>

        <div className="mt-2 flex istems-center gap-2">

          <span className="font-semibold text-gray-900">
            ₹ {discountedPrice.toLocaleString("en-IN")}
          </span>

          {product.discountPercentage > 0 && (
            <span className="text-sm text-gray-400 line-through">
              ₹ {product.price.toLocaleString("en-IN")}
            </span>
          )}

        </div>

      </div>

    </Link>
  );
}