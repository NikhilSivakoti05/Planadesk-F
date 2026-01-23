import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/orders/my`, { withCredentials: true })
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]));
  }, []);

  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">My Orders</h2>

      {orders.map(o => (
        <div key={o.id} className="bg-white p-4 rounded shadow">
          <p>Order ID: {o.id}</p>
          <p>Status: {o.status}</p>
          <p>Total: ₹{o.totalAmount}</p>
          <p>{new Date(o.orderDate).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
