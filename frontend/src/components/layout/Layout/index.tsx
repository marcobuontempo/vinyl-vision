/**
 * Layout Component.
 *
 * A reusable layout wrapper for pages that includes the Header, Footer,
 * and an Outlet for nested routes. Provides consistent page structure.
 *
 */

// NPM IMPORTS
import { Outlet } from "react-router-dom";
// LOCAL IMPORTS
import Footer from "../Footer";
import Header from "../Header";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Renders the main layout structure including header, main content, and footer.
 *
 * @returns Wrapper element representing the page layout.
 */
const Layout = () => {
  return (
    <div className={styles.layout} role="document">
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
