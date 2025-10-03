import type {
  FilterOptions,
  MusicItemType,
  SortOptions,
} from "../../../shared/types";
import { api, handleApiError } from "./index";

export const getAllMusic = async (
  sortBy: SortOptions["sortBy"] | undefined | null = "release_date",
  order: SortOptions["order"] | undefined | null = "desc",
  filters: FilterOptions
) => {
  try {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (order) params.append("order", order);
    if (filters.title) params.append("title", filters.title);
    if (filters.artist) params.append("artist", filters.artist);
    if (filters.genre) params.append("genre", filters.genre);

    const res = await api.get(`/music?${params.toString()}`);
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

export const getFeaturedMusic = async () => {
  try {
    const res = await api.get("/music/featured");
    return res.data as MusicItemType[];
  } catch (error) {
    handleApiError(error);
  }
};

export const postNewMusicItem = async (item: Omit<MusicItemType, "id">) => {
  try {
    const res = await api.post("/music", item);
    return res.data as MusicItemType;
  } catch (error) {
    handleApiError(error);
  }
};
