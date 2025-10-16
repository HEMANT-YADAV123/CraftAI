import { useEffect } from "react";

interface PageMetaConfig {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

/**
 * Custom hook to dynamically update page meta tags for SEO
 *
 * @param config - Configuration object for page meta tags
 *
 * @example
 * usePageMeta({
 *   title: "Demo - CraftAI Voice AI Platform",
 *   description: "Try our live demo and experience AI-powered voice agents",
 *   canonicalUrl: "https://craftai.tech/demo"
 * });
 */
export function usePageMeta(config: PageMetaConfig) {
  useEffect(() => {
    // Update page title
    document.title = config.title;

    // Helper function to update or create meta tag
    const updateMetaTag = (selector: string, content: string) => {
      const element = document.querySelector(selector);

      if (element) {
        element.setAttribute("content", content);
      } else {
        // Create meta tag if it doesn't exist
        const meta = document.createElement("meta");

        if (selector.includes('property=')) {
          const property = selector.match(/property=["']([^"']+)["']/)?.[1];
          if (property) {
            meta.setAttribute("property", property);
          }
        } else if (selector.includes('name=')) {
          const name = selector.match(/name=["']([^"']+)["']/)?.[1];
          if (name) {
            meta.setAttribute("name", name);
          }
        }

        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    // Update description
    updateMetaTag('meta[name="description"]', config.description);

    // Update keywords if provided
    if (config.keywords) {
      updateMetaTag('meta[name="keywords"]', config.keywords);
    }

    // Update Open Graph tags
    const ogTitle = config.ogTitle || config.title;
    const ogDescription = config.ogDescription || config.description;

    updateMetaTag('meta[property="og:title"]', ogTitle);
    updateMetaTag('meta[property="og:description"]', ogDescription);

    if (config.ogImage) {
      updateMetaTag('meta[property="og:image"]', config.ogImage);
    }

    if (config.canonicalUrl) {
      updateMetaTag('meta[property="og:url"]', config.canonicalUrl);

      // Update Twitter URL
      updateMetaTag('meta[name="twitter:url"]', config.canonicalUrl);
    }

    // Update Twitter Card tags
    updateMetaTag('meta[name="twitter:title"]', ogTitle);
    updateMetaTag('meta[name="twitter:description"]', ogDescription);

    // Update canonical link
    if (config.canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

      if (canonical) {
        canonical.href = config.canonicalUrl;
      } else {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        canonical.href = config.canonicalUrl;
        document.head.appendChild(canonical);
      }
    }

    // Cleanup function (optional - restore default title on unmount)
    return () => {
      document.title = "CraftAI - Voice AI Platform for Lenders";
    };
  }, [config]);
}
