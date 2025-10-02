import { useQuery } from "@tanstack/react-query";
import MusicCard from "../MusicCard";
import * as styles from "./styles.css";
import { getFeaturedMusic } from "../../../api/music";
import { ScaleLoader } from "react-spinners";

type Props = {};

const Featured = ({}: Props) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["music", "featured"],
    queryFn: getFeaturedMusic,
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
        Error Fetching "Featured Music"
      </div>
    );

  if (!data)
    return (
      <div className={styles.stateContainer}>No "Featured Music" Data</div>
    );

  return (
    <section className={styles.featured}>
      <h2 className={styles.title}>Featured Music</h2>
      <div className={styles.list}>
        {data.map((data) => (
          <MusicCard key={data.id} data={data} className={styles.item} />
        ))}
      </div>
    </section>
  );
};

export default Featured;
