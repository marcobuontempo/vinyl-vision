import { api, handleApiError } from "./index";

export const postLogin = async (user: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login", user);
    return res.data.token;
  } catch (error) {
    handleApiError(error);
  }
};

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
