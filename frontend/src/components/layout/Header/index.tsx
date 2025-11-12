/**
 * Header Component.
 *
 * Renders a consistent website header component with navigation links, logo, and user/cart actions.
 * Supports responsive design with mobile burger menu toggle and dynamic links based on
 * authentication/admin status. Displays cart icon with item count.
 *
 */

// NPM IMPORTS
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
// LOCAL IMPORTS
import { useAuth } from "../../../contexts/AuthContext";
import { useCart } from "../../../contexts/CartContext";
import logoImg from "../../../assets/logo.png";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Renders the website header including navigation, logo, authentication links, and cart.
 *
 * @returns `header` element representing the header with responsive nav menu and dynamic links.
 */
const Header = () => {
  // Utilise Auth Context
  const { user } = useAuth();
  // Utilise Cart Context
  const { cart } = useCart();
  // State whether the menu is expanded/closed (for mobile nav)
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header} role="banner">
      <nav className={styles.nav} aria-label="Main navigation">
        {/* LOGO MOBILE */}
        <div>
          <NavLink to="/" aria-label="Vinyl Vision home">
            <img className={styles.logoMobile} src={logoImg} alt="Vinyl Vision logo" />
          </NavLink>
        </div>

        {/* Burger Icon */}
        <button
          className={styles.burger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? (
            <FaTimes aria-hidden="true" />
          ) : (
            <FaBars aria-hidden="true" />
          )}
        </button>

        {/* MENU ITEMS */}
        <div
          id="main-menu"
          className={`${styles.navGroup} ${
            menuOpen ? styles.navGroupOpen : ""
          }`}
        >
          {/* NAV ITEMS (1) */}
          <ul className={styles.list} role="menubar">
            <li role="none">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inactive
                }
                role="menuitem"
              >
                Home
              </NavLink>
            </li>
            <li role="none">
              <NavLink
                to="/music"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inactive
                }
                role="menuitem"
              >
                Music
              </NavLink>
            </li>
            <li role="none">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.inactive
                }
                role="menuitem"
              >
                About
              </NavLink>
            </li>
          </ul>

          {/* LOGO DESKTOP */}
          <div>
            <NavLink to="/" aria-label="Vinyl Vision home">
              <img
                className={styles.logo}
                src={logoImg}
                alt="Vinyl Vision logo"
              />
            </NavLink>
          </div>

          {/* NAV ITEMS (2) */}
          <ul className={styles.list} role="menubar">
            {user?.isAdmin && (
              <li role="none">
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    isActive ? styles.activeAdmin : styles.inactiveAdmin
                  }
                  role="menuitem"
                >
                  Admin
                </NavLink>
              </li>
            )}
            {user ? (
              <li role="none">
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? styles.active : styles.inactive
                  }
                  role="menuitem"
                >
                  Dashboard
                </NavLink>
              </li>
            ) : (
              <>
                <li role="none">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.inactive
                    }
                    role="menuitem"
                  >
                    Login
                  </NavLink>
                </li>
                <li role="none">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.inactive
                    }
                    role="menuitem"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
            <li role="none">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? styles.activeCart : styles.inactiveCart
                }
                role="menuitem"
                aria-label={`Shopping cart with ${
                  Object.keys(cart).length
                } items`}
              >
                <FaCartShopping aria-hidden="true" />
                <span className={styles.cartCount} aria-hidden="true">
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
