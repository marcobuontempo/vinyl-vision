import { useState, type ChangeEvent, type FormEvent } from "react";
import Form from "../../components/common/Form";
import Heading1 from "../../components/common/Heading1";
import Input from "../../components/common/Input";
import * as styles from "./styles.css";

type Props = {};

const Login = ({}: Props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <>
      <Heading1 className={styles.title}>Login</Heading1>
      <div className={styles.login}>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
          />

          <button>Submit</button>
        </Form>
      </div>
    </>
  );
};

export default Login;
