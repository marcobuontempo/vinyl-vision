import type { MusicItemType, SortOptions } from "../../../shared/types";
import { api, handleApiError } from "./index";

export const getAllMusic = async (
  sortBy: SortOptions["sortBy"] | undefined | null = "release_date",
  order: SortOptions["order"] | undefined | null = "asc"
) => {
  try {
    const res = await api.get(`/music?sortBy=${sortBy}&order=${order}`);
    return res.data as MusicItemType[];
  } catch (error) {
    handleApiError(error);
  }
};

export const getMusicById = async (id: string) => {
  try {
    const res = await api.get(`/music/${id}`);
    return res.data as MusicItemType;
  } catch (error) {
    handleApiError(error);
  }
};
