import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useCountry } from '@/context/CountryContext';
import { Button } from '@/components/ui/button';

const CountrySelectorModal = ({ isOpen, onClose, onSelect }) => {
  const { countries, selectedCountry, setSelectedCountry } = useCountry();

  const handleSelect = (country) => {
    setSelectedCountry(country);
    if (onSelect) onSelect(country);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 text-center border-b border-border bg-gradient-to-b from-muted/50 to-transparent">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-accent" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Select Your Region
            </h2>
            <p className="text-muted-foreground">
              Choose your country to see local pricing and availability
            </p>
          </div>

          {/* Countries Grid */}
          <div className="p-6 max-h-80 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              {countries.map((country) => (
                <motion.button
                  key={country.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(country)}
                  className={`relative flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
                    selectedCountry?.code === country.code
                      ? 'border-accent bg-accent/10 shadow-lg'
                      : 'border-border hover:border-accent/50 hover:bg-muted/50'
                  }`}
                >
                  <span className="text-3xl">{country.flag}</span>
                  <div className="text-left flex-1">
                    <p className="font-medium text-foreground text-sm">{country.name}</p>
                    <p className="text-xs text-muted-foreground">{country.symbol} {country.currency}</p>
                  </div>
                  {selectedCountry?.code === country.code && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                      <Check className="h-3 w-3 text-accent-foreground" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/30">
            <p className="text-xs text-center text-muted-foreground">
              Prices will be displayed in your selected currency. Final charges may vary based on exchange rates.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CountrySelectorModal;
