// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "@/context/CartContext";

// const API = import.meta.env.VITE_API_BASE_URL;

// export default function Checkout() {
//   const [address, setAddress] = useState({});
//   const { clearCart } = useCart();
//   const navigate = useNavigate();

//   const submit = async () => {
//     await axios.post(
//       `${API}/api/orders/checkout`,
//       { address },
//       { withCredentials: true }
//     );

//     clearCart();
//     navigate("/dashboard/orders");
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Shipping Address</h2>

//       {["street", "city", "state", "pincode", "country"].map(f => (
//         <input
//           key={f}
//           placeholder={f}
//           className="w-full border p-2 mb-2"
//           onChange={e => setAddress({ ...address, [f]: e.target.value })}
//         />
//       ))}

//       <button
//         onClick={submit}
//         className="w-full bg-black text-white py-2 rounded mt-4"
//       >
//         Place Order
//       </button>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { CreditCard, Truck, ShieldCheck, ChevronRight } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function Checkout() {
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart(); // Assuming cart is available from context
  const navigate = useNavigate();

  const subtotal = cart?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;
  const shipping = 15.00;
  const total = subtotal + shipping;

  const submit = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${API}/api/orders/checkout`,
        { address },
        { withCredentials: true }
      );
      clearCart();
      navigate("/dashboard/orders");
    } catch (error) {
      console.error("Order failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Forms */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Truck className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-800">Shipping Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["street", "city", "state", "pincode", "country"].map((f) => (
                <div key={f} className={f === "street" ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 ml-1">
                    {f}
                  </label>
                  <input
                    placeholder={`Enter your ${f}`}
                    className="w-full border-gray-200 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                    onChange={(e) => setAddress({ ...address, [f]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Aesthetic Payment Module */}
          <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="text-blue-600" size={24} />
              <h2 className="text-2xl font-semibold text-gray-800">Payment Method</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 mb-6">
                <div className="flex-1 border-2 border-black p-4 rounded-xl flex items-center justify-between cursor-pointer">
                  <span className="font-medium">Credit Card</span>
                  <div className="flex gap-1">
                    <div className="w-8 h-5 bg-red-500 rounded-sm" />
                    <div className="w-8 h-5 bg-orange-400 rounded-sm" />
                  </div>
                </div>
                <div className="flex-1 border border-gray-200 p-4 rounded-xl flex items-center justify-between opacity-50 cursor-not-allowed bg-gray-50">
                  <span className="font-medium text-gray-500">PayPal</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-4">
                  <input placeholder="Card Number" className="w-full border border-gray-200 rounded-lg p-3" disabled />
                </div>
                <div className="md:col-span-2">
                  <input placeholder="MM / YY" className="w-full border border-gray-200 rounded-lg p-3" disabled />
                </div>
                <div className="md:col-span-2">
                  <input placeholder="CVC" className="w-full border border-gray-200 rounded-lg p-3" disabled />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h3>
            
            <div className="space-y-4 mb-6 border-b pb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 pt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={submit}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? "Processing..." : "Complete Purchase"}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-sm">
              <ShieldCheck size={16} />
              <span>Secure Encrypted Checkout</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}




