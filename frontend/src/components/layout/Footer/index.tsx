/**
 * Footer Component.
 *
 * Renders a consistent footer section for the website.
 *
 */

// STYLES IMPORTS
import { FaGithub } from "react-icons/fa6";
import * as styles from "./styles.css";

/**
 * Renders the website footer with copyright information and GitHub source code link.
 *
 * @returns `footer` element representing the footer section.
 */
const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <span className={styles.copyright}>&copy; Vinyl Vision</span>
      <a
        className={styles.github}
        href="https://github.com/marcobuontempo/vinyl-vision"
        referrerPolicy="no-referrer"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source code on GitHub"
      >
        <FaGithub aria-hidden="true" />
      </a>
    </footer>
  );
};

export default Footer;
