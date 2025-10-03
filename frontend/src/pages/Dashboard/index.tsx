import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../components/common/Button";
import Heading1 from "../../components/common/Heading1";
import { useAuth } from "../../contexts/AuthContext";
import * as styles from "./styles.css";
import Input from "../../components/common/Input";
import { ScaleLoader } from "react-spinners";
import { useMutation } from "@tanstack/react-query";
import Form from "../../components/common/Form";
import { putUpdateDetails } from "../../api/user";

type FormValues = {
  fullname: string;
  email: string;
  newpassword: string;
  confirmnewpassword: string;
  password: string;
};

type Props = {};

const Dashboard = ({}: Props) => {
  const { user, loginSaveUser, logout } = useAuth();
  const [details, setDetails] = useState<FormValues>({
    fullname: "",
    email: "",
    newpassword: "",
    confirmnewpassword: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setDetails({
        ...details,
        fullname: user.fullname,
        email: user.email,
      });
    }
  }, [user]);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(details);
  };

  if (!user) {
    return (
      <div className={styles.stateContainer}>
        <ScaleLoader color="#000" height={"1rem"} />
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <Heading1 className={styles.heading}>Dashboard</Heading1>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <p>Update any of your profile details here.</p>
        <p>
          Note: leaving a field blank/unchanged will NOT update that specific
          value in your profile
        </p>
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
          name="confirnewpassword"
          type="password"
          value={details.confirmnewpassword}
          onChange={handleChange}
        />
        <Input
          label="Current Password"
          name="password"
          type="password"
          value={details.password}
          onChange={handleChange}
          required
        />
        <Button className={styles.update} disabled={details.password === ""}>
          {(mutation.isIdle || mutation.isError) && "Update Details"}
          {mutation.isSuccess && "Success!"}
          {mutation.isPending && <ScaleLoader color="#FFF" height={"0.8rem"} />}
        </Button>

        {mutation.isError && (
          <p className={styles.error}>{(mutation.error as Error).message}</p>
        )}
      </Form>

      <Button className={styles.logout} onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default Dashboard;
