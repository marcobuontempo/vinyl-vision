import Heading1 from "../../components/common/Heading1";
import * as styles from "./styles.css";

type Props = {};

const About = ({}: Props) => {
  return (
    <>
      <Heading1 className={styles.heading}>About</Heading1>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          At Vinyl Vision, we believe music should feel timeless while embracing
          the ease of the digital age. Inspired by the warmth and artistry of
          vinyl, our platform brings you a curated collection of tracks that you
          can discover, download, and collect instantly.
        </p>
        <p className={styles.paragraph}>
          We focus on quality over quantity—hand-selecting music that resonates
          with soul, craft, and character. Whether you're here to expand your
          collection or stumble upon something new, Vinyl Vision blends the
          nostalgia of crate-digging with the convenience of the modern world.
        </p>
        <p className={styles.paragraph}>
          This isn't just about downloads—it's about experiencing music as
          something you own, something you return to, and something worth
          collecting.
        </p>
      </div>
    </>
  );
};

export default About;
