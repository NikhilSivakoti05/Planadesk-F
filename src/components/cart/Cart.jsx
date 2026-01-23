import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem } = useCart();

  const total = Array.isArray(items)
    ? items.reduce((s, i) => s + i.price * i.quantity, 0)
    : 0;

  return (
    <>
      <Header />

      <div className="min-h-screen px-6 py-10 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {items.map(item => (
                <div
                  key={item.productId}
                  className="flex items-center bg-white p-4 rounded-lg shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="ml-4 flex-1">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-500">
                      Country: {item.country}
                    </p>
                    <p className="font-semibold mt-1">₹{item.price}</p>

                    <div className="flex items-center mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="p-1 border rounded"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="px-4">{item.quantity}</span>

                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="p-1 border rounded"
                      >
                        <Plus size={16} />
                      </button>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="ml-4 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Total Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between mb-4">
                <span>Total Price</span>
                <span className="font-bold">₹{total.toFixed(2)}</span>
              </div>

              <a
                href="/checkout"
                className="block text-center bg-black text-white py-3 rounded"
              >
                Proceed to Checkout
              </a>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
