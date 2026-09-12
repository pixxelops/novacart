import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { cancelOrder, getOrderById, type OrderResponse } from '../../services/orderService';
const OrderDetails = () => {

    const {orderId} = useParams();
    const navigate = useNavigate();

    const [order,setOrder] = useState<OrderResponse|null>(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);
    const [error,setError]  = useState("");
    const [cancelError, setCancelError] = useState("");


    useEffect(() => {
      const fetchOrder = async()=>{
        if(!orderId){
            setError("Invalid Order id.");
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError("");
            const data = await getOrderById(Number(orderId));

            setOrder(data);
            
        } catch (error) {
              console.error("Failed to fetch order:", error);
        setError("Unable to load this order.");
      } finally {
        setLoading(false);
      }
      }
    
     fetchOrder();
    }, [orderId]);

    const handleCancelOrder = async()=>{
        if(!order || !orderId){
            return;
        }
        const confirmed = window.confirm(
            `Are You sure you want to cancel the Order #${order.orderId} ?`
        );

        if(!confirmed) return;


        try {
            setCancelling(true);
            setCancelError("");

            const cancelledOrder = await cancelOrder(Number(orderId));
            setOrder(cancelledOrder);
            
        } catch (error:any) {
         console.error("Failed to cancel order:", error);

      const message =
        error?.response?.data?.message ||
        "Unable to cancel this order.";

      setCancelError(message);
    } finally {
      setCancelling(false);
    }
    }

    const canCancel = 
    order?.status === "PENDING" ||
    order?.status === "CONFIRMED";


      const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";

      case "CONFIRMED":
        return "bg-blue-100 text-blue-700";

      case "SHIPPED":
        return "bg-purple-100 text-purple-700";

      case "DELIVERED":
        return "bg-green-100 text-green-700";

      case "CANCELLED":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

   if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

        <h1 className="text-2xl font-bold text-gray-900">
          Order Not Found
        </h1>

        <p className="mt-3 text-gray-500">
          {error || "This order could not be found."}
        </p>

        <button
          onClick={() => navigate("/orders")}
          className="mt-6 rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
        >
          Back to My Orders
        </button>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          onClick={() => navigate("/orders")}
          className="mb-6 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Back to My Orders
        </button>

        {/* Header */}
        <div className="rounded-lg border bg-white p-6">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Order
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                #{order.orderId}
              </h1>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 border-t pt-6 sm:grid-cols-3">

            <div>
              <p className="text-sm text-gray-500">
                Order Date
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Last Updated
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {new Date(order.updatedAt).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </p>
            </div>

          </div>

        </div>

        {/* Order Items */}
        <div className="mt-6 rounded-lg border bg-white p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Order Items
          </h2>

          <div className="mt-5 divide-y">

            {order.items.map((item) => (

              <div
                key={item.productId}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>
                  <p className="text-lg font-medium text-gray-900">
                    {item.productName}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{item.price.toLocaleString("en-IN")} ×{" "}
                    {item.quantity}
                  </p>
                </div>

                <div className="text-left sm:text-right">

                  <p className="text-sm text-gray-500">
                    Subtotal
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    ₹{item.subtotal.toLocaleString("en-IN")}
                  </p>

                </div>

              </div>

            ))}

          </div>

          {/* Total */}
          <div className="mt-5 border-t pt-5">

            <div className="flex items-center justify-between">

              <span className="text-lg font-semibold text-gray-900">
                Order Total
              </span>

              <span className="text-2xl font-bold text-gray-900">
                ₹{order.totalAmount.toLocaleString("en-IN")}
              </span>

            </div>

          </div>

        </div>

        {/* Cancellation */}
        <div className="mt-6 rounded-lg border bg-white p-6">

          <h2 className="text-lg font-semibold text-gray-900">
            Order Actions
          </h2>

          {cancelError && (
            <div className="mt-4 rounded-md bg-red-50 p-4 text-sm text-red-600">
              {cancelError}
            </div>
          )}

          {canCancel ? (
            <div className="mt-4">

              <p className="text-sm text-gray-500">
                You can cancel this order while it is pending or
                confirmed.
              </p>

              <button
                onClick={handleCancelOrder}
                disabled={cancelling}
                className="mt-4 rounded-md border border-red-500 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {cancelling
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>

            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              This order can no longer be cancelled.
            </p>
          )}

        </div>

      </div>

    </div>
  );
};

export default OrderDetails;