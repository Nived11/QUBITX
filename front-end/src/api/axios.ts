import axios from "axios";
import { store } from "@/store";
import { logout } from "@/slices/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Track if refresh is in progress
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      
      // Prevent refresh endpoint from triggering itself
      if (originalRequest.url?.includes("/auth/refresh-token")) {
        console.error("Refresh token is invalid or expired");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      // If refresh is already in progress, wait for it
      if (isRefreshing && refreshPromise) {
        try {
          await refreshPromise;
          const newToken = localStorage.getItem("accessToken");
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
        } catch (err) {
          return Promise.reject(err);
        }
      }

      // Start new refresh process
      isRefreshing = true;
      
      const localRefresh = localStorage.getItem("refreshToken");

      // No refresh token - logout immediately
      if (!localRefresh) {
        isRefreshing = false;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Create refresh promise
      refreshPromise = axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${localRefresh}` },
        }
      );

      try {
        const refreshRes = await refreshPromise;
        
        if (refreshRes.data?.accessToken && refreshRes.data?.refreshToken) {
          // Save new tokens
          localStorage.setItem("accessToken", refreshRes.data.accessToken);
          localStorage.setItem("refreshToken", refreshRes.data.refreshToken);

          // Update the original request with new token
          originalRequest.headers.Authorization = `Bearer ${refreshRes.data.accessToken}`;

          isRefreshing = false;
          refreshPromise = null;

          // Retry the original request
          return api(originalRequest);
        } else {
          throw new Error("No tokens in response");
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        
        isRefreshing = false;
        refreshPromise = null;

        // Clear everything and logout
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        store.dispatch(logout());
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden (invalid token)
    if (error.response?.status === 403) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      store.dispatch(logout());
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;