import type { MusicItemType } from "../../../shared/types";
import { api, handleApiError } from "./index";

export const getAllMusic = async () => {
  try {
    const res = await api.get("/music");
    return res.data as MusicItemType[];
  } catch (error) {
    handleApiError(error);
  }
};

export const getMusicById = async (id: string) => {
  try {
    const res = await api.get(`/music/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    handleApiError(error);
  }
};
