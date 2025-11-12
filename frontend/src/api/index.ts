/**
 * "GLOBAL" - API
 *
 * Provides a pre-configured Axios instance for making requests to the backend
 * and a centralised error handler for normalising error responses.
 *
 */

// NPM IMPORTS
import axios, { AxiosError } from "axios";

/**
 * Axios instance configured with a base API URL and default headers.
 * Use this instance for all API requests in the application.
 */
export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

/**
 * Handles errors from API requests made with Axios.
 *
 * @param error - The error object thrown during an API request.
 *   Can be an `AxiosError` or an unknown error type.
 *
 * @throws {Error} Normalised error with a user-friendly message:
 *   - If the server responded with an error (status 4xx/5xx), uses
 *     the message returned by the API (or "Server error").
 *   - If the request was sent but no response was received, throws
 *     "No response from server".
 *   - Otherwise, throws the message from the original error or
 *     "Unknown error".
 */
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
