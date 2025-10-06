/**
 * "AUTH" - API FUNCTIONS
 *
 * Provides functions to handle user authentication via the backend API.
 *
 * Each function sends a request to the /auth endpoint and returns
 * a token string on success. Errors are passed to the handleApiError helper.
 *
 */

// LOCAL IMPORTS
import { api, handleApiError } from "./index";

/**
 * Logs in an existing user.
 *
 * @param user - Object containing login credentials.
 *   @property email - The user's email address.
 *   @property password - The user's account password in plaintext.
 *
 * @returns A JWT token string on successful login.
 * @throws Calls `handleApiError` if the API request fails.
 */
export const postLogin = async (user: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login", user);
    return res.data.token;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Registers a new user account.
 *
 * @param user - Object containing registration details.
 *   @property fullname - The user's full name.
 *   @property email - The user's email address.
 *   @property password - The user's chosen account password in plaintext.
 *
 * @returns A JWT token string on successful registration.
 * @throws Calls `handleApiError` if the API request fails.
 */
export const postRegister = async (user: {
  fullname: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/register", user);
    return res.data.token;
  } catch (error) {
    handleApiError(error);
  }
};
