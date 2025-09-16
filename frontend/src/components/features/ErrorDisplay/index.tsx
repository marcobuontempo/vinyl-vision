import * as styles from "./styles.css";
import LinkButton from "../../common/LinkButton";

type Props = {
  number: number;
  message: string;
  information: string;
};

const ErrorDisplay = ({ number, message, information }: Props) => {
  return (
    <section className={styles.errorDisplay} role="alert">
      <h1>Error {number}</h1>
      <h2>{message}</h2>
      <p>{information}</p>
      <LinkButton to="/">Go to Home</LinkButton>
    </section>
  );
};

export default ErrorDisplay;
