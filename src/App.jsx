import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/common/ScrollToTop.jsx";
import { CountryProvider } from "./context/CountryContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import Cart from "./components/cart/Cart.jsx";
import Index from "./pages/Index.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import NotFound from "./pages/NotFound.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import ProductList from "./pages/ProductList.jsx";
import AdminRoute from "./components/auth/AdminRoute.jsx";

import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Orders from "./pages/dashboard/Orders.jsx";
import Profile from "./pages/dashboard/Profile.jsx";
import Help from "./pages/dashboard/Help.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import PremiumContactUs from "./pages/Contactus.jsx";
import AboutUs from "./pages/Aboutus.jsx";
import Checkout from "./pages/Checkout.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CountryProvider>
        <CartProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/all-products" element={<ProductList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contactus" element={<PremiumContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/checkout" element={<Checkout/>} />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              >
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path="help" element={<Help />} />
              </Route>

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </CountryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
