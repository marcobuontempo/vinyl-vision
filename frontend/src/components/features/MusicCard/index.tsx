import * as styles from "./styles.css";

import type { MusicItemType } from "../../../../../shared/types";
import Button from "../../common/Button";
import { Link } from "react-router-dom";

type Props = {
  data: MusicItemType;
  className?: string;
};

const MusicCard = ({ data, className }: Props) => {
  const combinedClassName = className
    ? `${className} ${styles.card}`
    : styles.card;

  return (
    <article className={combinedClassName}>
      <header className={styles.header}>
        <h2 className={styles.text}>{data.title}</h2>
        <h3 className={styles.text}>{data.artist}</h3>
      </header>

      <img
        src={data.artwork}
        alt={`Artwork: ${data.title} by ${data.artist}`}
        className={styles.artwork}
      />

      <aside className={styles.details}>
        <p className={styles.detail}>{data.description}</p>
        <p className={styles.detail}>{data.genre}</p>
        <p className={styles.detail}>{data.release_date}</p>
        <p className={styles.detail}>{data.length}</p>
        <p className={styles.detail}>{data.format}</p>
        <Link to={`/music/${data.id}`} className={styles.expand}>
          + expand details
        </Link>
      </aside>

      <footer className={styles.footer}>
        <p>
          {(data.price / 100).toLocaleString("en-AU", {
            style: "currency",
            currency: "AUD",
          })}
        </p>
        <Button>ADD</Button>
      </footer>
    </article>
  );
};

export default MusicCard;
