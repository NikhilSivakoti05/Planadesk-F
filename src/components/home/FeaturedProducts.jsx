// import { motion } from 'framer-motion';
// import { ArrowRight, Heart, ShoppingBag } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { products } from '@/data/products';

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6 },
//   },
// };

// const FeaturedProducts = () => {
//   return (
//     <section className="section-padding bg-secondary/30">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
//           <div>
//             <motion.span
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-accent font-medium text-sm uppercase tracking-wider"
//             >
//               Featured Collection
//             </motion.span>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-4xl md:text-5xl font-display font-bold mt-2"
//             >
//               Bestsellers
//             </motion.h2>
//           </div>
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2 }}
//           >
//             <Link to="/shop" className="group flex items-center gap-2 text-foreground hover:text-accent transition-colors">
//               View All Products
//               <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </motion.div>
//         </div>

//         {/* Products Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-100px" }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {products.slice(0, 4).map((product) => (
//             <motion.div
//               key={product.id}
//               variants={itemVariants}
//               className="card-premium"
//             >
//               <Link to={`/product/${product.id}`}>
//                 {/* Image */}
//                 <div className="relative aspect-[3/4] overflow-hidden bg-muted">
//                   <img
//                     src={product.images[0]}
//                     alt={product.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                   />
                  
//                   {/* Badges */}
//                   {product.isNew && (
//                     <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
//                       New
//                     </span>
//                   )}

//                   {/* Quick Actions */}
//                   <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
//                     <Button
//                       size="sm"
//                       className="flex-1 bg-background/90 backdrop-blur-sm text-foreground hover:bg-background"
//                       onClick={(e) => e.preventDefault()}
//                     >
//                       <ShoppingBag className="h-4 w-4 mr-2" />
//                       Add to Cart
//                     </Button>
//                     <Button
//                       size="icon"
//                       variant="secondary"
//                       className="bg-background/90 backdrop-blur-sm hover:bg-background"
//                       onClick={(e) => e.preventDefault()}
//                     >
//                       <Heart className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 {/* Info */}
//                 <div className="p-5">
//                   <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
//                     {product.category}
//                   </p>
//                   <h3 className="font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
//                     {product.name}
//                   </h3>
//                   <p className="text-lg font-semibold text-foreground">
//                     ${product.price}
//                   </p>
//                 </div>
//               </Link>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;


// AFTER CONNECTING IT TO BACKEND
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

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
        category: "Product",
        isNew: true
      }));
      setProducts(mapped);
    })
    .catch(err => {
      
      setProducts([]); // prevent crash
    });
}, []);


  return (
    <section className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-accent font-medium text-sm uppercase tracking-wider">
              Featured Collection
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-display font-bold mt-2">
              Bestsellers
            </motion.h2>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link to="/all-products" className="group flex items-center gap-2 text-foreground hover:text-accent">
              View All Products <ArrowRight className="h-4 w-4 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div variants={containerVariants} initial="visible" animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(product => (
            <motion.div key={product.id} variants={itemVariants} initial="visible" animate="visible"
              className="card-premium">
              <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[3/4] overflow-hidden bg-muted group">
                  <img src={product.images?.[0] || "/placeholder.png"} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110" />
                  <span className="absolute top-4 left-4 bg-accent text-xs px-3 py-1 rounded-full">New</span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h3>{product.name}</h3>
                  <p className="text-sm text-muted-foreground">Price depends on country</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
