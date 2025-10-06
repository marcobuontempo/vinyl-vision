/**
 * Cart (Page) Component.
 *
 * Displays the current items in the user's shopping cart.
 * - Shows each cart item using the CartItem component.
 * - Calculates and displays the total price.
 * - Allows clearing the cart or simulating a checkout action.
 *
 */

// LOCAL IMPORTS
import Button from "../../components/common/Button";
import Heading1 from "../../components/common/Heading1";
import CartItem from "../../components/features/CartItem";
import { useCart } from "../../contexts/CartContext";
import { formatCentsToCurrency } from "../../utils/helpers";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Cart page component showing all items currently in the cart.
 *
 * @returns element representing the cart page, including list of items,
 * total price, and action buttons.
 */
const Cart = () => {
  // Utilise Cart Context
  const { cart, clearCart } = useCart();

  // Alert to mock a purchase on "checkout"
  const mockPurchase = () => {
    alert("✨ Order confirmed! ✨\n(not really) :)");
    clearCart();
  };

  return (
    <section className={styles.cart} aria-labelledby="cart-title">
      <Heading1 id="cart-title" className={styles.heading}>
        Cart
      </Heading1>

      {Object.keys(cart).length === 0 ? (
        <p className={styles.empty} role="status">
          ...is empty!
        </p>
      ) : (
        <ul className={styles.list} role="list">
          {Object.values(cart).map((item) => (
            <li key={item.id}>
              <CartItem data={item} />
            </li>
          ))}
        </ul>
      )}

      <div className={styles.footer}>
        <Button
          theme="accent"
          className={styles.clear}
          onClick={clearCart}
          disabled={Object.keys(cart).length === 0}
          aria-label="Clear all items from cart"
        >
          Clear Cart
        </Button>
        <div role="status" aria-live="polite">
          <p>
            Total:{" "}
            {formatCentsToCurrency(
              Object.values(cart).reduce((pv, cv) => cv.price_aud + pv, 0)
            )}
          </p>
          <Button
            className={styles.checkout}
            onClick={mockPurchase}
            disabled={Object.keys(cart).length === 0}
            aria-label="Proceed to checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
