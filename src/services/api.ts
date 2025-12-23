import { API_CONFIG } from "../config/api";

// API Configuration - sử dụng getApiUrl với endpoint từ API_CONFIG
export const API_BASE_URL = API_CONFIG.BASE_URL;

// Helper function to get auth token
export const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

// Helper function to get headers
export const getHeaders = (includeAuth = false) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

// API Client
export const apiClient = {
  // Login
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: getHeaders(),
      credentials: "include", // Gửi cookies để Sanctum hoạt động
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Get current user
  me: async () => {
    const response = await fetch(`${API_BASE_URL}/api/me`, {
      method: "GET",
      headers: getHeaders(true),
      credentials: "include", // Gửi cookies để Sanctum hoạt động
    });

    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.message = `${response.status}`;
      throw error;
    }

    return response.json();
  },

  // Update profile
  updateProfile: async (data: Record<string, string | undefined>) => {
    const response = await fetch(`${API_BASE_URL}/api/profile`, {
      method: "PUT",
      headers: getHeaders(true),
      credentials: "include", // Gửi cookies để Sanctum hoạt động
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  // Logout
  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/api/logout`, {
      method: "POST",
      headers: getHeaders(true),
      credentials: "include", // Gửi cookies để Sanctum hoạt động
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
