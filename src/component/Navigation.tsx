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
        <button onClick={() => onNavigate("home")} className="flex items-center">
          <img src={logo} alt="CraftAI" className="h-10 w-auto" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate("home")}
            className={`transition-colors ${
              currentPage === "home"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate("demo")}
            className={`transition-colors ${
              currentPage === "demo"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Demo
          </button>
          <button
            onClick={() => onNavigate("demo")}
            className={`transition-colors ${
              currentPage === "demo"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            About Us
          </button>

          <button
            onClick={() => onNavigate("demo")}
            className={`transition-colors ${
              currentPage === "demo"
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contact Us
          </button>

        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  );
}
