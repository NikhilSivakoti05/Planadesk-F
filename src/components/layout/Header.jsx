import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CountrySelector from "@/components/common/CountrySelector";
import Logo from "@/components/common/Logo";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();
  
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/bahamas" ||
    location.pathname === "/us" ||
    location.pathname === "/in" ||
    location.pathname === "/mx" ||
    location.pathname === "/other";

  const shouldBeScrolled = isScrolled || !isHomePage;

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        shouldBeScrolled
          ? "bg-white/95 border-gray-200/50 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Logo isScrolled={shouldBeScrolled} />

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  shouldBeScrolled
                    ? "text-gray-700 hover:text-black"
                    : "text-white/90 hover:text-white drop-shadow-lg"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {role === "ADMIN" && (
              <Link to="/admin">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`hidden md:flex h-12 w-12 rounded-full transition-all duration-200 ${
                    shouldBeScrolled
                      ? "text-gray-700 hover:bg-gray-100 hover:text-black hover:scale-105"
                      : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 drop-shadow-lg"
                  }`}
                >
                  <LayoutDashboard className="h-6 w-6" />
                </Button>
              </Link>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={handleAccountClick}
              className={`h-12 w-12 rounded-full transition-all duration-200 ${
                shouldBeScrolled
                  ? "text-gray-700 hover:bg-gray-100 hover:text-black hover:scale-105"
                  : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 drop-shadow-lg"
              }`}
            >
              <User className="h-6 w-6" />
            </Button>

            {localStorage.getItem("loggedIn") === "true" && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={`hidden sm:inline-flex text-sm font-medium px-4 py-2 h-12 rounded-full transition-all duration-200 ${
                  shouldBeScrolled
                    ? "text-gray-700 hover:bg-gray-100 hover:text-black hover:scale-105"
                    : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 drop-shadow-lg"
                }`}
              >
                Logout
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className={`relative h-12 w-12 rounded-full transition-all duration-200 ${
                shouldBeScrolled
                  ? "text-gray-700 hover:bg-gray-100 hover:text-black hover:scale-105"
                  : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 drop-shadow-lg"
              }`}
            >
              <ShoppingBag className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 bg-accent text-xs rounded-full flex items-center justify-center font-semibold text-white shadow-lg">
                  {items.length}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={`lg:hidden h-12 w-12 ml-1 rounded-full transition-all duration-200 ${
                shouldBeScrolled
                  ? "text-gray-700 hover:bg-gray-100 hover:text-black hover:scale-105"
                  : "text-white/90 hover:text-white hover:bg-white/20 hover:scale-105 drop-shadow-lg"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={`lg:hidden border-b ${
              shouldBeScrolled
                ? "bg-white border-gray-200"
                : "bg-black/90 backdrop-blur-xl border-white/10"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm font-medium transition-colors py-2 ${
                    shouldBeScrolled
                      ? "text-gray-700 hover:text-black"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {role === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors py-2 ${
                    shouldBeScrolled
                      ? "text-gray-700 hover:text-black"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="h-5 w-5" /> Admin Dashboard
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
