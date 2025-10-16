/**
 * Language configurations for Indian market
 * Supporting major Indian languages for geo-targeting and SEO
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  hreflang: string;
  region: string;
  rtl?: boolean;
}

/**
 * Supported Indian languages
 * Major languages covering ~95% of Indian population
 */
export const INDIAN_LANGUAGES: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    hreflang: "en-IN",
    region: "India"
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिन्दी",
    hreflang: "hi-IN",
    region: "North India"
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    hreflang: "ta-IN",
    region: "Tamil Nadu"
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    hreflang: "te-IN",
    region: "Andhra Pradesh, Telangana"
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    hreflang: "kn-IN",
    region: "Karnataka"
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    hreflang: "ml-IN",
    region: "Kerala"
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    hreflang: "mr-IN",
    region: "Maharashtra"
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    hreflang: "gu-IN",
    region: "Gujarat"
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    hreflang: "bn-IN",
    region: "West Bengal"
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    hreflang: "pa-IN",
    region: "Punjab"
  }
];

/**
 * Get language by code
 */
export function getLanguageByCode(code: string): Language | undefined {
  return INDIAN_LANGUAGES.find(lang => lang.code === code);
}

/**
 * Get browser language preference
 */
export function getBrowserLanguage(): string {
  if (typeof window === "undefined") return "en";

  const browserLang = navigator.language || (navigator as any).userLanguage;
  const langCode = browserLang.split("-")[0];

  // Check if browser language is supported
  const supportedLang = INDIAN_LANGUAGES.find(lang => lang.code === langCode);
  return supportedLang ? langCode : "en";
}

/**
 * Store language preference in localStorage
 */
export function setLanguagePreference(langCode: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("craftai-language", langCode);
}

/**
 * Get stored language preference
 */
export function getLanguagePreference(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("craftai-language");
}

/**
 * Get current language (priority: localStorage > URL param > browser > default)
 */
export function getCurrentLanguage(): string {
  // Check localStorage first
  const stored = getLanguagePreference();
  if (stored) return stored;

  // Check URL parameter
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get("lang");
    if (urlLang && INDIAN_LANGUAGES.find(lang => lang.code === urlLang)) {
      setLanguagePreference(urlLang);
      return urlLang;
    }
  }

  // Check browser language
  const browserLang = getBrowserLanguage();
  return browserLang;
}

/**
 * Major Indian states for geo-targeting
 */
export const INDIAN_STATES = [
  { name: "Andhra Pradesh", code: "AP", population: 49386799 },
  { name: "Arunachal Pradesh", code: "AR", population: 1382611 },
  { name: "Assam", code: "AS", population: 31169272 },
  { name: "Bihar", code: "BR", population: 103804637 },
  { name: "Chhattisgarh", code: "CG", population: 25540196 },
  { name: "Goa", code: "GA", population: 1457723 },
  { name: "Gujarat", code: "GJ", population: 60383628 },
  { name: "Haryana", code: "HR", population: 25353081 },
  { name: "Himachal Pradesh", code: "HP", population: 6856509 },
  { name: "Jharkhand", code: "JH", population: 32966238 },
  { name: "Karnataka", code: "KA", population: 61130704 },
  { name: "Kerala", code: "KL", population: 33387677 },
  { name: "Madhya Pradesh", code: "MP", population: 72597565 },
  { name: "Maharashtra", code: "MH", population: 112372972 },
  { name: "Manipur", code: "MN", population: 2721756 },
  { name: "Meghalaya", code: "ML", population: 2964007 },
  { name: "Mizoram", code: "MZ", population: 1091014 },
  { name: "Nagaland", code: "NL", population: 1980602 },
  { name: "Odisha", code: "OR", population: 41947358 },
  { name: "Punjab", code: "PB", population: 27704236 },
  { name: "Rajasthan", code: "RJ", population: 68621012 },
  { name: "Sikkim", code: "SK", population: 607688 },
  { name: "Tamil Nadu", code: "TN", population: 72138958 },
  { name: "Telangana", code: "TS", population: 35193978 },
  { name: "Tripura", code: "TR", population: 3671032 },
  { name: "Uttar Pradesh", code: "UP", population: 199581477 },
  { name: "Uttarakhand", code: "UK", population: 10116752 },
  { name: "West Bengal", code: "WB", population: 91347736 },
  { name: "Delhi", code: "DL", population: 16753235 }
];

/**
 * Major Indian cities for local SEO
 */
export const MAJOR_INDIAN_CITIES = [
  { name: "Mumbai", state: "Maharashtra", coordinates: { lat: 19.0760, lng: 72.8777 } },
  { name: "Delhi", state: "Delhi", coordinates: { lat: 28.7041, lng: 77.1025 } },
  { name: "Bengaluru", state: "Karnataka", coordinates: { lat: 12.9716, lng: 77.5946 } },
  { name: "Hyderabad", state: "Telangana", coordinates: { lat: 17.3850, lng: 78.4867 } },
  { name: "Chennai", state: "Tamil Nadu", coordinates: { lat: 13.0827, lng: 80.2707 } },
  { name: "Kolkata", state: "West Bengal", coordinates: { lat: 22.5726, lng: 88.3639 } },
  { name: "Pune", state: "Maharashtra", coordinates: { lat: 18.5204, lng: 73.8567 } },
  { name: "Ahmedabad", state: "Gujarat", coordinates: { lat: 23.0225, lng: 72.5714 } },
  { name: "Jaipur", state: "Rajasthan", coordinates: { lat: 26.9124, lng: 75.7873 } },
  { name: "Surat", state: "Gujarat", coordinates: { lat: 21.1702, lng: 72.8311 } },
  { name: "Lucknow", state: "Uttar Pradesh", coordinates: { lat: 26.8467, lng: 80.9462 } },
  { name: "Kanpur", state: "Uttar Pradesh", coordinates: { lat: 26.4499, lng: 80.3319 } },
  { name: "Nagpur", state: "Maharashtra", coordinates: { lat: 21.1458, lng: 79.0882 } },
  { name: "Indore", state: "Madhya Pradesh", coordinates: { lat: 22.7196, lng: 75.8577 } },
  { name: "Thane", state: "Maharashtra", coordinates: { lat: 19.2183, lng: 72.9781 } },
  { name: "Bhopal", state: "Madhya Pradesh", coordinates: { lat: 23.2599, lng: 77.4126 } },
  { name: "Visakhapatnam", state: "Andhra Pradesh", coordinates: { lat: 17.6868, lng: 83.2185 } },
  { name: "Patna", state: "Bihar", coordinates: { lat: 25.5941, lng: 85.1376 } },
  { name: "Vadodara", state: "Gujarat", coordinates: { lat: 22.3072, lng: 73.1812 } },
  { name: "Ghaziabad", state: "Uttar Pradesh", coordinates: { lat: 28.6692, lng: 77.4538 } }
];

/**
 * SEO Keywords in major Indian languages
 */
export const MULTILINGUAL_KEYWORDS = {
  en: "voice AI, debt collection, EMI reminders, lead generation, lending platform, AI agents",
  hi: "वॉयस एआई, ऋण संग्रहण, ईएमआई रिमाइंडर, लीड जनरेशन, लेंडिंग प्लेटफॉर्म",
  ta: "குரல் AI, கடன் வசூல், EMI நினைவூட்டல்கள், முன்னணி உருவாக்கம்",
  te: "వాయిస్ AI, రుణ సేకరణ, EMI రిమైండర్లు, లీడ్ జనరేషన్",
  kn: "ವಾಯ್ಸ್ AI, ಸಾಲ ಸಂಗ್ರಹಣೆ, EMI ಜ್ಞಾಪನೆಗಳು, ಲೀಡ್ ಜನರೇಶನ್",
  ml: "വോയ്സ് AI, കടം ശേഖരണം, EMI ഓർമ്മപ്പെടുത്തലുകൾ, ലീഡ് ജനറേഷൻ",
  mr: "व्हॉइस एआय, कर्ज वसुली, ईएमआय स्मरणपत्रे, लीड जनरेशन",
  gu: "વૉઇસ AI, દેવું સંગ્રહ, EMI રીમાઇન્ડર્સ, લીડ જનરેશન",
  bn: "ভয়েস AI, ঋণ সংগ্রহ, EMI অনুস্মারক, লিড জেনারেশন",
  pa: "ਵੌਇਸ AI, ਕਰਜ਼ਾ ਇਕੱਤਰ, EMI ਰਿਮਾਈਂਡਰ, ਲੀਡ ਜਨਰੇਸ਼ਨ"
};
