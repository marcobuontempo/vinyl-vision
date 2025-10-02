import { NavLink } from "react-router-dom";
import * as styles from "./styles.css";
import { useAuth } from "../../../contexts/AuthContext";
import { useCart } from "../../../contexts/CartContext";
import { FaCartShopping } from "react-icons/fa6";

type Props = {};

const Header = ({}: Props) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

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
              <span onClick={logout} className={styles.inactive}>
                Logout
              </span>
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
      </nav>
    </header>
  );
};

export default Header;
