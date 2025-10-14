import { Linkedin } from "lucide-react";

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="w-full py-12 px-6 border-t border-border mt-20">
      <div className="container mx-auto max-w-7xl">
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column - Company Info */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>© 2025</p>
            <p>Novura Labs Private Limited.</p>
            <p>Kokarya Business Center, Jayanagar, Bengaluru - 560041</p>
            <p>All rights reserved.</p>
            <p>ISO 9001: ISO 9001:27001</p>

            {/* LinkedIn Icon */}
            <div className="pt-4">
              <a
                href="https://www.linkedin.com/company/craftaihq/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-transparent hover:bg-primary/10 active:bg-primary/20 transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="CraftAI LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors duration-200" />
              </a>
            </div>
          </div>

          {/* Middle Column - Company Links */}
          <div>
            <h3 className="text-base font-medium mb-4 text-foreground">Company</h3>
            <div className="flex flex-col space-y-3 text-md">
              {[
                { label: "About", page: "about" },
                { label: "Contact", page: "contact" },
              ].map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavigation(link.page)}
                  className="
                    relative text-muted-foreground text-left
                    transition-all duration-300 ease-in-out
                    hover:text-primary
                    hover:translate-x-1
                    active:translate-x-0
                    after:absolute after:left-0 after:bottom-[-3px]
                    after:w-0 after:h-[2px] after:bg-primary after:transition-all
                    after:duration-300 hover:after:w-full
                    cursor-pointer
                  "
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Features Links */}
          <div>
            <h3 className="text-base font-medium mb-4 text-foreground">Features</h3>
            <div className="flex flex-col space-y-3 text-md">
              <button
                onClick={() => handleNavigation("home")}
                className="
                  relative text-muted-foreground text-left
                  transition-all duration-300 ease-in-out
                  hover:text-primary
                  hover:translate-x-1
                  active:translate-x-0
                  after:absolute after:left-0 after:bottom-[-3px]
                  after:w-0 after:h-[2px] after:bg-primary after:transition-all
                  after:duration-300 hover:after:w-full
                  cursor-pointer
                "
              >
                Impact
              </button>
            </div>
          </div>
        </div>

        {/* Bottom - Made in India */}
        <div className="text-center pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">Made in India 2025</p>
        </div>
      </div>
    </footer>
  );
}
