import Button from "../../components/common/Button";
import Heading1 from "../../components/common/Heading1";
import CartItem from "../../components/features/CartItem";
import { useCart } from "../../contexts/CartContext";
import { convertPriceToCurrency } from "../../utils/helpers";
import * as styles from "./styles.css";

type Props = {};

const Cart = ({}: Props) => {
  const { cart, clearCart } = useCart();

  return (
    <div className={styles.cart}>
      <Heading1 className={styles.heading}>Cart</Heading1>

      {Object.keys(cart).length === 0 ? (
        <p className={styles.empty}>...is empty!</p>
      ) : (
        <ul className={styles.list}>
          {Object.values(cart).map((item) => (
            <li key={item.id}>
              <CartItem data={item} />
            </li>
          ))}
        </ul>
      )}

      <div className={styles.footer}>
        <Button className={styles.clear} onClick={clearCart}>
          Clear Cart
        </Button>
        <div>
          <p>
            Total:{" "}
            {convertPriceToCurrency(
              Object.values(cart).reduce((pv, cv) => cv.price_aud + pv, 0)
            )}
          </p>
          <Button className={styles.checkout}>Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
