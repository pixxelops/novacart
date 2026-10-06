import { useEffect, useState } from "react";
import { deliverOrder, getAllOrders, getMyOrder, shipOrder, type OrderResponse } from "../../services/orderService";
import type { StdioNull } from "node:child_process";

export default function AdminOrders(){

    const [orders,setOrders] = useState<OrderResponse[]>([]);

    const [loading,setLoading] = useState<boolean>(true);
      const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [error, setError] = useState("");


        const fetchOrders = async()=>{
            try{

                setLoading(true);
                setError("");
                const data = await getAllOrders();
                setOrders(data);
            }catch(error){
                console.error("Error fetching orders:",error);
                setError("Failed to load orders. ");
            }finally{
                setActionLoading(null);
            }
        };       
        
        useEffect(() => {
            void fetchOrders();
        },[]);


        const handleShip = async(orderId : number) =>{
            try{
                setActionLoading(orderId);
                setError("");

                const updatedOrder = await shipOrder(orderId);
                setOrders((currentOrders) => 
                currentOrders.map((order) =>
                order.orderId === orderId ? updatedOrder : order)
            );

            }
            catch(error){
               console.error("Failed to ship order:", error);
      setError("Failed to ship the order.");
    } finally {
      setActionLoading(null);
    }
        };


        const handleDeliver = async(orderId:number) =>{
            try{
                setActionLoading(orderId);
                setError("");

                    const updatedOrder = await deliverOrder(orderId);

                    setOrders((currentOrders) => 
                    currentOrders.map((order) => 
                    order.orderId === orderId ? updatedOrder : order
                )
            );
                }
                catch(error){
                    console.error("Failed to deliver order:", error);
                    setError("Failed to deliver order.");
                }finally{
                    setActionLoading(null);
                }
        };


        if(loading){
            return(
                  <main className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-gray-500">Loading orders...</p>
      </main>
            )
        }

        return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-950">
          Admin Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Manage customer orders and update their delivery status.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Total
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payment
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const isActionLoading =
                    actionLoading === order.orderId;

                  return (
                    <tr
                      key={order.orderId}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <span className="font-semibold text-gray-950">
                          #{order.orderId}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        User #{order.userId}
                      </td>

                      <td className="px-6 py-5 font-medium text-gray-950">
                        ₹{order.totalAmount.toFixed(2)}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.paymentStatus === "PAID"
                              ? "bg-green-100 text-green-700"
                              : order.paymentStatus === "FAILED"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            order.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : order.status === "SHIPPED"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "CONFIRMED"
                                  ? "bg-purple-100 text-purple-700"
                                  : order.status === "CANCELLED"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-right">
                        {order.status === "CONFIRMED" &&
                          order.paymentStatus === "PAID" && (
                            <button
                              type="button"
                              disabled={isActionLoading}
                              onClick={() =>
                                handleShip(order.orderId)
                              }
                              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isActionLoading
                                ? "Updating..."
                                : "Ship"}
                            </button>
                          )}

                        {order.status === "SHIPPED" &&
                          order.paymentStatus === "PAID" && (
                            <button
                              type="button"
                              disabled={isActionLoading}
                              onClick={() =>
                                handleDeliver(order.orderId)
                              }
                              className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              {isActionLoading
                                ? "Updating..."
                                : "Deliver"}
                            </button>
                          )}

                        {order.status === "DELIVERED" && (
                          <span className="text-sm font-medium text-green-600">
                            Completed
                          </span>
                        )}

                        {order.status === "CANCELLED" && (
                          <span className="text-sm font-medium text-red-600">
                            Cancelled
                          </span>
                        )}

                        {order.status === "PENDING" &&
                          order.paymentStatus === "PENDING" && (
                            <span className="text-sm text-gray-400">
                              Awaiting payment
                            </span>
                          )}

                        {order.paymentStatus === "FAILED" && (
                          <span className="text-sm text-red-500">
                            Payment failed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );










}