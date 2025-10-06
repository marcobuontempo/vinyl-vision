/**
 * Register (Page) Component.
 *
 * Provides a user registration form with inputs for full name, email, password,
 * and password confirmation. Handles validation, API submission, and automatically
 * logs in the user on successful registration.
 *
 */

// TYPES IMPORTS
import type { ChangeEvent, FormEvent } from "react";
// NPM IMPORTS
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
// LOCAL IMPORTS
import Form from "../../components/common/Form";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ErrorText from "../../components/common/ErrorText";
import { useAuth } from "../../contexts/AuthContext";
import { postRegister } from "../../api/auth";
// STYLES IMPORTS
import * as styles from "./styles.css";

// FORM INPUT TYPES
type FormValues = {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
};

/**
 * Renders the registration form with validation and mutation handling.
 *
 * @returns Element for user registration.
 */
const Register = () => {
  // Utilise Auth Context
  const { loginSaveUser } = useAuth();

  // Navigate after registration
  const navigate = useNavigate();

  // TanStack Query mutation to submit registration details to API
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

  // Form Values
  const [values, setValues] = useState<FormValues>({
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  // Handler for input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  return (
    <section className={styles.register}>
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

      <p className={styles.info} role="complementary">
        Already have an account?{" "}
        <Link to="/login" className={styles.link} aria-label="Go to login page">
          Login here
        </Link>
      </p>
    </section>
  );
};

export default Register;
