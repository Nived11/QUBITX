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
    // Check for refresh token from localStorage (fallback)
    const localRefresh = localStorage.getItem("refreshToken");

    const refreshRes = await api.post(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
        headers: localRefresh ? { Authorization: `Bearer ${localRefresh}` } : {},
      }
    );

    // Save new tokens to localStorage (backup)
    if (refreshRes.data?.accessToken) {
      localStorage.setItem("accessToken", refreshRes.data.accessToken);
      localStorage.setItem("refreshToken", refreshRes.data.refreshToken);
    }

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
