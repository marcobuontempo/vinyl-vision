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
      <div role="group">
        <h1 className={styles.number}>Error {number}</h1>
        <h2>{message}</h2>
      </div>
      <p>{information}</p>
      <LinkButton className={styles.button} to="/">Go to Home</LinkButton>
    </section>
  );
};

export default ErrorDisplay;
