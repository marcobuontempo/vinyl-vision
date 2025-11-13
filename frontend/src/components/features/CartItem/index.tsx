/**
 * CartItem Component.
 *
 * Displays a single music item inside the shopping cart, showing artwork,
 * title, artist, and price, along with a button to remove the item.
 *
 */

// TYPES IMPORTS
import type { MusicItemType } from "@my/shared";
// LOCAL IMPORTS
import { useCart } from "../../../contexts/CartContext";
import { formatCentsToCurrency } from "../../../utils/helpers";
import Button from "../../common/Button";
// STYLES IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = {
  data: MusicItemType;
};

/**
 * Renders a single item in the cart, showing artwork, metadata,
 * formatted price, and a "Remove" button.
 *
 * @param props - Accepts a `data` object of type `MusicItemType`.
 *
 * @returns A styled `div` containing the cart item information and remove button.
 *
 * @note Relies on `useCart()` to access the `removeFromCart` function.
 */
const CartItem = ({ data }: Props) => {
  // Utilise CartContext
  const { removeFromCart } = useCart();

  return (
    <article className={styles.item} aria-label={`Cart item: ${data.title}`}>
      <img className={styles.artwork} src={data.artwork} alt={data.title} />
      <h3 className={`${styles.info} ${styles.title}`}>{data.title}</h3>
      <p className={styles.info}>{data.artist}</p>
      <p>{formatCentsToCurrency(data.price_aud)}</p>
      <Button
        theme="danger"
        className={styles.remove}
        onClick={() => removeFromCart(data.id)}
        aria-label={`Remove ${data.title} from cart`}
      >
        Remove
      </Button>
    </article>
  );
};

export default CartItem;
