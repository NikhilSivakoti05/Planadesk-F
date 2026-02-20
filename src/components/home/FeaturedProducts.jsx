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
        if (!text) throw new Error("Empty response");
        return JSON.parse(text);
      })
      .then(data => {
        const mapped = data.map(p => ({
          ...p,
          images: p.imageUrls || [],
          category: p.category || "Product",
          isNew: true,
        }));
        setProducts(mapped.slice(0, 4));
      })
      .catch(() => setProducts([]))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADER (UNCHANGED) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-5xl font-bold text-black">
              Bestselling <br />
              <span className="text-gray-800">Workstations</span>
            </h2>
          </div>

          <Link
            to="/all-products"
            className="inline-flex items-center gap-2 text-black"
          >
            Explore All <ArrowRight />
          </Link>
        </motion.div>

        {/* 🔥 PRODUCTS GRID — ONLY CHANGE IS HERE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {isLoading ? (
            Array(4).fill(null).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
                <div className="h-5 bg-gray-200 rounded mb-2" />
              </div>
            ))
          ) : products.length > 0 ? (
            products.map(product => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="aspect-[3/4] bg-gray-100">
                      <img
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="p-4">
                      <p className="text-xs text-gray-500 uppercase mb-2">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-black mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Price varies by country
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products available
            </p>
          )}
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
