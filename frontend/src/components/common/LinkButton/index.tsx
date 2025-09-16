import * as styles from "./styles.css";
import { Link, type LinkProps } from "react-router-dom";

type Props = LinkProps & {};

const LinkButton = ({ ...props }: Props) => {
  const combinedClassName = props.className
    ? `${props.className} ${styles.base}`
    : styles.base;

  return <Link {...props} className={combinedClassName} />;
};

export default LinkButton;
