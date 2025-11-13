/**
 * MusicCard Component.
 *
 * Displays a single music item with artwork, metadata, description,
 * genre, release date, and length. Includes functionality to view
 * more details and to add the item directly to the shopping cart.
 *
 */

// TYPES IMPORTS
import type { MusicItemType } from "@my/shared";
// NPM IMPORTS
import { Link } from "react-router-dom";
// LOCAL IMPORTS
import { useCart } from "../../../contexts/CartContext";
import Button from "../../common/Button";
import {
  formatCentsToCurrency,
  formatSecondsToHHMMSS,
} from "../../../utils/helpers";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";

// COMPONENT PROPS
type Props = {
  data: MusicItemType;
  className?: string;
};

/**
 * Renders a card for a single music item, including:
 * - Title, artist, and artwork
 * - OnHover: Description, genre, release date, and length
 * - Expandable link to a detailed view
 * - Price and "Add to Cart" button
 *
 * @param props - Accepts a `data` object (`MusicItemType`) and optional `className`.
 *
 * @returns A styled `article` element displaying a music item and cart actions.
 *
 * @note The "Add" (to cart) button is disabled if the item is already in the cart.
 */
const MusicCard = ({ data, className }: Props) => {
  // Utilise CartContext
  const { cart, addToCart } = useCart();
  // Flag to determine when to show placeholder image
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Combine any passed-in classNames
  const combinedClassName = className
    ? `${className} ${styles.card}`
    : styles.card;

  return (
    <article className={combinedClassName} aria-labelledby={`title-${data.id}`}>
      <header className={styles.header}>
        <h2 id={`title-${data.id}`} className={styles.text}>
          {data.title}
        </h2>
        <h3 className={styles.artist}>{data.artist}</h3>

        {data.featured && (
          <FaStar className={styles.featured} title="featured item" />
        )}
      </header>

      {!isImageLoaded && (
        <img
          src="/favicon/android-chrome-512x512.png"
          alt={"Placeholder artwork image"}
          className={styles.placeholder}
        />
      )}
      <img
        src={data.artwork}
        alt={`Artwork for ${data.title} by ${data.artist}`}
        className={styles.artwork}
        onLoad={() => setIsImageLoaded(true)}
      />

      <div className={styles.details} role="complementary">
        <p className={styles.detail}>{data.description}</p>
        <p className={styles.detail}>{data.genre}</p>
        <p className={styles.detail}>{data.release_date}</p>
        <p className={styles.detail}>{formatSecondsToHHMMSS(data.length)}</p>
        <div className={styles.expandContainer}>
          <Link
            to={`/music/${data.id}`}
            className={styles.expand}
            aria-label={`View full details for ${data.title}`}
          >
            + expand details
          </Link>
        </div>
      </div>

      <footer className={styles.footer}>
        <div>
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
          {cart[data.id] ? "IN CART" : "ADD"}
        </Button>
      </footer>
    </article>
  );
};

export default MusicCard;
