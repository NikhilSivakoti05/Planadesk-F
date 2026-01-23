import { createContext, useContext, useState } from 'react';

const countries = [
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸', rate: 1 },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳', rate: 83 },
  { code: 'BS', name: 'Bahamas', currency: 'BSD', symbol: 'B$', flag: '🇧🇸', rate: 1 },
  { code: 'MX', name: 'Mexico', currency: 'MXN', symbol: '$', flag: '🇲🇽', rate: 17 },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧', rate: 0.79 },
  { code: 'CA', name: 'Canada', currency: 'CAD', symbol: 'C$', flag: '🇨🇦', rate: 1.36 },
  { code: 'AU', name: 'Australia', currency: 'AUD', symbol: 'A$', flag: '🇦🇺', rate: 1.53 },
  { code: 'DE', name: 'Germany', currency: 'EUR', symbol: '€', flag: '🇩🇪', rate: 0.92 },
];

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const convertPrice = (priceUSD) => {
    if (!selectedCountry) return priceUSD;
    return Math.round(priceUSD * selectedCountry.rate);
  };

  const formatPrice = (priceUSD) => {
    if (!selectedCountry) return `$${priceUSD}`;
    const converted = convertPrice(priceUSD);
    return `${selectedCountry.symbol}${converted.toLocaleString()}`;
  };

  return (
    <CountryContext.Provider value={{
      countries,
      selectedCountry,
      setSelectedCountry,
      convertPrice,
      formatPrice,
      isCountrySelected: !!selectedCountry,
    }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
};

export { countries };
