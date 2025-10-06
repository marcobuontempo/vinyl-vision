/**
 * "USER" - API FUNCTIONS
 *
 * Provides functions to update user account details via the backend API.
 *
 */

// LOCAL IMPORTS
import { api, handleApiError } from "./index";

/**
 * Updates user account details.
 *
 * @param id - The unique identifier of the user.
 * @param details - Object containing account details to update.
 *   @property password - The user's current password (required).
 *   @property email - (Optional) The new email address to set.
 *   @property fullname - (Optional) The new full name to set.
 *   @property newpassword - (Optional) A new password to replace the old one.
 *
 * @returns A JWT token string.
 * @throws Calls `handleApiError` if the API request fails.
 *
 * @note Optional fields (`fullname`, `email`, `newpassword`) are automatically
 *       removed from the request payload if they are not provided, so that
 *       only intended changes are sent to the backend.
 */
export const putUpdateDetails = async (
  id: string,
  details: {
    password: string;
    email?: string;
    fullname?: string;
    newpassword?: string;
  }
) => {
  try {
    if (!details.fullname) delete details.fullname;
    if (!details.email) delete details.email;
    if (!details.newpassword) delete details.newpassword;

    const res = await api.put(`/users/${id}`, details);
    return res.data.token;
  } catch (error) {
    handleApiError(error);
  }
};
