/**
 * Heading1 Component.
 *
 * A styled <h1> element for consistent main headings across the application.
 *
 */

// TYPES IMPORTS
import type { ComponentPropsWithoutRef } from "react";
// STYLES IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = ComponentPropsWithoutRef<"h1"> & {};

/**
 * Renders a styled `<h1>` element.
 *
 * @param props - All standard `<h1>` attributes, including `children`.
 *
 * @returns A `<h1>` element.
 */
const Heading1 = ({ ...props }: Props) => {
  // Combine any passed-in classNames
  const combinedClassName = props.className
    ? `${props.className} ${styles.h1}`
    : styles.h1;

  return (
    <h1 {...props} className={combinedClassName}>
      {props.children}
    </h1>
  );
};

export default Heading1;
