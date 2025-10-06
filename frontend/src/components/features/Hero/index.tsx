/**
 * Hero Component.
 *
 * A prominent landing section introducing the application with a headline,
 * subtext, and call-to-action buttons.
 *
 */

// LOCAL IMPORTS
import LinkButton from "../../common/LinkButton";
import Heading1 from "../../common/Heading1";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Renders the main hero section with a title, descriptive tagline,
 * and call-to-action buttons.
 *
 * @returns A styled hero section element.
 */
const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div role="group" className={styles.text}>
        <Heading1 id="hero-title">Discover Curated Music</Heading1>
        <p className={styles.subtext}>
          Vinyl vibes, digital convenience. Download and collect instantly.
        </p>
      </div>
      <nav className={styles.cta} aria-label="Main calls-to-action">
        <LinkButton
          to="/music"
          className={styles.link}
          aria-label="Browser our music collection"
        >
          Explore Music
        </LinkButton>
        <LinkButton
          to="/register"
          className={styles.link}
          aria-label="Create an account"
        >
          Sign Up
        </LinkButton>
      </nav>
    </section>
  );
};

export default Hero;
