import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext(null);
const API = import.meta.env.VITE_API_BASE_URL;

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  /* =========================
     LOAD CART
     ========================= */
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) {
      setItems([]);
      return;
    }

    const load = async () => {
      try {
        const res = await axios.get(`${API}/api/cart`, {
          withCredentials: true,
        });
        setItems(Array.isArray(res.data?.items) ? res.data.items : []);
      } catch {
        setItems([]);
      }
    };

    load();
  }, []);

  /* =========================
     ADD TO CART
     ========================= */
  const addToCart = async (product, countryData, qty) => {
    if (localStorage.getItem("loggedIn") !== "true") return;

    await axios.post(
      `${API}/api/cart/add`,
      {
        productId: product.id,
        name: product.name,
        country: countryData.countryCode,
        price: countryData.price,
        quantity: qty,
        image: product.imageUrls?.[0],
      },
      { withCredentials: true }
    );

    setItems(prev => {
      const existing = prev.find(
        i =>
          i.productId === product.id &&
          i.country === countryData.countryCode
      );

      if (existing) {
        return prev.map(i =>
          i.productId === product.id && i.country === countryData.countryCode
            ? { ...i, quantity: i.quantity + qty }
            : i
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          country: countryData.countryCode,
          price: countryData.price,
          quantity: qty,
          image: product.imageUrls?.[0],
        },
      ];
    });
  };

  /* =========================
     UPDATE QUANTITY
     ========================= */
  const updateQuantity = async (productId, qty) => {
    if (qty < 1) return;

    await axios.put(
      `${API}/api/cart/update`,
      { productId, quantity: qty },
      { withCredentials: true }
    );

    setItems(prev =>
      prev.map(i =>
        i.productId === productId ? { ...i, quantity: qty } : i
      )
    );
  };

  /* =========================
     REMOVE ITEM
     ========================= */
  const removeItem = async productId => {
    await axios.delete(`${API}/api/cart/remove`, {
      data: { productId },
      withCredentials: true,
    });

    setItems(prev => prev.filter(i => i.productId !== productId));
  };

  /* =========================
     CLEAR CART
     ========================= */
  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
