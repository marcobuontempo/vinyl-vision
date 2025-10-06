/**
 * MusicDetail (Page) Component.
 *
 * Displays detailed information for a single music item.
 * - Fetches music data by ID from the backend or uses cached data from the original TanStack "music" query.
 * - Handles loading, error, and empty states.
 * - Shows artwork, title, artist, genre, release date, track length, and price.
 * - Allows adding the item to the cart with disabled state if already in cart.
 *
 */

// TYPES IMPORTS
import type { MusicItemType } from "../../../../shared/types";
// NPM IMPORTS
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
// LOCAL IMPORTS
import Heading1 from "../../components/common/Heading1";
import Button from "../../components/common/Button";
import { useCart } from "../../contexts/CartContext";
import { getMusicById } from "../../api/music";
import { queryClient } from "../../main";
import {
  formatCentsToCurrency,
  formatSecondsToHHMMSS,
} from "../../utils/helpers";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { vars } from "../../styles/themes.css";

/**
 * Renders the detailed view of a music item including:
 * - Artwork, title, artist, genre, release date, track length, and price
 * - Add to cart functionality with disabled state if item is already in cart
 * - Loading and error states with retry functionality
 *
 * @returns Element showing a music item's detailed information.
 */
const MusicDetail = () => {
  // Get ID from URL params
  const { id } = useParams();
  // Utilise Cart Context
  const { cart, addToCart } = useCart();

  // TanStack Query to fetch music data
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["music", id],
    queryFn: () => getMusicById(id!),
    enabled: !!id, // only fetch if an id is passed (which should always be the case)
    initialData: () =>
      queryClient
        .getQueryData<MusicItemType[]>(["music"])
        ?.find((m) => m.id === id), // use the music data directly from the "music" query for instant load (if available)
    retry: 2,
  });

  // Show loading spinner while data is being fetched
  if (isPending)
    return (
      <div className={styles.stateContainer}>
        <ScaleLoader color={vars.colors.accent} height={"1rem"} />
      </div>
    );

  // Show error message if data fetch failed
  if (isError)
    return (
      <div className={styles.stateContainer}>
        <Button theme="accent" onClick={() => refetch()}>
          Fetch Failed. Retry?
        </Button>
      </div>
    );

  // Show empty state message if no data was returned
  if (!data) return <div className={styles.stateContainer}>No Data</div>;

  // Render details when data is available
  return (
    <article className={styles.detail} aria-labelledby="music-detail-heading">
      <Heading1 id="music-detail-heading" className={styles.heading}>
        Music Details
      </Heading1>
      <section className={styles.container} aria-labelledby="music-title">
        <img
          src={data.artwork}
          alt={`Artwork: ${data.title} by ${data.artist}`}
          className={styles.artwork}
        />
        <div className={styles.content}>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.information}>
            <h2 id="music-title" className={styles.title}>
              Title: {data.title}
            </h2>
            <p>Artist: {data.artist}</p>
            <p>Genre: {data.genre}</p>
            <p>Release Date: {data.release_date}</p>
            <p>Track Length: {formatSecondsToHHMMSS(data.length)}</p>
            <p className={styles.price}>
              {formatCentsToCurrency(data.price_aud)}
            </p>
          </div>
          <Button
            onClick={() => addToCart(data)}
            disabled={!!cart[data.id]}
            aria-label={
              cart[data.id]
                ? `${data.title} is already in cart`
                : `Add ${data.title} to cart`
            }
          >
            {cart[data.id] ? "IN CART" : "ADD TO CART"}
          </Button>
        </div>
      </section>
    </article>
  );
};

export default MusicDetail;
