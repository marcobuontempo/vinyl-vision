import type { ButtonHTMLAttributes } from "react";
import * as styles from "./styles.css";
import { ScaleLoader } from "react-spinners";
import { vars } from "../../../styles/themes.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  theme?: "primary" | "secondary" | "accent" | "danger";
  isPending?: boolean;
};

// Map each theme to a specific style
const themeStyles = {
  primary: styles.primary,
  secondary: styles.secondary,
  accent: styles.accent,
  danger: styles.danger,
};

const Button = ({ theme = "primary", isPending = false, ...props }: Props) => {
  // Combine the passed in the class
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
