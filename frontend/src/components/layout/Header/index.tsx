import { NavLink } from "react-router-dom";
import * as styles from "./styles.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useCart } from "../../../contexts/CartContext";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

type Props = {};

const Header = ({}: Props) => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* LOGO MOBILE */}
        <div className={styles.logoMobile}>
          <NavLink to="/">Vinyl Vision</NavLink>
        </div>

        {/* Burger Icon */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* MENU ITEMS */}
        <div
          className={`${styles.navGroup} ${
            menuOpen ? styles.navGroupOpen : ""
          }`}
        >
          {/* NAV ITEMS (1) */}
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

          {/* LOGO DESKTOP */}
          <div className={styles.logo}>
            <NavLink to="/">Vinyl Vision</NavLink>
          </div>

          {/* NAV ITEMS (2) */}
          <ul className={styles.list}>
            {user?.isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? styles.activeAdmin : styles.inactiveAdmin
                  }
                >
                  Admin
                </NavLink>
              </li>
            )}
            {user ? (
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.inactive
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <>
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
              </>
            )}
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? styles.activeCart : styles.inactiveCart
                }
              >
                <FaCartShopping />
                <span className={styles.cartCount}>
                  {Object.keys(cart).length}
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
