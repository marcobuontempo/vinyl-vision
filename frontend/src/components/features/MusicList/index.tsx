import * as styles from "./styles.css";

import MusicCard from "../MusicCard";
import { getAllMusic } from "../../../api/music";
import { useQuery } from "@tanstack/react-query";

type Props = {};

const MusicList = ({}: Props) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["music"],
    queryFn: getAllMusic,
  });

  if (isPending) return null;
  if (isError) return null;
  if (error) return null;
  if (!data) return null;

  return (
    <section className={styles.musicList}>
      {data.map((music) => (
        <MusicCard key={music.id} data={music} />
      ))}
    </section>
  );
};

export default MusicList;
