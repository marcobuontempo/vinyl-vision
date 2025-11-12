/**
 * Admin "Delete" Component.
 *
 * Provides an admin interface to delete music items.
 * - Displays select element to choose an existing document.
 * - Displays submission state: idle, pending, success, or error.
 *
 */

// TYPES IMPORTS
import type { ChangeEvent, FormEvent } from "react";
// NPM IMPORTS
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
// LOCAL IMPORTS
import Heading1 from "../../common/Heading1";
import Form from "../../common/Form";
import Button from "../../common/Button";
import ErrorText from "../../common/ErrorText";
// STYLES IMPORTS
import * as styles from "./styles.css";
import { deleteMusicItem, getAllMusic } from "../../../api/music";

/**
 * Admin "Delete" component, that allows deleting a music item through form submission.
 *
 * @returns Element representing the Admin "delete" form.
 */
const AdminDelete = () => {
  // Form values
  const [musicId, setMusicId] = useState("");

  // Use TanStack Query hook for fetching music data
  const { data, isPending, isError } = useQuery({
    queryKey: ["music"],
    queryFn: () => {
      return getAllMusic();
    },
    retry: 2, // retry for 2 attempts on fail
  });

  // TanStack mutation for API submission
  const mutation = useMutation({
    mutationFn: deleteMusicItem,
  });

  // Input change handlers
  // Form input change handler
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setMusicId(e.target.value);
  };

  // Form submission handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(musicId);
  };

  return (
    <Form onSubmit={handleSubmit} aria-labelledby="form-title">
      <Heading1 id="form-title" className={styles.heading}>
        Delete Music Item
      </Heading1>

      <select
        className={styles.select}
        disabled={isPending || isError}
        onChange={handleChange}
        value={musicId}
        aria-label="Delete music items list"
      >
        {isPending && <option>Loading...</option>}
        {isError && <option>Error fetching data</option>}

        {!isPending && !isError && (
          <>
            <option value="" disabled>
              Select a music item
            </option>
            {data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} — {item.artist}
              </option>
            ))}
          </>
        )}
      </select>

      <Button
        type="submit"
        theme="danger"
        disabled={musicId === "" || mutation.isSuccess}
        isPending={mutation.isPending}
        aria-label={
          mutation.isSuccess ? "Item deleted successfully" : "Delete music item"
        }
      >
        {(mutation.isIdle || mutation.isError) && "Delete Item"}
        {mutation.isSuccess && "Success!"}
      </Button>
      {mutation.isError && (
        <ErrorText>{(mutation.error as Error).message}</ErrorText>
      )}
    </Form>
  );
};

export default AdminDelete;
