import type { ReactNode } from "react";
import * as styles from "./styles.css";

type Props = {
  children: ReactNode;
};

const ErrorText = ({ children }: Props) => {
  return <p className={styles.error}>{children}</p>;
};

export default ErrorText;
