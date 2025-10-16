import { useEffect } from "react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Custom hook to add BreadcrumbList structured data to the page
 * Improves SEO by helping search engines understand page hierarchy
 *
 * @param breadcrumbs - Array of breadcrumb items with name and URL
 *
 * @example
 * useBreadcrumbSchema([
 *   { name: "Home", url: "https://app.craftai.tech/" },
 *   { name: "Demo", url: "https://app.craftai.tech/demo" }
 * ]);
 */
export function useBreadcrumbSchema(breadcrumbs: BreadcrumbItem[]) {
  useEffect(() => {
    // Create script element for breadcrumb structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "breadcrumb-schema";

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    script.textContent = JSON.stringify(breadcrumbSchema);

    // Remove existing breadcrumb schema if present
    const existingSchema = document.getElementById("breadcrumb-schema");
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new schema to head
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const schemaElement = document.getElementById("breadcrumb-schema");
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [breadcrumbs]);
}
