import * as styles from "./styles.css";

import type { MusicItemType } from "../../../../../shared/types";

type Props = {
  data: MusicItemType;
};

const MusicCard = ({ data }: Props) => {
  return (
    <div className={styles.card}>
      <div role="group" className={styles.header}>
        <h2 className={styles.title}>{data.title}</h2>
        <h3 className={styles.title}>{data.artist}</h3>
      </div>
      <img src={data.artwork} alt={data.title} className={styles.artwork} />
      <div className={styles.details}>
        <p>{data.description}</p>
        <p>{data.genre}</p>
      </div>
      <div className={styles.footer}>
        <p>
          {(data.price / 100).toLocaleString("en-AU", {
            style: "currency",
            currency: "AUD",
          })}
        </p>
        <button className={styles.buy}>BUY</button>
      </div>
    </div>
  );
};

export default MusicCard;
