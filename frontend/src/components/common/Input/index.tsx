/**
 * Input Component.
 *
 * A flexible input component that supports both standard text inputs
 * and textareas, with optional labels and automatic ID generation.
 *
 */

// TYPES IMPORTS
import type { InputHTMLAttributes } from "react";
// NPM IMPORTS
import { useId } from "react";
// STYLES IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label?: string;
  name: string;
  type: HTMLInputElement["type"];
};

/**
 * Renders a styled input field or textarea with optional label.
 *
 * @param props - Contains `label`, `name`, `type`, and all standard input/textarea attributes.
 *
 * @returns A `<div>` container with an optional `<label>` and either
 *          an `<input>` or `<textarea>`.
 *
 * @note Generates a unique ID for the input if none is provided, ensuring
 *       the label is correctly associated.
 */
const Input = ({ label, name, type, ...props }: Props) => {
  // Generate a unique ID based on provided "name", if no ID supplied
  const generatedId = useId();
  const inputId = props.id ?? `${name}-${generatedId}`;

  // Combine any passed-in classNames
  const combinedClassName = props.className
    ? `${props.className} ${styles.group}`
    : styles.group;

  return (
    <div className={combinedClassName}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      {type === "textarea" ? (
        <textarea
          {...props}
          id={inputId}
          name={name}
          className={styles.input}
        />
      ) : (
        <input
          {...props}
          id={inputId}
          name={name}
          type={type}
          className={styles.input}
        />
      )}
    </div>
  );
};

export default Input;
