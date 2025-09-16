import * as styles from "./styles.css";
import LinkButton from "../../common/LinkButton";
import Heading1 from "../../common/Heading1";

type Props = {};

const Hero = ({}: Props) => {
  return (
    <section className={styles.hero}>
      <div role="group" className={styles.text}>
        <Heading1>Discover Curated Music</Heading1>
        <p className={styles.subtext}>
          Vinyl vibes, digital convenience. Download and collect instantly.
        </p>
      </div>
      <div role="group" className={styles.cta}>
        <LinkButton to="/music" className={styles.link}>
          Explore Music
        </LinkButton>
        <LinkButton to="/register" className={styles.link}>
          Sign Up
        </LinkButton>
      </div>
    </section>
  );
};

export default Hero;
