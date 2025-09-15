import { Link } from "react-router-dom";
import * as styles from "./styles.css";

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.navItem}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/music">Music</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <h1>Vinyl Vision</h1>

        <ul className={styles.navItem}>
          <li>Account</li>
          <li>Cart</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
