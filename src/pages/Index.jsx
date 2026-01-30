// import { useState } from 'react';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
// import HeroSection from '@/components/home/HeroSection';
// import FeaturedProducts from '@/components/home/FeaturedProducts';
// import CategoryShowcase from '@/components/home/CategoryShowcase';
// import LifestyleShowcase from '@/components/home/LifestyleShowcase';
// import TrustBadges from '@/components/home/TrustBadges';

// const Index = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   const handleUpdateQuantity = (id, quantity) => {
//     if (quantity < 1) {
//       setCartItems(cartItems.filter(item => item.id !== id));
//     } else {
//       setCartItems(cartItems.map(item =>
//         item.id === id ? { ...item, quantity } : item
//       ));
//     }
//   };

//   const handleRemoveItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header
//         cartCount={cartItems.length}
//         onCartOpen={() => setIsCartOpen(true)}
//       />

//       <main>
//         <HeroSection />
//         <TrustBadges />
//         <FeaturedProducts />
//         <LifestyleShowcase />
//         <CategoryShowcase />
//       </main>

//       <Footer />

//       {/* Cart Drawer if needed later */}
//       {/* <CartDrawer
//         isOpen={isCartOpen}
//         onClose={() => setIsCartOpen(false)}
//         items={cartItems}
//         onUpdateQuantity={handleUpdateQuantity}
//         onRemove={handleRemoveItem}
//       /> */}
//     </div>
//   );
// };

// export default Index;
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe2,
  Award,
  X as CloseIcon,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
  Star,
  Quote,
  Workflow,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

// ==================== IMPORTS ====================
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import video from "/src/components/assets/The Belle Booth.mp4";
import main from "/src/components/assets/imagesample.png";
import mobileMain from "/src/components/assets/imagesample.png";

// ==================== CONFIG & DATA ====================

const countries = [
  { name: "Bahamas", code: "bahamas", flag: "🇧🇸", currency: "BSD" },
  { name: "USA", code: "us", flag: "🇺🇸", currency: "USD" },
  { name: "India", code: "in", flag: "🇮🇳", currency: "INR" },
  { name: "Mexico", code: "mx", flag: "🇲🇽", currency: "MXN" },
  { name: "Other", code: "other", flag: "🌍", currency: "USD" },
];

const features = [
  {
    icon: Zap,
    title: "60-Second Transformation",
    description:
      "Origami-inspired design unfolds from compact trolley to professional workspace in under a minute.",
    highlight: "Time is currency",
  },
  {
    icon: Shield,
    title: "Built for Longevity",
    description:
      "Premium HDPE construction with rigorous quality control ensures durability that lasts years.",
    highlight: "Indian manufacturing excellence",
  },
  {
    icon: Globe2,
    title: "Works Anywhere, Everywhere",
    description:
      "Salon, studio, hotel room, client site, public space—Plan A Desk commands respect anywhere.",
    highlight: "Your workspace, your rules",
  },
  {
    icon: Award,
    title: "Professional Presence",
    description:
      "Elevate client perception instantly. Design language that conveys expertise and confidence.",
    highlight: "Professionalism as birthright",
  },
];

const whyChooseFeatures = [
  {
    icon: Zap,
    title: "Seconds to Set Up",
    description:
      "Time is money. With our Plan A Desk products, you can set up your workstation within 30 seconds, which saves your time and money",
    highlight: "Time is currency",
  },
  {
    icon: Shield,
    title: "Stable & Sturdy",
    description:
      "A rigid frame and balanced structure ensure complete stability while conducting your manicure, pedicure & beauty bussiness",
    highlight: "Manufacturing excellence",
  },
  {
    icon: Globe2,
    title: "Works Anywhere",
    description:
      "Personalized for beauty professionals, service personnel across globe, Plan A Desk is perfect for salons, studios, events, and on-location services.",
    highlight: "Your workspace, your rules",
  },
  {
    icon: Award,
    title: "Elegant looks",
    description:
      "Brings style and elegance to your busniess by stylish surfacing and attractive colors",
    highlight: "First impressions matter",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Compact & Carry",
    description:
      "Rolls like premium luggage with ergonomic handle and smooth castor wheels.",
    icon: Workflow,
  },
  {
    number: "02",
    title: "Unfold & Setup",
    description:
      "A compact design that unfolds effortlessly into a complete professional workspace.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Work with Confidence",
    description:
      "Stable, ergonomic surface commands client respect and boosts productivity.",
    icon: Target,
  },
  {
    number: "04",
    title: "Pack & Move",
    description:
      "Compact back to trolley form in seconds. Ready for your next location.",
    icon: TrendingUp,
  },
];

const testimonials = [
  {
    quote:
      "PLANADESK has completely transformed my mobile beauty business. Setup is instant, and my clients are always impressed by the professional presentation",
    author: "Priya S.",
    role: "Beauty Technician",
    location: "Mumbai",
    rating: 5,
  },
  {
    quote:
      "The durability and portability are unmatched. I can provide the same quality of care at home visits as I do in the clinic. Absolute game-changer.",
    author: "Michael Thompson",
    role: "Field Service Technician",
    location: "Delhi",
    rating: 5,
  },
  {
    quote:
      "I used to carry multiple bags and waste time setting up. Now I arrive, pop it open, and I'm ready to work in 30 seconds. Worth every penny",
    author: "Aisha M.",
    role: "Professional Makeup Artist",
    location: "Bangalore",
    rating: 5,
  },
  {
    quote:
      "My clients love how organized and professional my setup looks. PLANADESK has elevated my entire brand image and made my work so much easier.",
    author: "Emily Rodriguez",
    role: "Nail Artist",
    location: "Bangalore",
    rating: 4,
  },
];

const footerLinks = {
  Products: [
    "PLANADESK Lite",
    "PLANADESK Pro",
    "PLANADESK Ultra",
    "Accessories",
    "Bundles",
  ],
  Solutions: ["Beauty & Spa", "Healthcare", "Field Tech", "Education", "Enterprise"],
  Company: ["About Us", "Careers", "Press", "Partners", "Sustainability"],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

const videos = [video];

// ==================== MAIN COMPONENT ====================

const PlanADeskHomepage = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isHeroVideoLoaded, setHeroVideoLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalOpen]);

  const nextVideo = () => setCurrent((prev) => (prev + 1) % videos.length);
  const prevVideo = () => setCurrent((prev) => (prev - 1 + videos.length) % videos.length);

  const handleCountrySelect = (code) => {
    setModalOpen(false);
    navigate(`/${code}`);
  };

  // ==================== RENDER ====================

  return (
    <div className="bg-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
        
        :root {
          --font-heading: 'Montserrat', sans-serif;
          --font-body: 'Roboto', sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        body, p, span, div {
          font-family: var(--font-body);
        }
        
        /* Premium Gucci-inspired styling */
        .elegant-text {
          color: #000000;
          font-weight: 400;
          letter-spacing: 0.5px;
        }
        
        .luxury-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #000000, transparent);
          opacity: 0.15;
        }
        
        .premium-badge {
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #666666;
        }

        .testimonial-card {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .testimonial-card:hover {
          transform: translateY(-8px);
        }
      `}</style>

      <Header />

      {/* ═════ HERO SECTION (VIDEO ONLY) ═════ */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden bg-white ">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setHeroVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000 ${
              isHeroVideoLoaded ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Fallback gradient while loading */}
          {!isHeroVideoLoaded && (
            <div className="absolute inset-0 bg-white" />
          )}
        </div>

        {/* Elegant Overlay - Subtle */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-white/40" />

        {/* Book Now Floating Button (Bottom Right) - Premium Styling */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-30">
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            whileHover={{ scale: 1.08, y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setModalOpen(true)}
            className="group relative px-10 py-4 font-semibold transition-all duration-500"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              backgroundColor: "#000000",
              border: "2px solid #000000",
              color: "#ffffff",
            }}
          >
            Book Now
          </motion.button>
        </div>
      </section>

      {/* ═════ COUNTRY SELECTOR MODAL ═════ */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 280, damping: 25 }}
              className="bg-white rounded-none shadow-2xl w-full max-w-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
                <h2 className="text-2xl font-bold text-[#D84315]" style={{ fontFamily: "var(--font-heading)" }}>
                  Select Your Country
                </h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-black/5 transition-colors"
                >
                  <CloseIcon className="w-6 h-6 text-black" />
                </button>
              </div>

              {/* Country List */}
              <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
                {countries.map((country, index) => (
                  <motion.button
                    key={country.code}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.03)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCountrySelect(country.code)}
                    className="w-full flex items-center justify-between px-6 py-4 border border-black/10 hover:border-black/30 transition-all duration-300 text-left"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      <span className="text-lg">{country.flag}</span>
                      <span className="font-semibold text-black" style={{ fontFamily: "var(--font-body)" }}>
                        {country.name}
                      </span>
                    </div>

                    {/* Right */}
                    <span className="text-sm font-medium text-black/60" style={{ fontFamily: "var(--font-body)" }}>
                      {country.currency}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════ FEATURED PRODUCTS SECTION ═════ */}
      <FeaturedProducts />

      {/* ═════ PREMIUM FEATURE SHOWCASE ═════ */}
      <section className="relative py-32 lg:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 lg:gap-32 items-center">

            {/* ================= LEFT CONTENT ================= */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="flex flex-col justify-center space-y-12"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-3">
                <div className="luxury-divider" style={{ width: "24px" }} />
                <span className="premium-badge">Premium Collection</span>
              </div>

              {/* Heading */}
              <div className="space-y-6">
                <h2
                  className="text-6xl lg:text-7xl leading-none font-bold text-[#D84315]"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  A smart mobile
                  <br />
                  work station
                  <br />
                  <span className="block text-black">for modern moving world</span>
                </h2>

                <div className="luxury-divider" style={{ width: "80px", height: "2px", marginTop: "1.5rem" }} />

                <p className="text-lg lg:text-xl text-black max-w-2xl leading-relaxed elegant-text" style={{ fontFamily: "var(--font-body)" }}>
                  Whether you are working from home, your own office, salon, moving to clients location, public places, running a beauty session in a hotel room, or conducting a demo in a shared lounge, Plan A Desk gives you a professional workspace without demanding a dedicated room and office/salon furniture.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl pt-4">
                {[
                  {
                    icon: "⚡",
                    title: "Second Setup",
                    desc: "Set up your work table wherever you want within 30 seconds",
                  },
                  {
                    icon: "🎯",
                    title: "Optimised Drawers",
                    desc: "hold your beauty kit, tools, equipment and more",
                  },
                  {
                    icon: "💼",
                    title: "Compact Design",
                    desc: "profession in style",
                  },
                  {
                    icon: "🔒",
                    title: "Built to Last",
                    desc: "1-year warranty",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="flex gap-4 p-5 bg-white border border-black/10 hover:border-black/25 transition-all duration-300"
                  >
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>

                    <div>
                      <p className="font-semibold text-black text-sm" style={{ fontFamily: "var(--font-body)" }}>
                        {item.title}
                      </p>
                      <p className="text-xs text-black/60 mt-2 leading-relaxed" style={{ fontFamily: "var(--font-body)" }}>
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setModalOpen(true)}
                className="w-full max-w-md py-5 bg-black text-white font-semibold rounded-none shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 transition-all duration-300 group"
                style={{
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.05em",
                }}
              >
                Explore Products
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </motion.button>
            </motion.div>

            {/* ================= RIGHT VIDEO ================= */}
            <motion.div
              ref={videoContainerRef}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative flex justify-center"
            >
              <div className="relative w-full max-w-md aspect-square rounded-none overflow-hidden shadow-2xl border border-black/10 bg-black">
                <video
                  key={current}
                  src={videos[current]}
                  autoPlay
                  loop
                  muted
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

                {/* Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevVideo}
                    className="w-12 h-12 bg-white/20 backdrop-blur border border-white/40 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextVideo}
                    className="w-12 h-12 bg-white/20 backdrop-blur border border-white/40 rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {videos.map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`rounded-full transition-all ${
                        current === index
                          ? "w-8 h-2 bg-white"
                          : "w-2 h-2 bg-white/50 hover:bg-white/70"
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═════ PROCESS SECTION ═════ */}
      <section className="py-1 lg:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">
                Simple Process
              </span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </motion.div>

            {/* Heading - Montserrat Bold */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-6xl lg:text-7xl leading-none font-bold text-black mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              How Plan A Desk
              <br />
              <span className="block">Works</span>
            </motion.h2>

            {/* Divider */}
            <div className="w-20 h-1 bg-[#D84315] mx-auto mb-8" />

            {/* Description - Roboto */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl mx-auto text-lg lg:text-xl text-black/70 leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
              }}
            >
              Four simple steps to transform your mobile workspace from dream to reality.
            </motion.p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative"
                >
                  {/* Connector Line (Desktop Only) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 left-full w-full h-px bg-gradient-to-r from-black/20 to-transparent" />
                  )}

                  {/* Card */}
                  <div className="relative h-full bg-white border border-black/10 rounded-none p-8 hover:border-black/25 transition-all duration-300 shadow-sm hover:shadow-md">

                    {/* Step Number Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                      className="absolute -top-5 left-8 px-4 py-2 rounded-none bg-[#D84315] text-white text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.number}
                    </motion.div>

                    {/* Icon Container */}
                    <div className="w-14 h-14 rounded-none bg-black/5 border border-black/10 flex items-center justify-center mb-8 mt-4 hover:bg-black/8 transition-all">
                      <Icon className="w-7 h-7 text-black" strokeWidth={1.5} />
                    </div>

                    {/* Title - Montserrat */}
                    <h3
                      className="text-xl font-bold text-black mb-4"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Description - Roboto */}
                    <p
                      className="text-base text-black/60 leading-relaxed"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 400,
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 px-12 py-5 bg-black text-white font-semibold rounded-none shadow-lg hover:shadow-2xl transition-all duration-300 group"
              style={{
                fontFamily: "var(--font-body)",
                letterSpacing: "0.05em",
              }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ═════ PREMIUM FEATURES GRID ═════ */}
      <section className="py-1 lg:py-40 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-24"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">
                Why Choose Us
              </span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </motion.div>

            {/* Heading - Montserrat Bold */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-6xl lg:text-7xl leading-none font-bold text-black mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Engineered for
              <br />
              <span className="block">Excellence</span>
            </motion.h2>

            {/* Divider */}
            <div className="w-20 h-1 bg-[#D84315] mx-auto mb-8" />

            {/* Description - Roboto */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg lg:text-xl text-black/70 leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
              }}
            >
              Every design choice serves a purpose. Every feature solves a real
              challenge faced by mobile professionals.
            </motion.p>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="h-full bg-white border border-black/10 rounded-none p-8 hover:border-black/25 hover:shadow-md transition-all duration-300">

                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-black rounded-none flex items-center justify-center mb-8 hover:bg-[#D84315] transition-colors">
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Title - Montserrat */}
                    <h3
                      className="text-xl font-bold text-black mb-4"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 700,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {feature.title}
                    </h3>

                    {/* Description - Roboto */}
                    <p
                      className="text-base text-black/60 leading-relaxed mb-6"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 400,
                      }}
                    >
                      {feature.description}
                    </p>

                    {/* Highlight - Premium Badge Style */}
                    <div className="luxury-divider" style={{ width: "40px", marginBottom: "12px" }} />

                    <p
                      className="text-sm font-semibold text-black"
                      style={{
                        fontFamily: "var(--font-heading)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {feature.highlight}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═════ TESTIMONIALS SECTION ═════ */}
      <section className="relative py-32 lg:py-48 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* ═════ SECTION HEADER ═════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24 max-w-3xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="luxury-divider" style={{ width: "24px" }} />
              <span className="premium-badge">
                Client Stories
              </span>
              <div className="luxury-divider" style={{ width: "24px" }} />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl leading-none font-bold text-black mb-8"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Trusted by
              <br />
              <span className="block">Professionals Worldwide</span>
            </motion.h2>

            {/* Divider */}
            <div className="w-20 h-1 bg-[#D84315] mx-auto mb-8" />

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-lg lg:text-xl text-black/70 leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
              }}
            >
              Real stories from mobile professionals who've transformed their workspace
              and elevated their professional presence.
            </motion.p>
          </motion.div>

          {/* ═════ TESTIMONIALS GRID ═════ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="testimonial-card h-full"
              >
                <div className="h-full bg-white border border-black/10 rounded-none p-8 hover:border-black/25 hover:shadow-lg flex flex-col">

                  {/* Quote Icon */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.6 }}
                  >
                    <Quote className="w-8 h-8 text-black/15 mb-6" />
                  </motion.div>

                  {/* Stars */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.15, duration: 0.6 }}
                    className="flex gap-1 mb-6"
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-black fill-black"
                      />
                    ))}
                  </motion.div>

                  {/* Quote Text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.6 }}
                    className="text-sm text-black/70 leading-relaxed mb-8 flex-grow"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    "{testimonial.quote}"
                  </motion.p>

                  {/* Divider */}
                  <div className="h-px w-full bg-black/10 mb-6" />

                  {/* Author */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.25, duration: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-none bg-black/8 flex items-center justify-center flex-shrink-0">
                      <span
                        className="font-bold text-black text-sm"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {testimonial.author[0]}
                      </span>
                    </div>

                    {/* Author Info */}
                    <div>
                      <p
                        className="font-semibold text-black text-sm"
                        style={{ fontFamily: "var(--font-heading)" }}
                      >
                        {testimonial.author}
                      </p>
                      <p
                        className="text-xs text-black/60"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {testimonial.role} · {testimonial.location}
                      </p>
                    </div>
                  </motion.div>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════ PREMIUM CTA SECTION ═════ */}
      <section className="py-40 lg:py-48 bg-white relative overflow-hidden">
        {/* Minimal decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-black/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/2 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <h2
              className="text-6xl md:text-7xl font-bold text-black mb-8 leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Ready to Transform
              <br />
              <span className="block">Your Mobile Workspace?</span>
            </h2>

            <div className="w-20 h-1 bg-[#D84315] mx-auto mb-8" />

            <p className="text-lg lg:text-xl text-black/70 mb-16 max-w-2xl mx-auto" style={{ fontFamily: "var(--font-body)" }}>
              Join hundreds of professionals who chose excellence
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.08, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contactus"
                  className="px-12 py-5 bg-black text-white font-semibold rounded-none text-base hover:shadow-2xl transition-all shadow-lg flex items-center justify-center gap-3 group"
                  style={{
                    fontFamily: "var(--font-body)",
                    letterSpacing: "0.05em",
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Contact Sales
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════ FOOTER ═════ */}
      <footer
        className="bg-black text-white relative overflow-hidden"
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        {/* Decorative Elements (very subtle, monochrome) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-20 left-24 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-24 right-32 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 lg:py-20">
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2
                    className="text-2xl lg:text-3xl tracking-[0.28em] mb-4"
                    style={{
                      fontWeight: 600,
                      letterSpacing: "0.28em",
                      textTransform: "uppercase",
                    }}
                  >
                    PLANADESK
                  </h2>
                  <p
                    className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-md"
                    style={{
                      fontFamily: "Roboto, system-ui, sans-serif",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Revolutionary mobile workstations for modern professionals. Transform any
                    space into your perfect workspace in seconds.
                  </p>
                </div>

                {/* Contact Cards */}
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                    <div className="w-11 h-11 bg-white text-black flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs tracking-[0.18em] uppercase text-gray-300">
                        Call Us
                      </p>
                      <p className="text-sm text-white">+91 9856478978</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                    <div className="w-11 h-11 bg-white text-black flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs tracking-[0.18em] uppercase text-gray-300">
                        Email Us
                      </p>
                      <p className="text-sm text-white">info@planadesk.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-white/5 rounded-sm border border-white/10 hover:bg-white/10 transition-all duration-500">
                    <div className="w-11 h-11 bg-white text-black flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs tracking-[0.18em] uppercase text-gray-300">
                        Visit Us
                      </p>
                      <p className="text-sm text-white">Global Headquarters</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-xs tracking-[0.18em] uppercase text-gray-300">
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-[#D84315] hover:text-black"
                        aria-label={label}
                      >
                        <Icon className="w-4 h-4 text-gray-300 hover:text-black transition-colors duration-500" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Link Columns */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xs tracking-[0.18em] uppercase text-gray-200 pb-2 border-b border-white/10">
                    {category}
                  </h3>
                  <ul className="space-y-2.5">
                    {links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="group flex items-center text-sm text-gray-400 hover:text-[#D84315] transition-all duration-400"
                          style={{ fontFamily: "Roboto, system-ui, sans-serif" }}
                        >
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 mr-2" />
                          <span className="transition-transform duration-400 group-hover:translate-x-1">
                            {link}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Copyright */}
                <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-gray-400">
                  <span>© {new Date().getFullYear()} PLANADESK. All rights reserved.</span>
                  <span className="text-gray-500">•</span>
                  <span className="flex items-center gap-1">
                    <span>Made with</span>
                    <Heart className="w-3.5 h-3.5 text-white" />
                    <span>for professionals</span>
                  </span>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap gap-5 text-xs tracking-[0.14em] uppercase">
                  {["Privacy Policy", "Terms of Service", "Cookie Policy", "Accessibility"].map(
                    (link) => (
                      <a
                        key={link}
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors duration-400"
                      >
                        {link}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-11 h-11 border border-white/30 bg-black/60 hover:bg-white hover:text-black text-white rounded-full flex items-center justify-center transition-all duration-500"
              aria-label="Back to top"
            >
              <ArrowRight className="w-4 h-4 -rotate-90" />
            </button>
          </div>
        </div>

        {/* Fonts import for Montserrat + Roboto */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
        `}</style>
      </footer>
    </div>
  );
};

export default PlanADeskHomepage;
