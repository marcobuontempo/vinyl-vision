/**
 * Dashboard (Page) Component.
 *
 * Allows authenticated users to view and update their profile details.
 * - Displays the current user's full name and email.
 * - Supports updating full name, email, and password.
 * - Handles validation for password confirmation.
 * - Shows pending, success, and error states for updates.
 * - Provides a logout button.
 *
 */

// TYPES IMPORTS
import type { ChangeEvent, FormEvent } from "react";
// NPM IMPORTS
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
// LOCAL IMPORTS
import Button from "../../components/common/Button";
import Heading1 from "../../components/common/Heading1";
import Input from "../../components/common/Input";
import Form from "../../components/common/Form";
import ErrorText from "../../components/common/ErrorText";
import { useAuth } from "../../contexts/AuthContext";
import { putUpdateDetails } from "../../api/user";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { vars } from "../../styles/themes.css";

// FORM INPUTS TYPES
type FormValues = {
  fullname: string;
  email: string;
  newpassword: string;
  confirmnewpassword: string;
  password: string;
};

/**
 * Dashboard page for updating user profile information.
 *
 * @returns Element containing profile update form and logout button.
 */
const Dashboard = () => {
  // Utilise Auth Context
  const { user, loginSaveUser, logout } = useAuth();

  // Form values
  const [details, setDetails] = useState<FormValues>({
    fullname: "",
    email: "",
    newpassword: "",
    confirmnewpassword: "",
    password: "",
  });

  // Prefill form with current user details on mount
  useEffect(() => {
    if (user) {
      setDetails({
        ...details,
        fullname: user.fullname,
        email: user.email,
      });
    }
  }, [user]);

  // TanStack mutation to submit data to API
  const mutation = useMutation({
    mutationFn: async (details: FormValues) => {
      // ensure updated passwords match
      if (details.newpassword !== details.confirmnewpassword) {
        throw new Error("Passwords do not match");
      }
      // populate missing info (e.g. if <input> field was left blank)
      if (!details.email && user?.email) details.email = user.email;
      if (!details.fullname && user?.fullname) details.fullname = user.fullname;

      // remove the confirmpassword field (as we've already confirmed a match and isn't required for API call)
      const { confirmnewpassword, ...userDetails } = details;
      if (user) return putUpdateDetails(user.id, userDetails);
    },
    onSuccess: (data) => {
      // Save updated token + user in AuthContext
      loginSaveUser(data);
    },
  });

  // Form input change handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(details);
  };

  // Render a loader if no user details available
  if (!user) {
    return (
      <div className={styles.stateContainer} role="status">
        <ScaleLoader
          color={vars.colors.accent}
          height={"1rem"}
          aria-label="Loading dashboard"
        />
      </div>
    );
  }

  // Render component
  return (
    <div className={styles.dashboard} aria-labelledby="dashboard-title">
      <Heading1 id="dashboard-title" className={styles.heading}>
        Dashboard
      </Heading1>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <p>Update any of your profile details here.</p>
          <p>
            Note: leaving a field blank/unchanged will NOT update that specific
            value in your profile
          </p>
        </div>
        <Input
          label="Full Name"
          name="fullname"
          type="text"
          minLength={3}
          maxLength={50}
          value={details.fullname}
          onChange={handleChange}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={details.email}
          onChange={handleChange}
        />
        <Input
          label="New Password"
          name="newpassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          maxLength={32}
          value={details.newpassword}
          onChange={handleChange}
        />
        <Input
          label="Confirm New Password"
          name="confirmnewpassword"
          type="password"
          value={details.confirmnewpassword}
          onChange={handleChange}
        />
        <Input
          label="Current Password *"
          name="password"
          type="password"
          value={details.password}
          onChange={handleChange}
          required
        />
        <Button
          isPending={mutation.isPending}
          className={styles.update}
          disabled={details.password === ""}
          aria-label={
            mutation.isSuccess
              ? "Profile updated successfully"
              : "Update profile"
          }
        >
          {(mutation.isIdle || mutation.isError) && "Update Details"}
          {mutation.isSuccess && "Success!"}
        </Button>

        {mutation.isError && (
          <ErrorText>{(mutation.error as Error).message}</ErrorText>
        )}
      </Form>

      <Button
        theme="danger"
        className={styles.logout}
        onClick={logout}
        aria-label="Logout from account"
      >
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
