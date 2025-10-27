/**
 * Admin "Create" Component.
 *
 * Provides an admin interface to create new music items.
 * - Displays a form with fields for title, artist, description, genre, release date, artwork, length, price, and featured status.
 * - Validates form inputs before submission.
 * - Submits new music items to the backend via a mutation.
 * - Displays submission state: idle, pending, success, or error.
 *
 */

// TYPES IMPORTS
import type { MusicItemType } from "../../../../../shared/types";
import type { ChangeEvent, FormEvent } from "react";
// NPM IMPORTS
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// LOCAL IMPORTS
import Heading1 from "../../common/Heading1";
import Form from "../../common/Form";
import Input from "../../common/Input";
import Button from "../../common/Button";
import ErrorText from "../../common/ErrorText";
import { postNewMusicItem } from "../../../api/music";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Admin "Create" component, that allows creating a new music item through form submission.
 *
 * @returns Element representing the Admin "create" form.
 */
const AdminCreate = () => {
  // Form values
  const [values, setValues] = useState<Omit<MusicItemType, "id" | "artwork">>({
    title: "",
    artist: "",
    description: "",
    genre: "",
    release_date: new Date().toISOString().split("T")[0],
    length: 1,
    price_aud: 0,
    featured: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Handle the image upload

  // Validates form inputs - checks if there is a missing image file, or if any entries do not have a value
  const isFormInvalid =
    !imageFile ||
    Object.entries(values).some(([key, value]) => {
      if (key === "featured") return false; // exclude check on `featured`, as it is a boolean (and true/false are both valid)
      if (key === "price_aud" && (value as number) >= 0) return false; // check `price_aud` is greater or equal to 0
      return !value;
    });

  // TanStack mutation for API submission
  const mutation = useMutation({
    mutationFn: postNewMusicItem,
  });

  // Input change handlers
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  // Image change handler
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  // Form submission handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      ...values,
      artwork: imageFile!,
    });
  };

  return (
    <Form onSubmit={handleSubmit} aria-labelledby="form-title">
      <Heading1 id="form-title" className={styles.heading}>
        Create Music Item
      </Heading1>
      <Input
        label="Title"
        name="title"
        type="text"
        autoComplete="off"
        value={values.title}
        onChange={handleChange}
        required
      />
      <Input
        label="Artist"
        name="artist"
        type="text"
        autoComplete="off"
        value={values.artist}
        onChange={handleChange}
        required
      />
      <Input
        label="Description"
        name="description"
        type="textarea"
        autoComplete="off"
        value={values.description}
        onChange={handleChange}
        required
      />
      <Input
        label="Genre"
        name="genre"
        type="text"
        autoComplete="off"
        value={values.genre}
        onChange={handleChange}
        required
      />
      <Input
        label="Release Date"
        name="release_date"
        type="date"
        autoComplete="off"
        value={values.release_date}
        onChange={handleChange}
        required
      />
      <Input
        label="Artwork File"
        name="artwork"
        type="file"
        autoComplete="off"
        onChange={handleFileChange}
        required
      />
      <Input
        label="Length (seconds)"
        name="length"
        type="number"
        min={1}
        autoComplete="off"
        value={values.length}
        onChange={handleChange}
        required
      />
      <Input
        label="Price $AUD"
        name="price_aud"
        type="number"
        min={0}
        step={0.01}
        autoComplete="off"
        value={values.price_aud}
        onChange={handleChange}
        required
      />
      <Input
        label="Featured"
        name="featured"
        type="checkbox"
        autoComplete="off"
        checked={values.featured}
        onChange={handleChange}
      />
      <Button
        type="submit"
        disabled={isFormInvalid || mutation.isSuccess}
        isPending={mutation.isPending}
        aria-label={
          mutation.isSuccess ? "Item created successfully" : "Create music item"
        }
      >
        {(mutation.isIdle || mutation.isError) && "Create Item"}
        {mutation.isSuccess && "Success!"}
      </Button>
      {mutation.isError && (
        <ErrorText>{(mutation.error as Error).message}</ErrorText>
      )}
    </Form>
  );
};

export default AdminCreate;
