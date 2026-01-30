import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer
      className="bg-black text-white relative overflow-hidden"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-20 left-24 w-40 h-40 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-24 right-32 w-48 h-48 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl tracking-[0.28em] mb-3 sm:mb-4 uppercase font-semibold">
                  PLANADESK
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed max-w-md font-roboto">
                  Revolutionary mobile workstations for modern professionals. Transform any
                  space into your perfect workspace in seconds.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white text-black flex flex-shrink-0 items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase text-gray-300">Call Us</p>
                    <p className="text-xs sm:text-sm text-white truncate">+91 9856478978</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white text-black flex flex-shrink-0 items-center justify-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase text-gray-300">Email Us</p>
                    <p className="text-xs sm:text-sm text-white truncate">info@planadesk.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 bg-white text-black flex flex-shrink-0 items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase text-gray-300">Visit Us</p>
                    <p className="text-xs sm:text-sm text-white">Global Headquarters</p>
                  </div>
                </div>
              </div>

              {/* Social Media (external links use <a>) */}
              <div className="space-y-3 sm:space-y-4 pt-2">
                <h3 className="text-xs uppercase text-gray-300">Follow Us</h3>
                <div className="flex gap-2 sm:gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all"
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Links (internal use <Link>) */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="space-y-3 sm:space-y-4">
                <h3 className="text-xs uppercase text-gray-200 border-b border-white/10 pb-2">
                  {category}
                </h3>
                <ul className="space-y-1.5 sm:space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/"
                        className="group flex items-center text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
                      >
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {link}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-2 text-xs sm:text-sm text-gray-400">
              <span>© {currentYear} PLANADESK. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" /> for professionals
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs uppercase">
              {["Privacy Policy", "Terms", "Cookies", "Accessibility"].map((link) => (
                <Link key={link} to="/" className="text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 sm:w-11 sm:h-11 border border-white/30 bg-black/60 hover:bg-white hover:text-black text-white rounded-full flex items-center justify-center transition-colors"
            aria-label="Back to top"
          >
            <ArrowRight className="w-4 h-4 -rotate-90" />
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap');
      `}</style>
    </footer>
  );
};

export default Footer;
