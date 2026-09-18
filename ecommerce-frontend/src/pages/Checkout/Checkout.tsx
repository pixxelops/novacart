import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import type { CartResponse } from '../../types/Cart';

import { createOrder } from '../../services/orderService';
import { getMyCart } from '../../services/cartService';
import { createPaymentOrder, verifyPayment } from '../../services/paymentService';



const IMAGE_BASE_URL = "http://localhost:8080";

  const loadRazorpayScript = ():Promise<boolean> =>{
    return new Promise((resolve) => {
      if(document.getElementById("razorpay_checkout_script")){
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.id = "razorpay_checkout_script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";


      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);


    })
  }

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {

   let cancelled = false;

   const fetchCart = async() =>{
    try {
      const data = await getMyCart();
      if(!cancelled){
        setCart(data);
      }
    }
    catch(error){
      console.error("Failed to Load up the cart", error);

      if(!cancelled){
        console.error("Failed to Load up the cart");

      }
    }finally{
      if (!cancelled) {
          setLoading(false);
        }
    }

   };
  

   fetchCart();

   return () =>{
    cancelled = true;
   }
   
  }, []);

  const handlePlaceOrder = async() =>{
    if(!cart || cart.items.length === 0){
      return;
    }

    try{
      setPlacingOrder(true);
      setError("");
      const order  = await createOrder();

      const paymentOrder = await createPaymentOrder(
        order.orderId
      );

      const razorpayLoaded = await loadRazorpayScript();

      if(!razorpayLoaded){
        throw new Error("Failed to load Razorpay script. Please check your internet connection.");
      }
      

      const options = {
        key : paymentOrder.keyId,
        amount : paymentOrder.amount,
        currency : paymentOrder.currency,
        name : "Novacart",
        description : `Payment for Order #${order.orderId}`,
        order_id : paymentOrder.razorpayOrderId,

        handler : async(response : RazorpayPaymentResponse) =>{

          try {
            console.log("Payment successful. Verifying payment...");


            await verifyPayment({
              orderId : order.orderId,
              razorpayOrderId : response.razorpay_order_id,
              razorpayPaymentId : response.razorpay_payment_id,
              razorpaySignature : response.razorpay_signature
            });

            console.log("Payment verified successfully.");
            navigate(`/order-success/${paymentOrder.orderId}`);
          }

           catch (error: any) {
    console.error(
      "Payment verification failed:",
      error
    );

    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Payment verification failed. Please contact support.";

    setError(message);
    setPlacingOrder(false);
  }
},

      theme : {
        color : "#000000"
      },

      modal : {
        ondismiss : () => {
          console.log("Razorpay checkout closed");
          setPlacingOrder(false);
        },
      },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      }
      // navigate(`/order-success/${order.orderId}`);
      catch(error:any){
      console.error("Failed to start payment:", error);

      
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to start payment. Please try again.";

    setError(message);

    setPlacingOrder(false);
      }
  };



  if(loading){
    return(
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">
          Loading Checkout....
        </p>
      </div>
    )
  }

  if(!cart || cart.items.length === 0){
    return(
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Your cart is empty.
        </h1>

        <p className="mt-3">
          Please add some items to your cart before proceeding to checkout.
        </p>
        <button 
          className="mt-6 rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
      </div>

    )
  }
  
return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Checkout
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Products */}
          <div className="space-y-4 lg:col-span-2">

            <div className="rounded-lg border bg-white p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Order Items
              </h2>

              <div className="mt-6 space-y-5">

                {cart.items.map((item) => {

                  const imageUrl =
                    item.imageUrls &&
                    item.imageUrls.length > 0
                      ? `${IMAGE_BASE_URL}${item.imageUrls[0]}`
                      : null;

                  return (
                    <div
                      key={item.productId}
                      className="flex items-center gap-4 border-b pb-5 last:border-b-0 last:pb-0"
                    >

                      {/* Image */}
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-gray-100">

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={item.productName}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span className="text-xs text-gray-400">
                            No image
                          </span>
                        )}

                      </div>

                      {/* Information */}
                      <div className="flex-1">

                        <h3 className="font-semibold text-gray-900">
                          {item.productName}
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          ₹{item.price.toLocaleString("en-IN")} each
                        </p>

                      </div>

                      {/* Subtotal */}
                      <div className="font-semibold text-gray-900">
                        ₹{item.subtotal.toLocaleString("en-IN")}
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* Summary */}
          <div className="h-fit rounded-lg border bg-white p-6">

            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">

              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{cart.totalItems}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>
                  ₹{cart.totalPrice.toLocaleString("en-IN")}
                </span>
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

            {error && (
              <div className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder}
              className="mt-6 w-full rounded-md bg-black px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {placingOrder
                ? "Placing Order..."
                : "Place Order"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              disabled={placingOrder}
              className="mt-3 w-full rounded-md border px-4 py-3 font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;
