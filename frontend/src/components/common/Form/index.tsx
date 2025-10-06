/**
 * Form Component.
 *
 * A wrapper around the native <form> element that applies
 * consistent styling across the application.
 *
 */

// TYPES IMPORTS
import type { FormHTMLAttributes, PropsWithChildren } from "react";
// STYLES IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> & {};

/**
 * Renders a styled `<form>` element.
 *
 * @param props - Inherits all native form attributes (e.g., `onSubmit`, `method`, `action`)
 *                and allows `children` (form fields, buttons, etc.).
 *
 * @returns A `<form>` element with its passed in `children`.
 */
const Form = ({ ...props }: Props) => {
  // Combine any passed-in classNames
  const combinedClassName = props.className
    ? `${props.className} ${styles.form}`
    : styles.form;

  return (
    <form {...props} className={combinedClassName} role="form">
      {props.children}
    </form>
  );
};

export default Form;
