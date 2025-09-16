import type { FormHTMLAttributes, PropsWithChildren } from "react";
import * as styles from "./styles.css";

type Props = PropsWithChildren<FormHTMLAttributes<HTMLFormElement>> & {};

const Form = ({ ...props }: Props) => {
  const combinedClassName = props.className
    ? `${props.className} ${styles.form}`
    : styles.form;

  return (
    <form {...props} className={combinedClassName}>
      {props.children}
    </form>
  );
};

export default Form;
