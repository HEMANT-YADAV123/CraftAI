// =============================================================================
// Environment Variable Helper
// Supports both development (import.meta.env) and production (window.__ENV__)
// =============================================================================

declare global {
  interface Window {
    __ENV__?: {
      VITE_BOLNA_API_KEY?: string;
      VITE_BOLNA_AGENT_PRIYA?: string;
      VITE_BOLNA_AGENT_TRIPTI?: string;
      VITE_BOLNA_AGENT_ARUN?: string;
    };
  }
}

/**
 * Get environment variable value
 * Works in both development (Vite) and production (Docker runtime config)
 */
export function getEnv(key: string): string | undefined {
  // Try runtime config first (Docker production)
  if (typeof window !== 'undefined' && window.__ENV__) {
    const value = window.__ENV__[key as keyof typeof window.__ENV__];
    if (value) return value;
  }

  // Fall back to Vite environment variables (development)
  return import.meta.env[key];
}

/**
 * Get Bolna API configuration
 */
export const getBolnaConfig = () => ({
  apiKey: getEnv('VITE_BOLNA_API_KEY'),
  agents: {
    priya: getEnv('VITE_BOLNA_AGENT_PRIYA'),
    tripti: getEnv('VITE_BOLNA_AGENT_TRIPTI'),
    arun: getEnv('VITE_BOLNA_AGENT_ARUN'),
  },
});
