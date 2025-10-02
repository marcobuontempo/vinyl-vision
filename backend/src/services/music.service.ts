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
