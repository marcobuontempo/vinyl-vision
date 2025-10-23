/**
 * Admin (Page) Component.
 *
 * Provides an admin interface to perform admin operations.
 *
 */

// STYLES IMPORTS
import AdminCreate from "../../components/features/AdminCreate";
import AdminDelete from "../../components/features/AdminDelete";
import * as styles from "./styles.css";

/**
 * Admin page component, that allows performing administrative actions (e.g. create "music" item).
 *
 * @returns Element representing the Admin page.
 */
const Admin = () => {
  // Render Component
  return (
    <div className={styles.admin}>
      <AdminCreate />
      <AdminDelete />
    </div>
  );
};

export default Admin;
