"use client";

import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function OrdersPage() {
  const router = useRouter();

  //  SAMPLE DATA
  const orders = [
    {
      id: "1001",
      date: "05 Apr 2026, 10:30 AM",
      items: 3,
      total: 850,
      status: "Delivered",
    },
    {
      id: "1002",
      date: "03 Apr 2026, 06:15 PM",
      items: 5,
      total: 1200,
      status: "Delivered",
    },
    {
      id: "1003",
      date: "01 Apr 2026, 02:45 PM",
      items: 2,
      total: 430,
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Your Orders</h1>

          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 underline  rounded-md cursor-pointer hover:text-green-700 text-sm"
          >
            <ArrowLeft className="inline-block mr-1" size={16} />
            Back to Home
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">#{order.id}</td>
                  <td className="p-4 text-gray-500">{order.date}</td>
                  <td className="p-4">{order.items}</td>
                  <td className="p-4 font-medium">₹{order.total}</td>
                  <td
                    className={`p-4 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
