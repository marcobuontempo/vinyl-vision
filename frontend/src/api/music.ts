/**
 * "MUSIC" - API FUNCTIONS
 *
 * Provides functions to retrieve and manage music items from the backend.
 *
 * Includes support for fetching all music with sorting/filtering,
 * fetching by ID, retrieving featured music, adding new items, and 
 * deleting items.
 *
 */

// TYPES IMPORTS
import type {
  FilterOptions,
  MusicItemType,
  SortOptions,
} from "../../../shared/types";
// LOCAL IMPORTS
import { api, handleApiError } from "./index";

/**
 * Fetches all music items with optional sorting and filtering.
 *
 * @param {string} sortBy - Optional field to sort results by (default: "release_date").
 * @param order - Sort order, either "asc" or "desc" (default: "desc").
 * @param filters - Filter criteria such as "title", "artist", "genre", or "featured".
 *
 * @returns An array of music items matching the given parameters.
 * @throws Calls `handleApiError` if the API request fails.
 */
export const getAllMusic = async (
  sortBy: SortOptions["sortBy"] | undefined | null = "release_date",
  order: SortOptions["order"] | undefined | null = "desc",
  filters: FilterOptions = {}
) => {
  try {
    const params = new URLSearchParams();
    if (sortBy) params.append("sortBy", sortBy);
    if (order) params.append("order", order);
    if (filters.title) params.append("title", filters.title);
    if (filters.artist) params.append("artist", filters.artist);
    if (filters.genre) params.append("genre", filters.genre);
    if (filters.featured) params.append("featured", filters.featured);

    const res = await api.get(`/music?${params.toString()}`);
    return res.data as MusicItemType[];
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetches a single music item by its ID.
 *
 * @param id - The unique identifier of the music item.
 *
 * @returns A single `MusicItemType` object.
 * @throws Calls `handleApiError` if the API request fails.
 */
export const getMusicById = async (id: string) => {
  try {
    const res = await api.get(`/music/${id}`);
    return res.data as MusicItemType;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Fetches the featured music items.
 *
 * @returns An array of featured `MusicItemType` objects.
 * @throws Calls `handleApiError` if the API request fails.
 */

export const getFeaturedMusic = async () => {
  try {
    const res = await api.get("/music/featured");
    return res.data as MusicItemType[];
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Creates a new music item in the database.
 *
 * @param item - The music item details, excluding the ID (auto-assigned by the backend).
 *   @property price_aud - The price in AUD (provided as a float in dollars).
 *
 * @returns The newly created `MusicItemType` object.
 * @throws Calls `handleApiError` if the API request fails.
 *
 * @note The `price_aud` field is automatically converted from dollars
 *       to cents before being sent to the backend for storage.
 */
export const postNewMusicItem = async (item: Omit<MusicItemType, "id">) => {
  try {
    // Modify the $AUD to cents for database storage
    const payload = {
      ...item,
      price_aud: Math.round(item.price_aud * 100),
    };
    const res = await api.post("/music", payload);
    return res.data as MusicItemType;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Deletes a music item from the database.
 *
 * @param id - The music item ID to delete.
 *
 * @returns {Promise<void>}
 * @throws Calls `handleApiError` if the API request fails.
 *
 */
export const deleteMusicItem = async (id: string): Promise<void> => {
  try {
    await api.delete(`/music/${id}`);
    return;
  } catch (error) {
    handleApiError(error);
  }
};
