import * as styles from "./styles.css";

import MusicCard from "../MusicCard";
import { getAllMusic } from "../../../api/music";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
import Button from "../../common/Button";
import { useSearchParams } from "react-router-dom";
import type { SortOptions } from "../../../../../shared/types";

type Props = {};

const MusicList = ({}: Props) => {
  const [searchParams] = useSearchParams();
  const sortBy =
    (searchParams.get("sortBy") as SortOptions["sortBy"]) || undefined;
  const order =
    (searchParams.get("order") as SortOptions["order"]) || undefined;

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["music", sortBy, order],
    queryFn: () => {
      return getAllMusic(sortBy, order);
    },
    retry: 2,
  });

  if (isPending)
    return (
      <div className={styles.stateContainer}>
        <ScaleLoader color="#000" height={"1rem"} />
      </div>
    );

  if (isError)
    return (
      <div className={styles.stateContainer}>
        <Button onClick={() => refetch()}>Fetch Failed. Retry?</Button>
      </div>
    );

  if (!data) return <div className={styles.stateContainer}>No Data</div>;

  return (
    <section className={styles.musicList}>
      {data.map((music) => (
        <MusicCard key={music.id} data={music} />
      ))}
    </section>
  );
};

export default MusicList;
