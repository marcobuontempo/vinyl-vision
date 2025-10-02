import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Heading1 from "../../common/Heading1";
import * as styles from "./styles.css";
import Button from "../../common/Button";
import { useSearchParams } from "react-router-dom";
import Input from "../../common/Input";

type Props = {};

const MusicHeader = ({}: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    sort: "",
    title: "",
    artist: "",
    genre: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Match the sort values on load
    const sortByParam = searchParams.get("sortBy") || "release_date";
    const sortOrderParam = searchParams.get("order") || "desc";
    setFilterValues({
      ...filterValues,
      sort: `${sortByParam}:${sortOrderParam}`,
    });
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [sortBy, order] = filterValues.sort.split(":");
    const { title, artist, genre } = filterValues;

    let params: Record<string, string> = {};
    if (sortBy) params.sortBy = sortBy;
    if (order) params.order = order;
    if (title) params.title = title;
    if (artist) params.artist = artist;
    if (genre) params.genre = genre;

    setSearchParams(params);
  };

  return (
    <header className={styles.header}>
      <div className={styles.main}>
        <Heading1>Music</Heading1>
        <button
          className={`${styles.filter} ${showFilter ? styles.open : ""}`}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </button>
      </div>

      <form
        className={`${styles.form} ${showFilter ? styles.show : ""}`}
        onSubmit={handleSubmit}
      >
        <Input
          name="title"
          type="text"
          placeholder="Title"
          value={filterValues.title}
          onChange={handleChange}
        />
        <Input
          name="artist"
          type="text"
          placeholder="Artist"
          value={filterValues.artist}
          onChange={handleChange}
        />
        <Input
          name="genre"
          type="text"
          placeholder="Genre"
          value={filterValues.genre}
          onChange={handleChange}
        />

        <select
          name="sort"
          onChange={handleChange}
          value={filterValues.sort}
          className={styles.select}
        >
          <option value="title:asc">Title: Ascending</option>
          <option value="title:desc">Title: Descending</option>
          <option value="release_date:asc">Release Date: Ascending</option>
          <option value="release_date:desc">Release Date: Descending</option>
          <option value="length:asc">Length: Ascending</option>
          <option value="length:desc">Length: Descending</option>
          <option value="price_aud:asc">Price: Ascending</option>
          <option value="price_aud:desc">Price: Descending</option>
        </select>
        <Button>GO</Button>
      </form>
    </header>
  );
};

export default MusicHeader;
