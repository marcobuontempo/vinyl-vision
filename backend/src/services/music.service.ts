import type {
  MusicItemType,
  SortOptions,
} from "../../../shared/types/music.js";
import { db, mapDocument } from "../utilities/database.util.js";

export const findAllMusic = async (
  field: SortOptions["sortBy"] = "release_date",
  direction: SortOptions["order"] = "asc"
): Promise<MusicItemType[]> => {
  const musicRef = db.collection("music").orderBy(field, direction);
  const snapshot = await musicRef.get();

  const music: MusicItemType[] = [];
  snapshot.forEach((doc) => music.push(mapDocument<MusicItemType>(doc)));

  return music;
};

export const findOneMusicById = async (
  id: string
): Promise<MusicItemType | null> => {
  const music = await db.collection("music").doc(id).get();
  return mapDocument<MusicItemType>(music);
};
