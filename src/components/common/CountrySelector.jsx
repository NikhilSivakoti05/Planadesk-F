import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

const countries = [
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳' },
  { code: 'BS', name: 'Bahamas', currency: 'BSD', flag: '🇧🇸' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', flag: '🇲🇽' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
];

const CountrySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    // In a real app, this would update context/state for the whole app
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{selectedCountry.flag}</span>
        <span className="hidden md:inline text-sm">{selectedCountry.currency}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute right-0 top-full mt-2 z-50 w-64 bg-card rounded-xl shadow-xl border border-border overflow-hidden"
            >
              <div className="p-2 border-b border-border">
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Select your region</span>
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto py-2">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => handleSelect(country)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                      selectedCountry.code === country.code ? 'bg-muted' : ''
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{country.name}</p>
                      <p className="text-xs text-muted-foreground">{country.currency}</p>
                    </div>
                    {selectedCountry.code === country.code && (
                      <div className="h-2 w-2 rounded-full bg-accent" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CountrySelector;
