export type MusicItemType = {
  id: string;
  title: string;
  artist: string;
  description: string;
  artwork: string;
  genre: string;
  release_date: string;
  length: number;
  price_aud: number;
};

export type SortOptions = {
  sortBy: keyof MusicItemType;
  order: "asc" | "desc";
};

export type FilterOptions = {
  title?: string;
  artist?: string;
  genre?: string;
};
