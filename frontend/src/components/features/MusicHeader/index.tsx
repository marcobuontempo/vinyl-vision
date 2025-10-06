/**
 * MusicHeader Component.
 *
 * Renders the header section of the Music page, including:
 * - Page title
 * - Filter toggle button
 * - Filter form with inputs for title, artist, and genre
 * - Sorting options for title, release date, length, and price
 *
 * Syncs filter state with URL search parameters for persistent filters.
 *
 */

// TYPES IMPORTS
import { type ChangeEvent, type FormEvent } from "react";
// NPM IMPORTS
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// LOCAL IMPORTS
import Heading1 from "../../common/Heading1";
import Button from "../../common/Button";
import Input from "../../common/Input";
// STYLES IMPORTS
import * as styles from "./styles.css";

/**
 * Renders the music page header with filter and sorting functionality.
 *
 * @returns Element representing the header section
 */
const MusicHeader = () => {
  // Toggles the visibility of the form
  const [showFilter, setShowFilter] = useState(false);
  // Holds the current values of filters and sort options
  const [filterValues, setFilterValues] = useState({
    sort: "",
    title: "",
    artist: "",
    genre: "",
  });
  // Manages search parameters in URL
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Match the sort values on load
    const sortByParam = searchParams.get("sortBy") || "release_date";
    const sortOrderParam = searchParams.get("order") || "desc";
    setFilterValues((prev) => ({
      ...prev,
      sort: `${sortByParam}:${sortOrderParam}`,
    }));
  }, [searchParams]);

  // Form input change handler
  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFilterValues({
      ...filterValues,
      [e.target.name]: e.target.value,
    });
  };

  // Submission of form handler
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
          type="button"
          className={`${styles.filter} ${showFilter ? styles.open : ""}`}
          onClick={() => setShowFilter(!showFilter)}
          aria-expanded={showFilter}
          aria-controls="filter-form"
          aria-label="Toggle filter options"
        >
          Filter
        </button>
      </div>

      <form
        id="filter-form"
        className={`${styles.form} ${showFilter ? styles.show : ""}`}
        onSubmit={handleSubmit}
        aria-label="Filter and sort music"
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
          aria-label="Sort By"
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
        <Button type="submit" aria-label="Apply filters">
          Apply Filters
        </Button>
      </form>
    </header>
  );
};

export default MusicHeader;
