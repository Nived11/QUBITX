import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// ✅ Add accessToken from localStorage if cookies are blocked
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired. Please refresh." &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Try refresh from localStorage
        const refreshToken =
          localStorage.getItem("refreshToken");

        const res = await api.post(
          "/auth/refresh-token",
          {},
          {
            headers: { Authorization: `Bearer ${refreshToken}` },
            withCredentials: true,
          }
        );

        // ✅ Update localStorage with new tokens
        if (res.data.accessToken) {
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        }

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
