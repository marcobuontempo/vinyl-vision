import * as styles from "./styles.css";
import { Link, type LinkProps } from "react-router-dom";

type Props = LinkProps & {
  theme?: "primary" | "secondary" | "accent" | "danger";
};

// Map each theme to a specific style
const themeStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  danger: styles.danger,
};

const LinkButton = ({ theme = "primary", ...props }: Props) => {
  // Combine the passed in the class
  const combinedClassName = props.className
    ? `${props.className} ${themeStyles[theme]}`
    : themeStyles[theme];

  return <Link {...props} className={combinedClassName} />;
};

export default LinkButton;
