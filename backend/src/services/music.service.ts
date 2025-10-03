import type {
  FilterOptions,
  MusicItemType,
  SortOptions,
} from "../../../shared/types/music.js";
import { db, mapDocument } from "../utilities/database.util.js";

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

export const findOneMusicById = async (
  id: string
): Promise<MusicItemType | null> => {
  const music = await db.collection("music").doc(id).get();
  return mapDocument<MusicItemType>(music);
};

export const findMusicFeatured = async (): Promise<MusicItemType[] | null> => {
  const musicRef = db.collection("music").where("featured", "==", true);
  const snapshot = await musicRef.get();

  const music: MusicItemType[] = [];
  snapshot.forEach((doc) => music.push(mapDocument<MusicItemType>(doc)));

  return music;
};

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
