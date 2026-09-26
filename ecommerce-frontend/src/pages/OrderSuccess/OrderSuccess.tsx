import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderById, type OrderResponse } from '../../services/orderService';

const OrderSuccess = () => {

  const {orderId} = useParams();
  const navigate = useNavigate();

  const[order,setOrder] = useState<OrderResponse|null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchOrder = async ()=>{
      if(!orderId){
        setError("Invalid order ID. ");
        setLoading(false);
        return;
      }

      try {
        const data = await getOrderById(Number(orderId));
        setOrder(data);
        
      } catch (error) {
        console.error("Failed to load order:", error);
        setError("Unable to load your order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();

  }, [orderId]);

  if(loading){
    return(
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">
          Loading your order details...
        </p>
       </div>
    )
  }

  if(error || !order){
    return(
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">

        <h1 className="text-2xl font-bold text-gray-900">
          Something went Wrong
        </h1>
        <p className="mt-3 text-gray-500">
          {error || "Order details not found."}
        </p>

        <button className="mt-6 rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800">
          Continue Shopping
        </button>
      </div>
    );
  }
  
  
 return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">

        {/* Success Header */}
        <div className="rounded-lg border bg-white p-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <span className="text-3xl text-green-600">
              ✓
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-3 text-gray-500">
            Thank you for shopping with NovaCart.
          </p>

          <p className="mt-2 text-sm text-gray-500">
            Your order #{order.orderId} has been placed successfully.
          </p>

        </div>

        {/* Order Information */}
        <div className="mt-6 rounded-lg border bg-white p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Order ID
              </p>

              <p className="mt-1 text-lg font-semibold text-gray-900">
                #{order.orderId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Status
              </p>

              <span className="mt-1 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                {order.status}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

        </div>

        {/* Ordered Items */}
        <div className="mt-6 rounded-lg border bg-white p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Order Items
          </h2>

          <div className="mt-5 divide-y">

            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between py-4"
              >

                <div>
                  <p className="font-medium text-gray-900">
                    {item.productName}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{item.price.toLocaleString("en-IN")} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  ₹{item.subtotal.toLocaleString("en-IN")}
                </p>

              </div>
            ))}

          </div>

          <div className="mt-5 border-t pt-5">

            <div className="flex justify-between text-lg">
              <span className="font-semibold">
                Total
              </span>

              <span className="font-bold">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

          </div>

        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() => navigate("/products")}
            className="flex-1 rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="flex-1 rounded-md border bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50"
          >
            View My Orders
          </button>

        </div>

      </div>
    </div>
  );
};

export default OrderSuccess