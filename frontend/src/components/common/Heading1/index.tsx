import type { ComponentPropsWithoutRef } from "react";
import * as styles from "./styles.css";

type Props = ComponentPropsWithoutRef<"h1"> & {};

const Heading1 = ({ children, ...props }: Props) => {
  const combinedClassName = props.className
    ? `${props.className} ${styles.h1}`
    : styles.h1;

  return (
    <h1 {...props} className={combinedClassName}>
      {children}
    </h1>
  );
};

export default Heading1;
