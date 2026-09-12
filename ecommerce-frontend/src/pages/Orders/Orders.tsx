import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMyOrder, type OrderResponse } from '../../services/orderService';

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState<OrderResponse[]>([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchOrders = async()=>{
        try {
            setLoading(true);
            setError("");

            const data = await getMyOrder();
            setOrders(data);
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        setError("Unable to load your orders.");
      } finally {
        setLoading(false);
      }
      }
    fetchOrders();
    }, []);

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
          Loading your orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">

        <h1 className="text-2xl font-bold text-gray-900">
          Unable to load orders
        </h1>

        <p className="mt-3 text-gray-500">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 rounded-md bg-black px-6 py-3 text-white hover:bg-gray-800"
        >
          Try Again
        </button>

      </div>
    );
  }
    
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage your previous orders.
          </p>

        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <div className="rounded-lg border bg-white px-6 py-16 text-center">

            <div className="text-5xl">
              📦
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              No orders yet
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 rounded-md bg-black px-6 py-3 font-medium text-white hover:bg-gray-800"
            >
              Start Shopping
            </button>

          </div>
        ) : (

          <div className="space-y-5">

            {orders.map((order) => (

              <div
                key={order.orderId}
                className="rounded-lg border bg-white p-6 transition hover:shadow-md"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between">

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
                      Order Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Status
                    </p>

                    <span
                      className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </div>

                </div>

                {/* Order Items */}
                <div className="py-5">

                  <p className="mb-4 text-sm font-semibold text-gray-700">
                    {order.items.length}{" "}
                    {order.items.length === 1 ? "Item" : "Items"}
                  </p>

                  <div className="space-y-3">

                    {order.items.slice(0, 3).map((item) => (

                      <div
                        key={item.productId}
                        className="flex items-center justify-between"
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

                    {order.items.length > 3 && (
                      <p className="text-sm text-gray-500">
                        + {order.items.length - 3} more item
                        {order.items.length - 3 === 1 ? "" : "s"}
                      </p>
                    )}

                  </div>

                </div>

                {/* Footer */}
                <div className="flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <p className="mt-1 text-xl font-bold text-gray-900">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <button
                    onClick={() =>
                      navigate(`/orders/${order.orderId}`)
                    }
                    className="rounded-md bg-black px-5 py-3 text-sm font-medium text-white hover:bg-gray-800"
                  >
                    View Details
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Orders;