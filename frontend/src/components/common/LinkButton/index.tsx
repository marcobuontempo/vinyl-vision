/**
 * LinkButton Component.
 *
 * A styled wrapper around React Router’s <Link> component that
 * applies theme-specific styles and supports all LinkProps.
 *
 */

// TYPES IMPORTS
import type { LinkProps } from "react-router-dom";
// NPM IMPORTS
import { Link } from "react-router-dom";
// STYLES IMPORTS
import * as styles from "./styles.css";

// COMPONENT PROPS
type Props = LinkProps & {
  theme?: "primary" | "secondary" | "accent" | "danger";
};

// Map each theme option to a specific CSS class.
const themeStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  danger: styles.danger,
};

/**
 * Renders a themed `Link` component styled like a button.
 *
 * @param props - All standard `LinkProps` plus an optional `theme`.
 *
 * @returns A `react-router-dom` `<Link>` element with applied theme classes.
 *
 * @note Uses the `themeStyles` map to assign classes based on the `theme` prop.
 */
const LinkButton = ({ theme = "primary", ...props }: Props) => {
  // Combine any passed-in classNames
  const combinedClassName = props.className
    ? `${props.className} ${themeStyles[theme]}`
    : themeStyles[theme];

  return <Link {...props} className={combinedClassName} />;
};

export default LinkButton;
