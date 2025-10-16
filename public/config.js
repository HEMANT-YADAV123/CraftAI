// Runtime Configuration - Fallback for local development
// This file is overwritten by Docker in production
window.__ENV__ = {
  // These will be undefined in dev, causing fallback to import.meta.env
  VITE_BOLNA_API_KEY: undefined,
  VITE_BOLNA_AGENT_PRIYA: undefined,
  VITE_BOLNA_AGENT_TRIPTI: undefined,
  VITE_BOLNA_AGENT_ARUN: undefined,
};
