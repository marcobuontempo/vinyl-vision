import { useState, type ChangeEvent, type FormEvent } from "react";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import * as styles from "./styles.css";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

type Props = {};

const Register = ({}: Props) => {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
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
    <div className={styles.register}>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="fullname"
          type="text"
          autoComplete="name"
          value={values.fullname}
          onChange={handleChange}
        />
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
        <Input
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          value={values.confirmpassword}
          onChange={handleChange}
        />

        <Button>Register</Button>
      </Form>

      <p className={styles.info}>
        Already have an account?{" "}
        <Link to="/login" className={styles.link}>
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
