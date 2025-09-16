import { useId, type InputHTMLAttributes } from "react";
import * as styles from "./styles.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  type: HTMLInputElement["type"];
};

const Input = ({ label, id, name, type, ...props }: Props) => {
  const generatedId = useId();
  const inputId = id ?? `${name}-${generatedId}`;

  const combinedClassName = props.className
    ? `${props.className} ${styles.group}`
    : styles.group;

  return (
    <div className={combinedClassName}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        {...props}
        id={inputId}
        name={name}
        type={type}
        className={styles.input}
      />
    </div>
  );
};

export default Input;
