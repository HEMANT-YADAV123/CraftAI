import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { useBreadcrumbSchema } from "../hooks/useBreadcrumbSchema";
import { Footer } from "./Footer";
import { sendContactEmail } from "../services/emailService";

interface ContactUsProps {
  onNavigate: (page: string) => void;
}

const countries = [
  { code: "IN", name: "India" },
  { code: "US", name: "United States" },
  { code: "UK", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "SG", name: "Singapore" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "NZ", name: "New Zealand" },
  { code: "ZA", name: "South Africa" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "CH", name: "Switzerland" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
];

export function ContactUs({ onNavigate }: ContactUsProps) {
  // SEO meta tags for contact us page
  usePageMeta({
    title: "Contact Us - CraftAI | Talk to Our Sales Team",
    description: "Get in touch with CraftAI's sales team. Have questions about pricing, plans, or our Voice AI platform? Fill out our contact form and we'll be in touch shortly to help transform your lending operations.",
    keywords: "contact CraftAI, voice AI sales, lending AI pricing, debt collection software contact, talk to sales, CraftAI support",
    canonicalUrl: "https://app.craftai.tech/contact"
  });

  // Breadcrumb structured data for SEO
  useBreadcrumbSchema([
    { name: "Home", url: "https://app.craftai.tech/" },
    { name: "Contact Us", url: "https://app.craftai.tech/contact" }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    countryCode: "IN",
    phoneNumber: "",
    email: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const filteredCountries = countries.filter(
    (country) =>
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCountrySelect = (code: string) => {
    handleInputChange("countryCode", code);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      // Send email using EmailJS
      const response = await sendContactEmail(formData);

      if (response.success) {
        setSubmitSuccess(true);

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: "",
            countryCode: "IN",
            phoneNumber: "",
            email: "",
            description: "",
          });
          setSubmitSuccess(false);
        }, 3000);
      } else {
        // Show error message from service
        setSubmitError(response.message);
      }
    } catch (error) {
      console.error("Unexpected error during form submission:", error);
      setSubmitError(
        "An unexpected error occurred. Please try again or contact support."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 bg-gradient-to-b from-transparent to-primary/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-border">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Section - Information */}
              <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-5xl mb-6 leading-tight">
                    Talk to a sales representative
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Have questions about pricing, plans, or our Awesome Product?
                    Fill out the form and a sales representative will be in
                    touch shortly.
                  </p>
                </motion.div>
              </div>

              {/* Right Section - Contact Form */}
              <div className="p-12 bg-card">
                <motion.form
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <div>
                    <Label htmlFor="name" className="text-base">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      required
                      className="mt-2 h-12 bg-input-background"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <Label htmlFor="phone" className="text-base">
                      Phone number <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex gap-3 items-start">
                      {/* Country Code Dropdown */}
                      <div className="relative mt-3" ref={dropdownRef}>
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          aria-label={`Select country code, currently ${formData.countryCode}`}
                          aria-expanded={isDropdownOpen}
                          aria-haspopup="listbox"
                          className="w-24 h-12 px-3 bg-input-background border border-input rounded-md flex items-center justify-between hover:bg-input-background/80 transition-all duration-200 focus:ring-2 focus:ring-primary focus:outline-none"
                        >
                          <span className="font-medium text-sm">
                            {formData.countryCode}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                              isDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl z-50 w-72 overflow-hidden"
                          >
                            {/* Search Box */}
                            <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search country..."
                                  value={searchTerm}
                                  onChange={(e) =>
                                    setSearchTerm(e.target.value)
                                  }
                                  className="w-full h-10 pl-10 pr-3 text-sm border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                  autoFocus
                                />
                              </div>
                            </div>

                            {/* Country List - Enhanced Scrollable */}
                            <div
                              className="country-dropdown-scroll"
                              style={{
                                maxHeight: "256px",
                                overflowY: "scroll"
                              }}
                            >
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() =>
                                      handleCountrySelect(country.code)
                                    }
                                    aria-label={`Select ${country.name} (${country.code})`}
                                    role="option"
                                    aria-selected={formData.countryCode === country.code}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 last:border-b-0 ${
                                      formData.countryCode === country.code
                                        ? 'bg-primary/10 dark:bg-primary/20 text-primary font-medium'
                                        : 'text-slate-700 dark:text-slate-300'
                                    }`}
                                  >
                                    <span className="flex-1">
                                      {country.name}
                                    </span>
                                    <span
                                      className={`font-semibold text-xs px-2 py-1 rounded ${
                                        formData.countryCode === country.code
                                          ? 'bg-primary text-primary-foreground'
                                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                      }`}
                                    >
                                      {country.code}
                                    </span>
                                  </button>
                                ))
                              ) : (
                                <div className="px-4 py-8 text-center">
                                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    No countries found
                                  </p>
                                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                    Try a different search
                                  </p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Phone Number Input */}
                      <div className="w-full mt-3">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Your phone number"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          required
                          className="h-12 bg-input-background"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <Label htmlFor="email" className="text-base">
                      E-mail <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative mt-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        required
                        className="w-full h-12 pl-11 pr-4 bg-input-background placeholder:text-slate-400 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div>
                    <Label htmlFor="description" className="text-base">
                      Give us a brief overview of what you're looking to solve:
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={6}
                      className="mt-2 resize-none bg-input-background"
                    />
                  </div>

                  {/* Success/Error Messages */}
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                    >
                      <p className="text-green-800 dark:text-green-200 text-sm font-medium">
                        ✓ Message sent successfully! We'll be in touch soon.
                      </p>
                    </motion.div>
                  )}

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                    >
                      <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                        {submitError}
                      </p>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting || submitSuccess}
                    className="w-full h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 disabled:opacity-50"
                  >
                    {isSubmitting && "Submitting..."}
                    {submitSuccess && "✓ Submitted Successfully!"}
                    {!isSubmitting && !submitSuccess && "Submit"}
                  </Button>
                </motion.form>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
