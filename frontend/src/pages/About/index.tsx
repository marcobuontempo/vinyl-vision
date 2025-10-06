/**
 * About (Page) Component.
 *
 * A static page component that presents information about Vinyl Vision.
 * - Displays the page heading and descriptive paragraphs about the platform.
 * - Includes a vinyl icon for visual branding.
 *
 */

// NPM IMPORTS
import { PiVinylRecordDuotone } from "react-icons/pi";
// LOCAL IMPORTS
import Heading1 from "../../components/common/Heading1";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Renders the About page content.
 *
 * @returns element representing the About page content.
 */
const About = () => {
  return (
    <article>
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

        <PiVinylRecordDuotone
          className={styles.vinyl}
          aria-hidden="true"
          role="presentation"
        />
      </div>
    </article>
  );
};

export default About;
