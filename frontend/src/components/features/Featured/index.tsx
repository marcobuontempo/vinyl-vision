/**
 * Featured Component.
 *
 * Displays a section of "Featured Music" items, fetched from the backend.
 * Handles and renders different states:
 * - Loading state with a spinner
 * - Error state with a user-friendly error message
 * - Empty state when no data is available
 * - Success state showing a list of `MusicCard` components
 *
 */

// NPM IMPORTS
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
// LOCAL IMPORTS
import MusicCard from "../MusicCard";
import ErrorText from "../../common/ErrorText";
import { getFeaturedMusic } from "../../../api/music";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { vars } from "../../../styles/themes.css";

/**
 * Fetches and renders a list of featured music items.
 *
 * @returns A section element containing a title and a list of featured music cards.
 * Displays appropriate UI for loading, error, and empty states.
 *
 * @note Uses TanStack Query's `useQuery` for caching and retrying failed requests.
 */
const Featured = () => {
  // Use TanStack Query hook for fetching featured music data
  const { data, isPending, isError } = useQuery({
    queryKey: ["music", "featured"],
    queryFn: getFeaturedMusic,
    retry: 2, // attempt retry on failed requests twice
  });

  // Show loading spinner while data is being fetched
  if (isPending)
    return (
      <section className={styles.stateContainer} aria-busy="true">
        <ScaleLoader
          color={vars.colors.accent}
          height={"1rem"}
          aria-label="Loading featured music"
        />
      </section>
    );

  // Show error message if data fetch failed
  if (isError)
    return (
      <section className={styles.stateContainer} role="alert">
        <ErrorText>Error Fetching "Featured Music"</ErrorText>
      </section>
    );

  // Show empty state message if no data was returned
  if (!data)
    return (
      <section className={styles.stateContainer} role="status">
        <p>No "Featured Music" Data</p>
      </section>
    );

  // Render featured music list when data is available
  return (
    <section className={styles.featured} aria-labelledby="featured-title">
      <h2 id="featured-title" className={styles.title}>
        Featured Music
      </h2>
      <ul className={styles.list} role="list">
        {data.map((data) => (
          <li key={data.id}>
            <MusicCard data={data} className={styles.item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Featured;
