import axios, { AxiosError } from "axios";

// Create a custom axios instance
export const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// General error handler
export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;

    if (axiosError.response) {
      // Server returned a response (4xx, 5xx)
      const msg = axiosError.response.data?.message || "Server error";
      throw new Error(msg);
    } else if (axiosError.request) {
      // Request was made but no response
      throw new Error("No response from server");
    }
  }
  // Something else happened
  throw new Error((error as Error).message || "Unknown error");
};
