/**
 * Music Services
 * 
 * Provides database operations for music items management
 * 
 */

// TYPES IMPORTS
import type {
  FilterOptions,
  MusicItemType,
  SortOptions,
} from "../../../shared/types/music.js";
// LOCAL IMPORTS
import { db, mapDocument } from "../utilities/database.util.js";

/**
 * Fetch all music items from the database with optional sorting and filtering.
 *
 * @param {SortOptions["sortBy"]} field - Field to sort by (default: "release_date")
 * @param {SortOptions["order"]} direction - Sort direction, "asc" or "desc" (default: "asc")
 * @param {FilterOptions} filters - Optional filters for title, artist, and genre
 * @returns {Promise<MusicItemType[]>} - Array of filtered music items
 */
export const findAllMusic = async (
  field: SortOptions["sortBy"] = "release_date",
  direction: SortOptions["order"] = "asc",
  filters: FilterOptions = {}
): Promise<MusicItemType[]> => {
  const musicRef = db.collection("music").orderBy(field, direction);
  const snapshot = await musicRef.get();

  const music: MusicItemType[] = [];
  snapshot.forEach((doc) => music.push(mapDocument<MusicItemType>(doc)));

  const filteredMusic = music.filter((doc) => {
    // only return docs that match the specified filters
    return (
      // title contains filter.title
      (!filters.title ||
        doc.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      // artist contains filter.artist
      (!filters.artist ||
        doc.artist.toLowerCase().includes(filters.artist.toLowerCase())) &&
      // genre contains filter.genre
      (!filters.genre ||
        doc.genre.toLowerCase().includes(filters.genre.toLowerCase()))
    );
  });

  return filteredMusic;
};

/**
 * Fetch a single music item by its ID.
 *
 * @param {string} id - Music item ID
 * @returns {Promise<MusicItemType | null>} - The music item, or null if not found
 */
export const findOneMusicById = async (
  id: string
): Promise<MusicItemType | null> => {
  const music = await db.collection("music").doc(id).get();
  return mapDocument<MusicItemType>(music);
};

/**
 * Fetch all music items marked as featured.
 *
 * @returns {Promise<MusicItemType[]>} - Array of featured music items
 */
export const findMusicFeatured = async (): Promise<MusicItemType[] | null> => {
  const musicRef = db.collection("music").where("featured", "==", true);
  const snapshot = await musicRef.get();

  const music: MusicItemType[] = [];
  snapshot.forEach((doc) => music.push(mapDocument<MusicItemType>(doc)));

  return music;
};

/**
 * Create a new music item in the database.
 *
 * @param {MusicItemType} item - Music item data to create
 * @returns {Promise<MusicItemType>} - The newly created music item
 * @throws {Error} - If creation fails
 */
export const createOne = async (
  item: MusicItemType
): Promise<MusicItemType | null> => {
  const musicRef = db.collection("music");

  // save to database
  const docRef = await musicRef.add(item);

  // fetch the created document and map it
  const snapshot = await docRef.get();
  const createdItem = mapDocument<MusicItemType>(snapshot);

  if (!createdItem) throw new Error("Failed to create music item");

  // return the newly created item
  return createdItem;
};
