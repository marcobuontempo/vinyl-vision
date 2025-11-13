/**
 * MusicList Component.
 *
 * Fetches and displays a list of music items as MusicCards.
 * - Fetches data from the backend using filter and sort options from URL search parameters.
 * - Handles loading, error, and empty states.
 * - Supports retrying fetch on error.
 *
 */

// TYPES IMPORTS
import type { FilterOptions, SortOptions } from "@my/shared";
// NPM IMPORTS
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
// LOCAL IMPORTS
import { getAllMusic } from "../../../api/music";
import MusicCard from "../MusicCard";
import Button from "../../common/Button";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { vars } from "../../../styles/themes.css";

/**
 * Renders a list of music items based on filters and sorting from URL params.
 *
 * @returns `MusicList` component representing the music list or appropriate state messages.
 */
const MusicList = () => {
  // URL search parameters for filtering and sorting. Enforce undefined to avoid "falsy" values, such as empty strings
  const [searchParams] = useSearchParams();
  const sortBy =
    (searchParams.get("sortBy") as SortOptions["sortBy"]) || undefined;
  const order =
    (searchParams.get("order") as SortOptions["order"]) || undefined;
  const title =
    (searchParams.get("title") as FilterOptions["title"]) || undefined;
  const artist =
    (searchParams.get("artist") as FilterOptions["artist"]) || undefined;
  const genre =
    (searchParams.get("genre") as FilterOptions["genre"]) || undefined;
  const featured =
    (searchParams.get("featured") as FilterOptions["featured"]) || undefined;

  // Use TanStack Query hook for fetching music data
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["music", sortBy, order, title, artist, genre, featured],
    queryFn: () => {
      return getAllMusic(sortBy, order, { title, artist, genre, featured });
    },
    retry: 2, // retry for 2 attempts on fail
  });

  // Show loading spinner while data is being fetched
  if (isPending)
    return (
      <div className={styles.stateContainer} aria-busy="true">
        <ScaleLoader
          color={vars.colors.accent}
          height={"1rem"}
          aria-label="Loading music list"
        />
      </div>
    );

  // Show error message if data fetch failed
  if (isError)
    return (
      <div className={styles.stateContainer} role="alert">
        <Button
          theme="accent"
          onClick={() => refetch()}
          aria-label="Retry loading music list"
        >
          Fetch Failed. Retry?
        </Button>
      </div>
    );

  // Show empty state message if no data was returned
  if (!data)
    return (
      <div className={styles.stateContainer} role="status">
        No Data
      </div>
    );

  // Render music list when data is available
  return (
    <section aria-label="Music collection">
      <ul className={styles.musicList}>
        {data.map((music) => (
          <li key={music.id}>
            <MusicCard data={music} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MusicList;
