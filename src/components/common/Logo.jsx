import { Link } from "react-router-dom";

// LOGO IMAGES
import logoTransparent from "/src/components/assets/White Version (1).svg";
import logoScrolled from "/src/components/assets/Black Version.svg";

const Logo = ({ isScrolled }) => {
  return (
    <Link to="/" className="flex items-center group flex-shrink-0">
      <div className="relative overflow-hidden">
        <img
          src={isScrolled ? logoScrolled : logoTransparent}
          alt="Planadesk Logo"
          className="h-8 sm:h-9 lg:h-11 w-auto transition-all duration-700 group-hover:opacity-75"
          style={{
            letterSpacing: "0.05em",
          }}
        />
      </div>
    </Link>
  );
};

export default Logo;
