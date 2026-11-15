import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../services/cartService";
import { useCart } from "../../context/useCart";


const IMAGE_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
).replace(/\/$/, "");

const Cart = () => {
  const {
    cart,
    loading,
    refreshCart,
  } = useCart();

  const navigate = useNavigate();
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const handleIncrease = async (
    productId: number,
    quantity: number
  ) => {
    try {
      setActionLoading(true);

      await updateCartItem(productId, quantity + 1);

      await refreshCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDecrease = async (
    productId: number,
    quantity: number
  ) => {
    if (quantity <= 1) {
      return;
    }

    try {
      setActionLoading(true);

      await updateCartItem(productId, quantity - 1);

      await refreshCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRemove = async (productId: number) => {
    try {
      setActionLoading(true);

      await removeFromCart(productId);

      await refreshCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearCart = async () => {
    try {
      setActionLoading(true);

      await clearCart();

      await refreshCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading cart...</p>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-semibold text-gray-900">
          Your Cart
        </h1>

        <p className="mt-3 text-gray-500">
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart
            </h1>

            <p className="mt-1 text-gray-500">
              {cart.totalItems}{" "}
              {cart.totalItems === 1 ? "item" : "items"}
            </p>
          </div>

          <button
            onClick={handleClearCart}
            disabled={actionLoading}
            className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">

            {cart.items.map((item) => {

              const imagePath =
                item.imageUrls?.find((url) =>
                  url.startsWith("http")
                ) ?? item.imageUrls?.[0];

              const imageUrl = imagePath
                ? imagePath.startsWith("http")
                  ? imagePath
                  : `${IMAGE_BASE_URL}${imagePath}`
                : null;

              return (
                <div
                  key={item.productId}
                  className="flex gap-5 rounded-lg border bg-white p-5"
                >

                  {/* Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.productName}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">
                        No image
                      </span>
                    )}

                  </div>

                  {/* Product information */}
                  <div className="flex flex-1 flex-col justify-between">

                    <div>
                      <h2 className="font-semibold text-gray-900">
                        {item.productName}
                      </h2>

                      <p className="mt-1 text-gray-600">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">

                      {/* Quantity */}
                      <div className="flex items-center rounded-md border">

                        <button
                          onClick={() =>
                            handleDecrease(
                              item.productId,
                              item.quantity
                            )
                          }
                          disabled={
                            actionLoading ||
                            item.quantity <= 1
                          }
                          className="px-3 py-1 text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="min-w-10 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleIncrease(
                              item.productId,
                              item.quantity
                            )
                          }
                          disabled={actionLoading}
                          className="px-3 py-1 text-lg hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>

                      </div>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          handleRemove(item.productId)
                        }
                        disabled={actionLoading}
                        className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        Remove
                      </button>

                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{item.subtotal.toLocaleString("en-IN")}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-lg border bg-white p-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cart.totalItems}</span>
              </div>

              <div className="border-t pt-4">

                <div className="flex justify-between">
                  <span className="text-lg font-semibold">
                    Total
                  </span>

                  <span className="text-lg font-bold">
                    ₹{cart.totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>

            </div>

            <button
              className="mt-6 w-full rounded-md bg-black px-4 py-3 font-medium text-white hover:bg-gray-800"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;