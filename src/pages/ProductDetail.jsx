// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Heart, ShoppingBag, Minus, Plus, Star, Shield, Truck, RefreshCw } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
// import CountrySelectorModal from '@/components/common/CountrySelectorModal';
// import { useCountry } from '@/context/CountryContext';
// import { products } from '@/data/products';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const { selectedCountry, formatPrice, isCountrySelected } = useCountry();
//   const [showCountryModal, setShowCountryModal] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);
//   const [isWishlisted, setIsWishlisted] = useState(false);

//   const product = products.find(p => p.id === parseInt(id));

//   useEffect(() => {
//     if (!isCountrySelected) {
//       setShowCountryModal(true);
//     }
//   }, [isCountrySelected]);

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-3xl font-display font-bold mb-4">Product Not Found</h1>
//           <Link to="/" className="text-accent hover:underline">Return to Home</Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
      
//       <CountrySelectorModal 
//         isOpen={showCountryModal} 
//         onClose={() => setShowCountryModal(false)} 
//       />

//       <main className="pt-20 sm:pt-28 pb-12 sm:pb-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Breadcrumb */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-8"
//           >
//             <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
//               <ArrowLeft className="h-4 w-4" />
//               Back to Shop
//             </Link>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
//             {/* Image Gallery */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="sticky top-28">
//                 {/* Main Image */}
//                 <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted mb-4 shadow-2xl">
//                   <motion.img
//                     key={selectedImage}
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ duration: 0.3 }}
//                     src={product.images[selectedImage]}
//                     alt={product.name}
//                     className="w-full h-full object-cover"
//                   />
//                   {product.isNew && (
//                     <span className="absolute top-6 left-6 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full shadow-lg">
//                       New Arrival
//                     </span>
//                   )}
//                 </div>

//                 {/* Thumbnails */}
//                 <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:overflow-visible">
//                   {product.images.map((image, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedImage(index)}
//                       className={`relative flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 rounded-xl overflow-hidden transition-all duration-200 ${
//                         selectedImage === index 
//                           ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' 
//                           : 'opacity-60 hover:opacity-100'
//                       }`}
//                     >
//                       <img
//                         src={image}
//                         alt={`${product.name} ${index + 1}`}
//                         className="w-full h-full object-cover"
//                       />
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </motion.div>

//             {/* Product Info */}
//             <motion.div
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="space-y-8"
//             >
//               {/* Header */}
//               <div>
//                 <p className="text-accent font-medium text-sm uppercase tracking-wider mb-2">
//                   {product.category}
//                 </p>
//                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
//                   {product.name}
//                 </h1>
//                 <div className="flex items-center gap-4">
//                   <div className="flex items-center gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className="h-5 w-5 fill-accent text-accent" />
//                     ))}
//                   </div>
//                   <span className="text-muted-foreground">128 Reviews</span>
//                 </div>
//               </div>

//               {/* Country & Price */}
//               <div className="p-6 rounded-2xl bg-muted/50 border border-border">
//                 <div className="flex items-center justify-between mb-4">
//                   <span className="text-muted-foreground">Your Region</span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => setShowCountryModal(true)}
//                     className="text-accent hover:text-accent/80"
//                   >
//                     {selectedCountry ? (
//                       <span className="flex items-center gap-2">
//                         <span className="text-xl">{selectedCountry.flag}</span>
//                         {selectedCountry.name}
//                       </span>
//                     ) : (
//                       'Select Country'
//                     )}
//                   </Button>
//                 </div>
//                 <div className="text-4xl font-display font-bold text-foreground">
//                   {formatPrice(product.price)}
//                 </div>
//                 {selectedCountry && selectedCountry.code !== 'US' && (
//                   <p className="text-sm text-muted-foreground mt-2">
//                     Original price: ${product.price} USD
//                   </p>
//                 )}
//               </div>

//               {/* Description */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-3">Description</h3>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>

//               {/* Features */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-3">Features</h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {product.features.map((feature, index) => (
//                     <div key={index} className="flex items-center gap-2 text-muted-foreground">
//                       <div className="w-1.5 h-1.5 rounded-full bg-accent" />
//                       {feature}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Specifications */}
//               <div>
//                 <h3 className="text-lg font-semibold mb-3">Specifications</h3>
//                 <div className="space-y-2">
//                   {Object.entries(product.specifications).map(([key, value]) => (
//                     <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
//                       <span className="text-muted-foreground">{key}</span>
//                       <span className="font-medium">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Quantity & Add to Cart */}
//               <div className="space-y-4">
//                 <div className="flex items-center gap-4">
//                   <span className="text-muted-foreground">Quantity</span>
//                   <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                       className="h-10 w-10 rounded-lg"
//                     >
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span className="w-12 text-center font-semibold">{quantity}</span>
//                     <Button
//                       variant="ghost"
//                       size="icon"
//                       onClick={() => setQuantity(quantity + 1)}
//                       className="h-10 w-10 rounded-lg"
//                     >
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <Button
//                     size="lg"
//                     className="flex-1 h-14 text-lg font-semibold rounded-xl bg-accent hover:bg-accent/90 text-accent-foreground"
//                   >
//                     <ShoppingBag className="mr-2 h-5 w-5" />
//                     Add to Cart
//                   </Button>
//                   <Button
//                     size="lg"
//                     variant="outline"
//                     className="h-14 w-14 rounded-xl"
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                   >
//                     <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-accent text-accent' : ''}`} />
//                   </Button>
//                 </div>
//               </div>

//               {/* Trust Badges */}
//               <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-border">
//                 <div className="text-center">
//                   <div className="mx-auto w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-2">
//                     <Truck className="h-5 w-5 text-accent" />
//                   </div>
//                   <p className="text-sm font-medium">Free Shipping</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="mx-auto w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-2">
//                     <RefreshCw className="h-5 w-5 text-accent" />
//                   </div>
//                   <p className="text-sm font-medium">30-Day Returns</p>
//                 </div>
//                 <div className="text-center">
//                   <div className="mx-auto w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-2">
//                     <Shield className="h-5 w-5 text-accent" />
//                   </div>
//                   <p className="text-sm font-medium">Warranty</p>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default ProductDetail;



import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Minus,
  Plus,
  Shield,
  Truck,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const currencyMap = {
  IN: "₹", US: "$", AE: "د.إ", UK: "£", EU: "€", CA: "$", AU: "$", NZ: "$",
  JP: "¥", CN: "¥", KR: "₩", SG: "$", MY: "RM", TH: "฿", ID: "Rp", PH: "₱",
  VN: "₫", PK: "₨", BD: "৳", LK: "Rs", NP: "Rs", MM: "Ks", KH: "៛", LA: "₭",
  SA: "﷼", QA: "﷼", KW: "د.ك", OM: "﷼", BH: ".د.ب", JO: "د.ا", IL: "₪",
  TR: "₺", IR: "﷼", IQ: "ع.د", SY: "£", YE: "﷼",
  RU: "₽", UA: "₴", PL: "zł", CZ: "Kč", HU: "Ft", RO: "lei", BG: "лв",
  SE: "kr", NO: "kr", DK: "kr", IS: "kr", CH: "CHF",
  DE: "€", FR: "€", IT: "€", ES: "€", PT: "€", NL: "€", BE: "€", AT: "€",
  IE: "€", GR: "€", FI: "€", EE: "€", LV: "€", LT: "€", SK: "€", SI: "€",
  HR: "€",
  BR: "R$", AR: "$", CL: "$", CO: "$", PE: "S/", MX: "$", VE: "Bs",
  BO: "Bs", PY: "₲", UY: "$U",
  ZA: "R", NG: "₦", GH: "₵", KE: "KSh", UG: "USh", TZ: "TSh",
  EG: "£", MA: "د.م.", DZ: "دج", TN: "د.ت", LY: "ل.د",
  ET: "Br", SD: "£", ZM: "ZK", ZW: "$",
  CM: "FCFA", SN: "CFA", CI: "CFA", BF: "CFA", ML: "CFA", NE: "CFA",
  RW: "FRw", BI: "FBu", DJ: "Fdj",
  TW: "NT$", HK: "$", MO: "P", MN: "₮",
  KZ: "₸", KG: "сом", TJ: "ЅМ", TM: "m"
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showCountryModal, setShowCountryModal] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const loggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(p =>
        setProduct({
          ...p,
          images: p.imageUrls || [],
        })
      );

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/countries/active`)
      .then(r => r.json())
      .then(d => setCountries(d || []));
  }, [id]);

  useEffect(() => {
    setShowCountryModal(true);
    setSelectedCountry("");
    setQuantity(1);
  }, [id]);

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const countryData = product.countryPrices?.find(
    c => c.countryCode === selectedCountry
  );

  const maxStock = product.globalStock || 0;
  const isAvailable = countryData && maxStock > 0;

  /* ===============================
     ADD TO CART HANDLER
     =============================== */
  const handleAddToCart = () => {
    if (!loggedIn) {
      navigate("/login");
      return;
    }

    if (!isAvailable || !countryData) return;

    addToCart(
      {
        ...product,
        id: product._id || product.id, // ✅ normalize MongoDB id
      },
      countryData,
      quantity
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {showCountryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-card p-8 rounded-2xl w-full max-w-3xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Select Your Region</h2>
              <p className="text-muted-foreground">
                Choose your country to see local pricing and availability
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto">
              {countries.map(c => (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCountry(c.countryCode);
                    setShowCountryModal(false);
                  }}
                  className="border rounded-2xl p-4 text-left hover:border-accent transition"
                >
                  <div className="text-xl font-bold">{c.countryCode}</div>
                  <div className="font-medium">{c.countryName}</div>
                  <div className="text-sm text-muted-foreground">
                    {currencyMap[c.countryCode] || ""} Currency
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <Link
          to="/"
          className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-muted mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{product.name}</h1>

            {selectedCountry && countryData && isAvailable && (
              <div className="text-4xl font-bold">
                {currencyMap[selectedCountry] || ""}
                {countryData.price}
              </div>
            )}

            <div className="flex items-center gap-4">
              <span>Quantity</span>
              <div className="flex items-center gap-3 bg-muted rounded-xl p-1">
                <Button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >
                  <Minus />
                </Button>

                <span>{quantity}</span>

                <Button
                  onClick={() =>
                    setQuantity(q => Math.min(maxStock, q + 1))
                  }
                  disabled={!isAvailable || quantity >= maxStock}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                disabled={!isAvailable || !loggedIn}
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-accent text-accent-foreground"
              >
                <ShoppingBag className="mr-2" />
                {!loggedIn
                  ? "Login to Add"
                  : isAvailable
                  ? "Add to Cart"
                  : "Not Available"}
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={isWishlisted ? "fill-accent text-accent" : ""}
                />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="mx-auto text-accent" /> Free Shipping
              </div>
              <div className="text-center">
                <RefreshCw className="mx-auto text-accent" /> 30-Day Returns
              </div>
              <div className="text-center">
                <Shield className="mx-auto text-accent" /> Warranty
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
