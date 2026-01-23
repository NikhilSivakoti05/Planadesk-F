import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Home, Coffee, Sparkles, Users, Building2, Briefcase } from 'lucide-react';

import lifestyleHome from '@/assets/lifestyle-home.jpg';
import lifestyleCafe from '@/assets/lifestyle-cafe.jpg';
import lifestyleSalon from '@/assets/lifestyle-salon.jpg';
import lifestyleLounge from '@/assets/lifestyle-lounge.jpg';
import lifestyleClient from '@/assets/lifestyle-client.jpg';

const lifestyleScenes = [
  {
    id: 1,
    title: 'Work From Home',
    description: 'Create your perfect productive space in the comfort of your home',
    image: lifestyleHome,
    icon: Home,
  },
  {
    id: 2,
    title: 'Café & Co-Working',
    description: 'Stay productive anywhere with our portable workstation',
    image: lifestyleCafe,
    icon: Coffee,
  },
  {
    id: 3,
    title: 'Beauty Sessions',
    description: 'Professional makeup setups for hotel rooms and client locations',
    image: lifestyleSalon,
    icon: Sparkles,
  },
  {
    id: 4,
    title: 'Business Lounges',
    description: 'Conduct demos and presentations in shared spaces',
    image: lifestyleLounge,
    icon: Building2,
  },
  {
    id: 5,
    title: 'Client Locations',
    description: 'Bring your professional setup directly to your clients',
    image: lifestyleClient,
    icon: Briefcase,
  },
];

const LifestyleShowcase = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 overflow-hidden">
      {/* Background with parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            For The Modern Professional
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Your Workspace,
            <br />
            <span className="text-accent">Anywhere</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed for professionals who move. From home offices to hotel rooms, 
            cafés to client locations—stay productive wherever life takes you.
          </p>
        </motion.div>

        {/* Lifestyle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestyleScenes.map((scene, index) => {
            const Icon = scene.icon;
            return (
              <motion.div
                key={scene.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group relative rounded-3xl overflow-hidden ${
                  index === 0 ? 'md:col-span-2 md:row-span-2 aspect-square md:aspect-auto' : 'aspect-[4/5]'
                }`}
              >
                {/* Image with parallax effect */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={scene.image}
                    alt={scene.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 transition-all duration-500" />

                {/* Blur overlay on hover */}
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="mb-4"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-accent/80 group-hover:border-accent transition-all duration-300">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </motion.div>

                  {/* Text */}
                  <h3 className={`font-display font-bold text-white mb-2 ${
                    index === 0 ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                  }`}>
                    {scene.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base max-w-sm">
                    {scene.description}
                  </p>

                  {/* Arrow indicator */}
                  <motion.div
                    className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowRight className="h-5 w-5 text-white" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Join thousands of professionals who've upgraded their mobile workspace
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-accent">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-accent">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="h-12 w-px bg-border hidden md:block" />
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-accent">30+</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleShowcase;
