import { Link } from "react-router-dom";
import * as styles from "./styles.css";

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
      <Link to="/">Go to Home</Link>
    </section>
  );
};

export default ErrorDisplay;
