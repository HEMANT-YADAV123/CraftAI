import { Button } from "./ui/button";
import logo from "../assets/images/logo.png";

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between bg-white">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center"
        >
          <img src={logo} alt="CraftAI" className="h-10 w-auto" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate("home")}
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
            onClick={() => onNavigate("demo")}
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
            onClick={() => onNavigate("about")}
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
            onClick={() => onNavigate("contact")}
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

        <div className="flex items-center gap-3">
          <Button
  variant="ghost"
  onClick={() => window.open("https://app.craftai.tech", "_blank")}
  className="
    hidden md:inline-flex
    text-foreground
    hover:text-primary
    hover:bg-primary/10
    active:bg-primary/20
    transition-all duration-200
    font-medium
    cursor-pointer
  "
>
  Sign In
</Button>


          <Button
            onClick={() => onNavigate("contact")}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </nav>
  );
}
