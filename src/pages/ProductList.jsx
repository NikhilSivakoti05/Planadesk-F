import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCountry } from "@/context/CountryContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { selectedCountry, isCountrySelected, formatPrice } = useCountry();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map(p => ({
          ...p,
          images: p.imageUrls || []
        }));
        setProducts(mapped);
      });
  }, []);

  const getCountryData = (product) => {
    if (!selectedCountry) return null;
    return product.countryConfigs?.find(c =>
      c.countryCode?.toLowerCase() === selectedCountry.code?.toLowerCase() ||
      c.countryCode?.toLowerCase() === selectedCountry.name?.toLowerCase()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-display font-bold">All Products</h1>
          <p className="text-muted-foreground mt-2">
            Explore our full collection
          </p>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {products.map(product => {
            const countryData = getCountryData(product);
            const isAvailable = countryData && countryData.availableQuantity > 0;

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6 }}
                className="bg-card rounded-3xl overflow-hidden shadow-md group"
              >
                <Link to={`/product/${product.id}`}>
                  {/* Image */}
                  <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                    <img
                      src={product.images[0] || "/placeholder.png"}
                      alt={product.name}
                      onError={(e) => e.currentTarget.src = "/placeholder.png"}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Availability Badge */}
                    {isCountrySelected && (
                      <span className={`absolute top-4 left-4 px-3 py-1 text-xs rounded-full font-medium
                        ${isAvailable
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-500"
                        }`}>
                        {isAvailable ? "In Stock" : "Not Available"}
                      </span>
                    )}

                    {/* Hover Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <Button
                        size="sm"
                        className="flex-1 bg-background/90 backdrop-blur-sm"
                        onClick={(e) => e.preventDefault()}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        size="icon"
                        variant="secondary"
                        className="bg-background/90 backdrop-blur-sm"
                        onClick={(e) => e.preventDefault()}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-accent transition-colors">
                      {product.name}
                    </h3>

                    {/* Price Logic */}
                    {!isCountrySelected && (
                      <p className="text-sm text-muted-foreground">
                        Select country to see price
                      </p>
                    )}

                    {isCountrySelected && countryData && isAvailable && (
                      <p className="text-lg font-semibold">
                        {formatPrice(countryData.price)}
                      </p>
                    )}

                    {isCountrySelected && (!countryData || !isAvailable) && (
                      <p className="text-sm text-red-500 font-medium">
                        Not available in your country
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductList;
