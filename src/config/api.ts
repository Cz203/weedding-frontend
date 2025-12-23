// API Configuration
const isDevelopment = import.meta.env.DEV; // Vite tự động set: true khi dev, false khi build

export const API_CONFIG = {
  // Tự động chọn URL dựa trên môi trường
  BASE_URL: isDevelopment
    ? import.meta.env.VITE_API_URL_DEV || "http://127.0.0.1:8000"
    : import.meta.env.VITE_API_URL_PROD ||
      import.meta.env.VITE_API_URL ||
      "http://127.0.0.1:8000",

  // Endpoints
  ENDPOINTS: {
    // Public
    SOCIAL_LINKS: "/api/social-links",
    CONTACTS: "/api/contacts",
    ALBUMS: "/api/albums",
    DRESSES: "/api/dresses",
    VESTS: "/api/vests",

    // Auth
    LOGIN: "/api/login",
    REGISTER: "/api/register",
    LOGOUT: "/api/logout",
    ME: "/api/me",
  },

  // Storage URL for images
  STORAGE_URL: isDevelopment
    ? `${import.meta.env.VITE_API_URL_DEV || "http://127.0.0.1:8000"}/storage`
    : `${
        import.meta.env.VITE_API_URL_PROD ||
        import.meta.env.VITE_API_URL ||
        "http://127.0.0.1:8000"
      }/storage`,
};

// Helper function để tạo full URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function cho storage images
export const getStorageUrl = (path: string): string => {
  return `${API_CONFIG.STORAGE_URL}/${path}`;
};
