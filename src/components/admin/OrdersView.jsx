import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;

export default function OrdersView() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/api/orders`, { withCredentials: true })
      .then(res => setOrders(Array.isArray(res.data) ? res.data : []))
      .catch(() => setOrders([]));
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Orders</h2>

      {orders.map(o => (
        <div key={o.id} className="bg-white p-5 rounded shadow">
          <p>User: {o.userEmail}</p>
          <p>
            Address: {o.address?.city}, {o.address?.country}
          </p>
          <p>Total: ₹{o.totalAmount}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
