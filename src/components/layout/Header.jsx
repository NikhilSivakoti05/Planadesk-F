import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CountrySelector from "@/components/common/CountrySelector";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const { items } = useCart();

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const handleAccountClick = () => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    if (!loggedIn) navigate("/login");
    else navigate("/dashboard/orders");
  };

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {}

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const navLinks = [
    { label: "Shop", href: "/all-products" },
    { label: "Contact Us", href: "/contactus" },
    { label: "About Us", href: "/aboutus" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <motion.span className="text-2xl font-display font-bold tracking-tight">
              PLANADESK<span className="text-accent">.</span>
            </motion.span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <CountrySelector />

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>

            {role === "ADMIN" && (
              <Link to="/admin">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <LayoutDashboard className="h-5 w-5" />
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="icon" onClick={handleAccountClick}>
              <User className="h-5 w-5" />
            </Button>

            {localStorage.getItem("loggedIn") === "true" && (
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-accent text-xs rounded-full flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div className="lg:hidden bg-background border-b border-border">
            <nav className="px-6 py-6 space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard /> Admin Dashboard
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
