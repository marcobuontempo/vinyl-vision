import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Heading1 from "../../common/Heading1";
import * as styles from "./styles.css";
import Button from "../../common/Button";
import { useSearchParams } from "react-router-dom";

type Props = {};

const MusicHeader = ({}: Props) => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState({
    sort: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Match the sort values on load
    const sortByParam = searchParams.get("sortBy") || "title";
    const sortOrderParam = searchParams.get("order") || "asc";
    setFilterValues({
      ...filterValues,
      sort: `${sortByParam}:${sortOrderParam}`,
    });
  }, []);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value; // e.g. "title:asc"
    setFilterValues({
      ...filterValues,
      sort: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [sortBy, order] = filterValues.sort.split(":");
    setSearchParams({ sortBy, order });
  };

  return (
    <header className={styles.header}>
      <div className={styles.main}>
        <Heading1>Music</Heading1>
        <button
          className={styles.filter}
          onClick={() => setShowFilter(!showFilter)}
        >
          Filter
        </button>
      </div>
      <form
        className={`${styles.form} ${showFilter ? styles.show : ""}`}
        onSubmit={handleSubmit}
      >
        <input placeholder="Title" />
        <input placeholder="Artist" />
        <input placeholder="Genre" />
        Sort
        <select onChange={handleSortChange} value={filterValues.sort}>
          <option value="title:asc">Title: Ascending</option>
          <option value="title:desc">Title: Descending</option>
          <option value="release_date:asc">Release Date: Ascending</option>
          <option value="release_date:desc">Release Date: Descending</option>
          <option value="length:asc">Length: Ascending</option>
          <option value="length:desc">Length: Descending</option>
        </select>
        <Button>GO</Button>
      </form>
    </header>
  );
};

export default MusicHeader;
