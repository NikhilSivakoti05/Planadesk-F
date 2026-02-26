import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/orders/my`, { withCredentials: true })
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]));
  }, []);

  if (!orders.length)
    return <p className="text-muted-foreground">No orders yet.</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">My Orders</h2>

      <div className="grid gap-6">
        {orders.map(o => (
          <div
            key={o.id}
            className="bg-white rounded-2xl shadow-sm border p-6 space-y-3"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">Order #{o.id}</p>
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[o.status]}`}
              >
                {o.status}
              </span>
            </div>

            <p className="text-sm text-muted-foreground">
              {new Date(o.orderDate).toLocaleString()}
            </p>

            <p className="text-lg font-bold">
              Total: ₹{o.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}