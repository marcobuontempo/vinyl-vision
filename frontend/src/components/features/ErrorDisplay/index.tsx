/**
 * ErrorDisplay Component.
 *
 * Renders a user-friendly error message for application errors
 * (e.g., 404, 500, or custom API errors).
 *
 */

// LOCAL IMPORTS
import LinkButton from "../../common/LinkButton";
// STYLES IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = {
  number: number;
  message: string;
  information: string;
};

/**
 * Displays an error page or section with a code, message,
 * contextual information, and a link back to the home page.
 *
 * @param props - Accepts `number`, `message`, and `information`.
 *
 * @returns A styled error display section with accessible alert semantics.
 */
const ErrorDisplay = ({ number, message, information }: Props) => {
  return (
    <section className={styles.errorDisplay} role="alert">
      <div role="group" aria-labelledby="error-title error-message">
        <h1 id="error-title" className={styles.number}>
          Error {number}
        </h1>
        <h2 id="error-message">{message}</h2>
      </div>
      <p role="status">{information}</p>
      <LinkButton
        className={styles.button}
        to="/"
        aria-label="Return to homepage"
      >
        Go to Home
      </LinkButton>
    </section>
  );
};

export default ErrorDisplay;
