"use client";

import Link from "next/link";
import ordersServices from "@/services/orderServices";
import { IOrder } from "@/types/Types";
import { useEffect, useState } from "react";

const HistoryPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await ordersServices.get();
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="h-min-screen h-screen flex flex-col">
      <main className="p-8 flex-1">
        <div className="flex justify-between mb-5">
          <div className="flex gap-2">
            <p>Dashboard</p>
            <p>/</p>
            <Link href="/dashboard/product" className="font-bold">
              History Order
            </Link>
          </div>
        </div>
        <div>
          {orders.map((order: IOrder) => {
            const dateOrder = new Date(order.OrderDate).toLocaleDateString();
            return (
              <div
                className="flex justify-between mb-5 relative"
                key={order.OrderID}
              >
                <div className="border bg-gray-100 rounded-lg shadow-md p-4 flex items-center space-x-4 w-full relative">
                  {/* <button className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                     onClick={() => (window.location.href = "/history/{order.CartID}")}
                  >
                    Detail
                  </button> */}

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">
                      ORDERPRODUCT00{order.OrderID}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Order Date: {dateOrder}
                    </p>
                    <div className="flex justify-end mt-4">
                      <p className="text-lg font-bold mt-2">
                        Total Amount: {order.TotalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;
