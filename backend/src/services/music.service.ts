import type { MusicItemType } from "../../../shared/types/music.js";
import { db, mapDocument } from "../utilities/database.util.js";

export const findAllMusic = async (): Promise<MusicItemType[]> => {
  const musicRef = db.collection("music");

  const snapshot = await musicRef.get();

  const music: MusicItemType[] = [];

  snapshot.forEach((doc) => music.push(mapDocument<MusicItemType>(doc)));

  return music;
};
