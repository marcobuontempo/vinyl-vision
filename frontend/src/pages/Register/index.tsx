import { useState, type ChangeEvent, type FormEvent } from "react";
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import * as styles from "./styles.css";
import Button from "../../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "../../api/auth";
import ErrorText from "../../components/common/ErrorText";

type FormValues = {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
};

type Props = {};

const Register = ({}: Props) => {
  const { loginSaveUser } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      if (values.password !== values.confirmpassword) {
        throw new Error("Passwords do not match");
      }
      const { confirmpassword, ...userDetails } = values;
      return postRegister(userDetails);
    },
    onSuccess: (data) => {
      // Save token + user in AuthContext
      loginSaveUser(data);
      navigate("/");
    },
  });

  const [values, setValues] = useState<FormValues>({
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
    mutation.mutate(values);
  };

  return (
    <div className={styles.register}>
      <Form onSubmit={handleSubmit}>
        <Input
          label="Full Name"
          name="fullname"
          type="text"
          autoComplete="name"
          minLength={3}
          maxLength={50}
          value={values.fullname}
          onChange={handleChange}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={32}
          value={values.password}
          onChange={handleChange}
          required
        />
        <Input
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          value={values.confirmpassword}
          onChange={handleChange}
          required
        />

        <Button
          isPending={mutation.isPending}
          disabled={Object.values(values).some((v) => v === "")}
        >
          {(mutation.isIdle || mutation.isError) && "Register"}
          {mutation.isSuccess && "Success!"}
        </Button>

        {mutation.isError && (
          <ErrorText>{(mutation.error as Error).message}</ErrorText>
        )}
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
