import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import heroWorkstation from '@/assets/hero-workstation.jpg';

const HeroSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y, scale }}
      >
        <img
          src={heroWorkstation}
          alt="Smart mobile workstation for modern professionals"
          className="w-full h-full object-cover opacity-100"
        />

        {/* Lighter gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/40" />
      </motion.div>

      {/* Dark overlay only behind text for contrast */}
      <div className="absolute inset-0 bg-black/25 z-[5]" />

      {/* Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32"
        style={{ opacity: 1 }}   // force always visible
      >
        <div className="max-w-3xl">
          
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold leading-[0.9] mb-8 text-foreground drop-shadow-lg">
            Work
            <br />
            <span className="text-accent drop-shadow-lg">Anywhere.</span>
            <br />
            <span className="text-foreground">Anytime.</span>
          </h1>

          {/* <p className="text-lg md:text-xl text-foreground/90 mb-10 max-w-lg leading-relaxed drop-shadow">
            The premium portable workstation designed for modern professionals. 
            From home offices to hotel rooms, cafés to client meetings—your workspace moves with you.
          </p> */}``

          <div className="flex flex-wrap gap-4">
            <Link to="/shop">
              <Button className="group h-14 px-8 text-base bg-accent text-black hover:bg-accent/90 shadow-xl">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button
              variant="outline"
              className="h-14 px-8 text-base group border-2 border-white text-white bg-black/40 backdrop-blur hover:bg-black/60 shadow-lg"
            >
              <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Watch Video
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-wrap items-center gap-8 text-sm text-foreground/80">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-muted border-2 border-background" />
                  ))}
                </div>
                <span>50K+ professionals</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-accent">★★★★★</span>
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/40 flex items-start justify-center p-2"
        >
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-accent" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
