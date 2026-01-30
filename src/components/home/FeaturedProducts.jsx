import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then(async (res) => {
        const text = await res.text();
        if (!text) {
          throw new Error("Empty response from server");
        }
        return JSON.parse(text);
      })
      .then(data => {
        const mapped = data.map(p => ({
          ...p,
          images: p.imageUrls || [],
          category: p.category || "Product",
          isNew: true
        }));
        setProducts(mapped.slice(0, 4));
      })
      .catch(err => {
        console.error(err);
        setProducts([]);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-black/2 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-20"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="h-px w-8 bg-gradient-to-r from-black to-transparent" />
              <span className="text-xs sm:text-sm font-medium uppercase tracking-widest text-gray-600" style={{ fontFamily: "var(--font-body)", letterSpacing: "0.1em" }}>
                Featured Collection
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight"
              style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}
            >
              Bestselling
              <br />
              <span className="text-gray-800">Workstations</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              to="/all-products"
              className="group inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-black hover:text-gray-700 transition-colors"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Explore All
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          {isLoading ? (
            // Skeleton Loaders
            Array(4).fill(null).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-5 bg-gray-200 rounded mb-2" />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group cursor-pointer h-full"
              >
                <Link to={`/product/${product.id}`} className="block h-full">
                  <div className="relative overflow-hidden rounded-lg sm:rounded-xl h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* New Badge */}
                      {product.isNew && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-3 sm:top-4 left-3 sm:left-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-black text-white text-xs font-medium rounded-full"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          New
                        </motion.div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute inset-x-0 bottom-0 flex gap-2 sm:gap-3 p-3 sm:p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-black text-white font-medium text-xs sm:text-sm rounded-lg hover:bg-gray-800 transition-colors"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          <ShoppingBag className="h-4 w-4" />
                          <span className="hidden sm:inline">Add</span>
                        </button>
                        <button
                          onClick={(e) => e.preventDefault()}
                          className="p-2 sm:p-2.5 bg-white/90 backdrop-blur-sm text-black rounded-lg hover:bg-white transition-colors"
                        >
                          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-medium" style={{ fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}>
                          {product.category}
                        </p>
                        <h3 className="text-sm sm:text-base font-semibold text-black group-hover:text-gray-700 transition-colors leading-tight mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "var(--font-body)" }}>
                        Price varies by country
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600" style={{ fontFamily: "var(--font-body)" }}>No products available</p>
            </div>
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 sm:mt-16 md:mt-20 text-center"
        >
          <Link
            to="/all-products"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            style={{ fontFamily: "var(--font-body)", letterSpacing: "0.05em" }}
          >
            View Full Collection
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
