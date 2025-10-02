import * as styles from "./styles.css";

import MusicCard from "../MusicCard";
import { getAllMusic } from "../../../api/music";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
import Button from "../../common/Button";

type Props = {};

const MusicList = ({}: Props) => {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["music"],
    queryFn: getAllMusic,
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
