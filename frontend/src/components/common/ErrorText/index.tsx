/**
 * ErrorText Component.
 *
 * A styled text component for displaying error messages consistently
 * throughout the application.
 *
 */

// TYPES IMPORTS
import type { ReactNode } from "react";
// STYLE IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = {
  children: ReactNode;
};

/**
 * Renders error text in a styled paragraph element.
 *
 * @param props - Contains `children`, the error message to display.
 * @returns A `<p>` element styled with the error class.
 */
const ErrorText = ({ children }: Props) => {
  return (
    <div className={styles.error} role="alert" aria-live="polite">
      {children}
    </div>
  );
};

export default ErrorText;
