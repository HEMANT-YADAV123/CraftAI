import emailjs from "@emailjs/browser";

/**
 * EmailJS Service Configuration
 *
 * This service handles client-side email sending using EmailJS.
 * No backend required - all operations happen in the browser.
 *
 * Setup Instructions:
 * 1. Create account at https://dashboard.emailjs.com
 * 2. Add email service (Gmail recommended)
 * 3. Create email template with these variables:
 *    - {{from_name}}
 *    - {{from_email}}
 *    - {{country_code}}
 *    - {{phone_number}}
 *    - {{message}}
 * 4. Copy Service ID, Template ID, and Public Key to .env
 */

interface ContactFormData {
  name: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  description: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Get environment variable from either Vite runtime or Docker config
 */
function getEnvVar(key: string): string | undefined {
  // First check if window.__ENV__ exists (Docker runtime config)
  if (typeof window !== "undefined" && (window as any).__ENV__) {
    const dockerValue = (window as any).__ENV__[key];
    if (dockerValue) {
      return dockerValue;
    }
  }

  // Fallback to Vite environment variables (local development)
  // Access the env object directly instead of using bracket notation
  const viteEnv = import.meta.env as Record<string, string>;
  return viteEnv[key];
}

/**
 * Send contact form email using EmailJS
 * @param formData - Contact form data to send
 * @returns Promise with success status and message
 */
export async function sendContactEmail(
  formData: ContactFormData
): Promise<EmailResponse> {
  const serviceId = getEnvVar("VITE_EMAILJS_SERVICE_ID");
  const templateId = getEnvVar("VITE_EMAILJS_TEMPLATE_ID");
  const publicKey = getEnvVar("VITE_EMAILJS_PUBLIC_KEY");

  // Validate environment variables
  if (!serviceId || !templateId || !publicKey) {
    console.error("❌ EmailJS configuration missing in environment variables");
    return {
      success: false,
      message: "Email service not configured. Please contact support.",
      error: "Missing EmailJS configuration",
    };
  }

  // Check for placeholder values
  if (
    serviceId.includes("your_") ||
    templateId.includes("your_") ||
    publicKey.includes("your_")
  ) {
    console.error("EmailJS configuration contains placeholder values");
    return {
      success: false,
      message: "Email service not configured. Please contact support.",
      error: "EmailJS configuration not set up",
    };
  }

  try {
    // Prepare template parameters matching EmailJS template variables
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      country_code: formData.countryCode,
      phone_number: formData.phoneNumber,
      message: formData.description || "No description provided",
      // Additional metadata
      full_phone: `+${formData.countryCode} ${formData.phoneNumber}`,
      timestamp: new Date().toLocaleString(),
    };

    // Send email via EmailJS
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    if (response.status === 200) {
      return {
        success: true,
        message: "Email sent successfully! We'll be in touch soon.",
      };
    } else {
      console.error("❌ Unexpected status code:", response.status);
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Failed to send email:", error);

    // Handle specific error types
    if (error instanceof Error) {
      // Network errors
      if (error.message.includes("network") || error.message.includes("fetch")) {
        return {
          success: false,
          message: "Network error. Please check your connection and try again.",
          error: error.message,
        };
      }

      // EmailJS specific errors
      if (error.message.includes("400")) {
        return {
          success: false,
          message: "Invalid email configuration. Please contact support.",
          error: "EmailJS 400 error",
        };
      }

      if (error.message.includes("401") || error.message.includes("403")) {
        return {
          success: false,
          message: "Email service authentication failed. Please contact support.",
          error: "EmailJS authentication error",
        };
      }

      if (error.message.includes("429")) {
        return {
          success: false,
          message: "Too many requests. Please try again later.",
          error: "Rate limit exceeded",
        };
      }
    }

    // Generic error
    return {
      success: false,
      message: "Failed to send email. Please try again or contact support.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Initialize EmailJS (optional - for advanced configuration)
 * Call this in main.tsx or App.tsx if needed
 */
export function initEmailJS(): void {
  const publicKey = getEnvVar("VITE_EMAILJS_PUBLIC_KEY");

  if (publicKey && !publicKey.includes("your_")) {
    emailjs.init(publicKey);
  }
}
