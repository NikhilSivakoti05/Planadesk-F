import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

import lifestyleHome from '@/assets/lifestyle-home.jpg';
import lifestyleCafe from '@/assets/lifestyle-cafe.jpg';
import lifestyleSalon from '@/assets/lifestyle-salon.jpg';

const categories = [
  {
    id: 1,
    name: 'Home Office',
    description: 'Premium setups for remote work',
    image: lifestyleHome,
    link: '/shop?category=home-office',
  },
  {
    id: 2,
    name: 'On-The-Go',
    description: 'Portable solutions for mobility',
    image: lifestyleCafe,
    link: '/shop?category=portable',
  },
  {
    id: 3,
    name: 'Professional',
    description: 'Beauty & business essentials',
    image: lifestyleSalon,
    link: '/shop?category=professional',
  },
];

const CategoryShowcase = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-medium text-sm uppercase tracking-wider"
          >
            Shop by Category
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold mt-2"
          >
            Explore Collections
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <Link
                to={category.link}
                className="group block relative aspect-[4/5] rounded-3xl overflow-hidden shadow-xl"
              >
                {/* Image with hover scale */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500" />

                {/* Blur effect on hover */}
                <div className="absolute inset-0 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <motion.p 
                    className="text-white/70 text-sm mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {category.description}
                  </motion.p>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-display font-bold text-white">
                      {category.name}
                    </h3>
                    <motion.div 
                      className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:bg-accent group-hover:scale-110 border border-white/20 group-hover:border-accent"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight className="h-5 w-5 text-white" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
