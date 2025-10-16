import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '../assets/images/logo.png'

export function Navigation({ currentPage = "home", onNavigate = (_page: string) => {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between bg-white">
        {/* Logo */}
        <button
          onClick={() => handleNavigate("home")}
          className="flex items-center"
          aria-label="CraftAI Home - Navigate to homepage"
        >
           <img src={logo} alt="CraftAI" className="h-10 w-auto cursor-pointer" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavigate("home")}
            className={`font-medium cursor-pointer transition-all duration-200 relative group ${
              currentPage === "home"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground active:text-primary"
            }`}
          >
            Home
            <span
              className={`absolute bottom-[-4px] left-0 h-0.5 bg-primary transition-all duration-200 ${
                currentPage === "home" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </button>
          <button
            onClick={() => handleNavigate("demo")}
            className={`font-medium transition-all duration-200 relative group cursor-pointer ${
              currentPage === "demo"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground active:text-primary"
            }`}
          >
            Demo
            <span
              className={`absolute bottom-[-4px] left-0 h-0.5 bg-primary transition-all duration-200 ${
                currentPage === "demo" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </button>
          <button
            onClick={() => handleNavigate("about")}
            className={`font-medium transition-all duration-200 relative group cursor-pointer ${
              currentPage === "about"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground active:text-primary"
            }`}
          >
            About Us
            <span
              className={`absolute bottom-[-4px] left-0 h-0.5 bg-primary transition-all duration-200 ${
                currentPage === "about" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </button>

          <button
            onClick={() => handleNavigate("contact")}
            className={`font-medium transition-all duration-200 relative group cursor-pointer ${
              currentPage === "contact"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground active:text-primary"
            }`}
          >
            Contact Us
            <span
              className={`absolute bottom-[-4px] left-0 h-0.5 bg-primary transition-all duration-200 ${
                currentPage === "contact" ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></span>
          </button>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => window.open("https://app.craftai.tech", "_blank")}
            className="text-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-200 font-medium cursor-pointer px-4 py-2 rounded-lg"
          >
            Sign In
          </button>

          <button
            onClick={() => handleNavigate("contact")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer px-6 py-2 rounded-lg text-white font-medium"
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="p-2 hover:bg-primary/10 rounded-lg transition-all duration-200 mobile-menu-btn"
  aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
  aria-expanded={isMenuOpen}
>
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground cursor-pointer" />
          ) : (
            <Menu className="w-6 h-6 text-foreground cursor-pointer" />
          )}
        </button>
      </div>

      {/* Mobile Menu Sheet */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            <button
              onClick={() => handleNavigate("home")}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                currentPage === "home"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigate("demo")}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                currentPage === "demo"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5"
              }`}
            >
              Demo
            </button>
            <button
              onClick={() => handleNavigate("about")}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                currentPage === "about"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavigate("contact")}
              className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                currentPage === "contact"
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-primary/5"
              }`}
            >
              Contact Us
            </button>

            <div className="border-t border-border pt-4 flex flex-col gap-3">
              <button
                onClick={() => window.open("https://app.craftai.tech", "_blank")}
                className="w-full px-4 py-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 font-medium cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => handleNavigate("contact")}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer px-6 py-2 rounded-lg text-white font-medium cursor-pointer"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}