import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import LifestyleShowcase from '@/components/home/LifestyleShowcase';
import TrustBadges from '@/components/home/TrustBadges';

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleUpdateQuantity = (id, quantity) => {
    if (quantity < 1) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartItems.length}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main>
        <HeroSection />
        <TrustBadges />
        <FeaturedProducts />
        <LifestyleShowcase />
        <CategoryShowcase />
      </main>

      <Footer />

      {/* Cart Drawer if needed later */}
      {/* <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      /> */}
    </div>
  );
};

export default Index;
