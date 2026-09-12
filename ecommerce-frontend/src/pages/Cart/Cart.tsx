import { useEffect, useState } from "react";
import {
  getMyCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../services/cartService";
import type { CartResponse } from "../../types/Cart";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE_URL = "http://localhost:8080";

const Cart = () => {
  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchCart = async () => {
      try {
        const data = await getMyCart();

        if (!cancelled) {
          setCart(data);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCart();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleIncrease = async(
    productId : number,
    quantity : number
  ) => {
    try{
      const updatedCart = await updateCartItem(
        productId,
        quantity + 1
      );
      setCart(updatedCart);

    }
    catch(error){
      console.error("Failed to update quantity :", error);
    
    }
  }

  const handleDecrease = async(
    productId : number,
    quantity : number
  ) => {
    if(quantity <= 1){
      return;
    }

    try{
      const updatedCart = await updateCartItem(
        productId,
        quantity - 1
      );
      setCart(updatedCart);
    }
    catch(error){
      console.error("Failed to update quantity :", error);
    
    }
  }

  const handleRemove = async(productId : number) => {
    try{
      const updatedCart = await removeFromCart(productId);
      setCart(updatedCart);
    }
    catch(error){
      console.error("Failed to remove item :", error);
    }
  };

  const handleClearCart = async() => {
    try{
      await clearCart();
      
      setCart((currentCart) =>{
        if(!currentCart){
          return currentCart;
        }
        return {
          ...currentCart,
          items : [],
          totalItems : 0,
          totalPrice : 0,

        };
      });
    }
    catch(error){
      console.error("Failed to clear cart :", error);
    }
  }



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
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">

            {cart.items.map((item) => {
              const imageUrl =
                item.imageUrls && item.imageUrls.length > 0
                  ? `${IMAGE_BASE_URL}${item.imageUrls[0]}`
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
                          disabled={item.quantity <= 1}
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
                          className="px-3 py-1 text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          handleRemove(item.productId)
                        }
                        className="text-sm text-red-600 hover:text-red-700"
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
              onClick={() => {
                navigate("/checkout");
                
              }}
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