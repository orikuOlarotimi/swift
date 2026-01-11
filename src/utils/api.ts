import axios from "axios";
import axiosRetry from "axios-retry";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

// 🔁 Retry configuration
axiosRetry(api, {
  retries: 3, // number of retries
  retryDelay: (retryCount) => {
    return retryCount * 1000; // 1s, 2s, 3s
  },
  retryCondition: (error) =>
  axiosRetry.isNetworkError(error) ||
  axiosRetry.isRetryableError(error) ||
  (error.response?.status ?? 0) >= 500,
});

export default api;
