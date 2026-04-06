import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Send Cookies automatically
});

// Request interceptor: The browser handles cookies with withCredentials: true.
// No manual Authorization header is needed if using HttpOnly cookies.

export default apiClient;
