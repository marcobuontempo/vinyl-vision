import { useState, type ChangeEvent, type FormEvent } from "react";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import * as styles from "./styles.css";
import Button from "../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
import { ScaleLoader } from "react-spinners";

type FormValues = {
  email: string;
  password: string;
};

type Props = {};

const Login = ({}: Props) => {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // Save token + user in AuthContext
      loginSaveUser(data);
      navigate("/");
    },
  });

  const [values, setValues] = useState<FormValues>({
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
    mutation.mutate(values);
  };

  return (
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

        <Button disabled={Object.values(values).some((v) => v === "")}>
          {(mutation.isIdle || mutation.isError) && "Login"}
          {mutation.isSuccess && "Success!"}
          {mutation.isPending && <ScaleLoader color="#FFF" height={"0.8rem"} />}
        </Button>

        {mutation.isError && (
          <p className={styles.error}>{(mutation.error as Error).message}</p>
        )}
      </Form>

      <p className={styles.info}>
        Don't have an account yet?{" "}
        <Link to="/register" className={styles.link}>
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
