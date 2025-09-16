import type { FormHTMLAttributes, PropsWithChildren } from "react";
import * as styles from "./styles.css";

type Props = PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> & {};

const Form = ({ children, ...props }: Props) => {
  const combinedClassName = props.className
    ? `${props.className} ${styles.form}`
    : styles.form;

  return (
    <form {...props} className={combinedClassName}>
      {children}
    </form>
  );
};

export default Form;
