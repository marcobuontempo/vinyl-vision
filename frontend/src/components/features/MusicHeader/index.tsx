import Heading1 from "../../common/Heading1";
import * as styles from "./styles.css";

type Props = {};

const MusicHeader = ({}: Props) => {
  return (
    <header className={styles.header}>
      <Heading1 className={styles.title}>Music</Heading1>
      <button className={styles.filter}>Filter</button>
    </header>
  );
};

export default MusicHeader;
