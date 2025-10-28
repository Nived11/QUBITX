import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiry case
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired. Please refresh." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Attempt token refresh
        await api.post("/auth/refresh-token", {}, { withCredentials: true });

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // For any other error, propagate it normally
    return Promise.reject(error);
  }
);


export default api;
