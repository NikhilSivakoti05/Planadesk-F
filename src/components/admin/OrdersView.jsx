import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

const STATUS_COLORS = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function OrdersView() {
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    axios
      .get(`${API}/api/orders`, { withCredentials: true })
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(
      `${API}/api/orders/${id}/status`,
      null,
      {
        params: { status },
        withCredentials: true,
      }
    );
    loadOrders();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">All Orders</h2>

      <div className="grid gap-6">
        {orders.map(o => (
          <div
            key={o.id}
            className="bg-white rounded-2xl shadow-sm border p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{o.userEmail}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(o.orderDate).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[o.status]}`}
              >
                {o.status}
              </span>
            </div>

            <div className="text-sm text-gray-600">
              📍 {o.address?.city}, {o.address?.country}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">₹{o.totalAmount}</p>

              <select
                value={o.status}
                onChange={(e) => updateStatus(o.id, e.target.value)}
                className="border rounded-xl px-4 py-2 bg-background"
              >
                <option value="PENDING">Pending</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}