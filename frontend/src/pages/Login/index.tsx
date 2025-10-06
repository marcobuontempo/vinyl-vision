/**
 * Login (Page) Component.
 *
 * Provides a form for users to log in with email and password.
 * - Handles form state and input validation.
 * - Submits login request via TanStack mutation.
 * - Saves returned token/user in AuthContext on success.
 * - Redirects to home page after successful login.
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
import { postLogin } from "../../api/auth";
import { useAuth } from "../../contexts/AuthContext";
// STYLES IMPORTS
import * as styles from "./styles.css";

// FORM INPUTS TYPES
type FormValues = {
  email: string;
  password: string;
};

/**
 * Renders the Login page containing:
 * - Email and password input fields
 * - Submit button with loading/pending state
 * - Error handling and display
 * - Link to registration page
 *
 * @returns Element for the login page.
 */
const Login = () => {
  // Utilise Auth Context
  const { loginSaveUser } = useAuth();

  // To navigate after login
  const navigate = useNavigate();

  // TanStack Query mutation to submit login request
  const mutation = useMutation({
    mutationFn: postLogin,
    onSuccess: (data) => {
      // Save token + user in AuthContext
      loginSaveUser(data);
      navigate("/");
    },
  });

  // Form values
  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
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
    <section className={styles.login}>
      <Form onSubmit={handleSubmit}>
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
          value={values.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          isPending={mutation.isPending}
          disabled={Object.values(values).some((v) => v === "")}
          aria-label={
            mutation.isSuccess ? "Login successful" : "Log in to account"
          }
        >
          {(mutation.isIdle || mutation.isError) && "Login"}
          {mutation.isSuccess && "Success!"}
        </Button>

        {mutation.isError && (
          <ErrorText>{(mutation.error as Error).message}</ErrorText>
        )}
      </Form>

      <p className={styles.info} role="complementary">
        Don't have an account yet?{" "}
        <Link
          to="/register"
          className={styles.link}
          aria-label="Go to registration page"
        >
          Register here
        </Link>
      </p>
    </section>
  );
};

export default Login;
