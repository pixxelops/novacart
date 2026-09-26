import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import type { Product } from "../../types/product";
import { getProductById } from "../../services/productService";
import { useAuth } from "../../context/useAuth";
import { useCart } from "../../context/useCart";
import { createBuyNowOrder } from "../../services/orderService";

const API_URL = "http://localhost:8080";

export default function ProductDetails() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
    const {isAuthenticated} = useAuth();
  const {addItemToCart} = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  const [addingToCart, setAddingToCart] = useState(false);
const [addedToCart, setAddedToCart] = useState(false);
const [cartError, setCartError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getProductById(Number(id));

        setProduct(data);
        setSelectedImage(0);
      } catch (error) {
        console.error(error);
        setError("Unable to load this product.");
      } finally {
        setLoading(false);
      }
    } 

    loadProduct();
  }, [id]);

  const handleAddToCart = async() =>{
    if(!isAuthenticated){
      navigate("/login");
      return;
    }

    if(!product || product.stockQuantity <=0){
      return;
    }

    try{
      setAddingToCart(true);
      setAddedToCart(false);
      setCartError("");

      await addItemToCart(product.id, quantity);

      setAddedToCart(true);
      setTimeout(() =>{
        setAddedToCart(false);
      },2000);
    }catch(error){
      console.error("Failed to add product to cart : ", error);
      setCartError("Failed to add product to cart.");
    }finally{
      setAddingToCart(false);
      
    }
  }

  const handleBuyNow = async() => {
    if(!isAuthenticated){
      navigate("/login");
      return;
    }

    if(!product || product.stockQuantity <=0){
      return;
    }

    try{
      setCartError("");

      const order = await createBuyNowOrder(product.id,quantity);

      navigate(`/checkout?buyNowOrderId=${order.orderId}`);
    }
    catch(error){
      console.error("Failed to create buy now order : ", error);
      setCartError("Failed to create order. Please try again");
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#faf9f6] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="h-[520px] animate-pulse rounded-3xl bg-gray-200" />

            <div className="space-y-5">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-12 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-8 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#faf9f6] px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-950">
            Product unavailable
          </h1>

          <p className="mt-3 text-gray-500">
            {error || "We couldn't find this product."}
          </p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Back to shop
          </Link>
        </div>
      </main>
    );
  }

  const discountedPrice =
    product.price -
    (product.price * product.discountPercentage) / 100;

  const imageUrls = product.imageUrls ?? [];

  const selectedImageUrl =
    imageUrls.length > 0
      ? `${API_URL}${imageUrls[selectedImage]}`
      : null;

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity((current) => current + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((current) => current - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[#faf9f6]">

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="transition hover:text-black">
            Home
          </Link>

          <span>/</span>

          <Link to="/products" className="transition hover:text-black">
            Shop
          </Link>

          <span>/</span>

          <span className="text-gray-900">
            {product.name}
          </span>
        </div>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:py-12">

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(400px,0.75fr)]">

   
          {/* IMAGE VieW */}
    

          <div className="min-w-0">

            {/* Main image */}
            <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[#efede8] sm:h-[500px]">

              {selectedImageUrl ? (
                <img
                  src={selectedImageUrl}
                  alt={product.name}
                  className="h-full w-full object-contain p-6 sm:p-10"
                />
              ) : (
                <div className="text-gray-400">
                  No image available
                </div>
              )}

              {/* Discount */}
              {product.discountPercentage > 0 && (
                <span className="absolute left-5 top-5 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {imageUrls.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">

                {imageUrls.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    className={`overflow-hidden rounded-xl border-2 bg-[#efede8] transition ${
                      selectedImage === index
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="flex aspect-square items-center justify-center">

                      <img
                        src={`${API_URL}${image}`}
                        alt={`${product.name} ${index + 1}`}
                        className="h-full w-full object-contain p-2"
                      />

                    </div>
                  </button>
                ))}

              </div>
            )}

          </div>
          {/* PRODUCT INFORMTION */}
   

          <div className="lg:pt-4">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              {product.brand}
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-gray-950 sm:text-5xl">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mt-6 flex flex-wrap items-center gap-3">

              <span className="text-2xl font-semibold text-gray-950">
                ₹
                {discountedPrice.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>

              {product.discountPercentage > 0 && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              )}

            </div>

            {/* Stock */}
            <div className="mt-4">

              {product.stockQuantity > 0 ? (
                <p className="text-sm font-medium text-green-700">
                  ⚫ In stock — {product.stockQuantity} available
                </p>
              ) : (
                <p className="text-sm font-medium text-red-600">
                  ⚫ Out of stock
                </p>
              )}

            </div>

            {/* Description */}
            <div className="mt-7 border-y border-gray-200 py-6">

              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-900">
                Description
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                {product.description}
              </p>

            </div>

            {/* Quantity */}
            {product.stockQuantity > 0 && (
              <div className="mt-6">

                <p className="mb-3 text-sm font-semibold text-gray-900">
                  Quantity
                </p>

                <div className="flex w-fit items-center rounded-full border border-gray-300 bg-white">

                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                    className="px-5 py-3 text-lg disabled:opacity-30"
                  >
                    −
                  </button>

                  <span className="min-w-10 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stockQuantity}
                    className="px-5 py-3 text-lg disabled:opacity-30"
                  >
                    +
                  </button>

                </div>

              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <button
              type = "button"
              onClick = {handleAddToCart}
                disabled={product.stockQuantity === 0 || addingToCart} 
                className="flex-1 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
               {addingToCart ? "Adding to cart..." 
               :addedToCart ? "Added to cart ✅"
               : "Add to cart"}
              </button>

              {cartError && (
                <p className="mt-3 text-sm font-medium text-red-600">
                  {cartError}
                </p>
              )}

              <button
              type = "button"
              onClick={handleBuyNow}
                disabled={product.stockQuantity === 0}
                className="flex-1 rounded-full border border-gray-300 bg-white px-7 py-4 text-sm font-semibold text-gray-900 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Buy now
              </button>

            </div>

            {/* Category */}
            <div className="mt-7 flex items-center justify-between border-t border-gray-200 pt-5 text-sm">

              <span className="text-gray-500">
                Category
              </span>

              <span className="font-medium text-gray-900">
                {product.categoryName}
              </span>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}