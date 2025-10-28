/**
 * NotFound (Page) Component.
 *
 * Displays a 404 error page using the ErrorDisplay component.
 * - Shows error number, message, and additional information.
 *
 */

// LOCAL IMPORTS
import ErrorDisplay from "../../components/features/ErrorDisplay";

/**
 * Renders a 404 "Not Found" page.
 *
 * @returns Element displaying a standardised error message.
 */
const NotFound = () => {
  console.log("Invalid page route.");
  return (
    <ErrorDisplay
      number={404}
      message="Not Found"
      information="Could not find the specified page"
    />
  );
};

export default NotFound;
