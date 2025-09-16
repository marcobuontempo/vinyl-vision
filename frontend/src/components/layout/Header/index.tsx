import { NavLink } from "react-router-dom";
import * as styles from "./styles.css";

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/music"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Music
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <span className={styles.logo}>Vinyl Vision</span>

        <ul className={styles.list}>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Register
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? styles.active : styles.inactive
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
