import { api, handleApiError } from "./index";

// TODO
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
