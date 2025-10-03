import { useState, type ChangeEvent, type FormEvent } from "react";
import Form from "../../components/common/Form";
import Heading1 from "../../components/common/Heading1";
import Input from "../../components/common/Input";
import * as styles from "./styles.css";
import type { MusicItemType } from "../../../../shared/types";
import Button from "../../components/common/Button";
import { useMutation } from "@tanstack/react-query";
import { postNewMusicItem } from "../../api/music";
import { ScaleLoader } from "react-spinners";

type Props = {};

const Admin = ({}: Props) => {
  const [values, setValues] = useState<Omit<MusicItemType, "id">>({
    title: "",
    artist: "",
    description: "",
    genre: "",
    release_date: new Date().toISOString().split("T")[0],
    artwork: "",
    length: 1,
    price_aud: 0,
    featured: false,
  });

  const isFormInvalid = Object.entries(values).some(([key, value]) => {
    if (key === "price_aud" || key === "featured") return false;
    return !value;
  });

  const mutation = useMutation({
    mutationFn: postNewMusicItem,
  });

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(values);
  };

  return (
    <div className={styles.admin}>
      <Form onSubmit={handleSubmit}>
        <Heading1 className={styles.heading}>Create Music Item</Heading1>
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
          label="Artwork URL"
          name="artwork"
          type="url"
          autoComplete="off"
          value={values.artwork}
          onChange={handleChange}
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
        <Button disabled={isFormInvalid}>
          {(mutation.isIdle || mutation.isError) && "Create Item"}
          {mutation.isSuccess && "Success!"}
          {mutation.isPending && <ScaleLoader color="#FFF" height={"0.8rem"} />}
        </Button>
        {mutation.isError && (
          <p className={styles.error}>{(mutation.error as Error).message}</p>
        )}
      </Form>
    </div>
  );
};

export default Admin;
