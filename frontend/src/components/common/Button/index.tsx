import type { ButtonHTMLAttributes } from "react";
import * as styles from "./styles.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {};

const Button = ({ ...props }: Props) => {
  const combinedClassName = props.className
    ? `${props.className} ${styles.button}`
    : styles.button;

  return (
    <button {...props} className={combinedClassName}>
      {props.children}
    </button>
  );
};

export default Button;
