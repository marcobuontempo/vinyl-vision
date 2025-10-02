import type { MusicItemType } from "../../../../../shared/types";
import { useCart } from "../../../contexts/CartContext";
import { convertPriceToCurrency } from "../../../utils/helpers";
import Button from "../../common/Button";
import * as styles from "./styles.css";

type Props = {
  data: MusicItemType;
};

const CartItem = ({ data }: Props) => {
  const { removeFromCart } = useCart();

  return (
    <div className={styles.item}>
      <img className={styles.artwork} src={data.artwork} alt={data.title} />
      <p className={styles.info}>{data.title}</p>
      <p className={styles.info}>{data.artist}</p>
      <p>{convertPriceToCurrency(data.price_aud)}</p>
      <Button onClick={() => removeFromCart(data.id)}>Remove</Button>
    </div>
  );
};

export default CartItem;
