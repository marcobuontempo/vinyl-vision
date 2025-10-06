/**
 * Button Component.
 *
 * A reusable styled button component with support for multiple themes and
 * a pending/loading state. Extends native HTML button attributes.
 *
 */

// TYPES IMPORTS
import type { ButtonHTMLAttributes } from "react";
// NPM IMPORTS
import { ScaleLoader } from "react-spinners";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { vars } from "../../../styles/themes.css";

// COMPONENT PROPS
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "primary" | "secondary" | "accent" | "danger";
  isPending?: boolean;
};

// Map each theme option to a specific CSS class.
const themeStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  danger: styles.danger,
};

/**
 * Renders a styled button with optional loading state.
 *
 * @param props - Native button attributes plus `theme` and `isPending`.
 * @returns A `<button>` element styled according to the theme,
 *          showing a spinner if pending, otherwise showing children.
 */
const Button = ({ theme = "primary", isPending = false, ...props }: Props) => {
  // Combine any passed-in className with the selected theme style
  const combinedClassName = props.className
    ? `${props.className} ${themeStyles[theme]}`
    : themeStyles[theme];

  return (
    <button
      {...props}
      className={combinedClassName}
      disabled={isPending || props.disabled}
    >
      {isPending ? (
        <ScaleLoader color={vars.colors.accent} height={"0.8rem"} />
      ) : (
        <>{props.children}</>
      )}
    </button>
  );
};

export default Button;
