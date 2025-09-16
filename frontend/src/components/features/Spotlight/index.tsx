import * as styles from "./styles.css";

type Props = {};

const Spotlight = ({}: Props) => {
  return (
    <section className={styles.spotlight}>
      <h2 className={styles.title}>Spotlight</h2>
      <div className={styles.list}>
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className={styles.item}>
            Placeholder {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
