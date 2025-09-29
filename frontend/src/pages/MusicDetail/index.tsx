import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMusicById } from "../../api/music";
import { queryClient } from "../../main";
import type { MusicItemType } from "../../../../shared/types";
import Heading1 from "../../components/common/Heading1";
import * as styles from "./styles.css";
import Button from "../../components/common/Button";

type Props = {};

const MusicDetail = ({}: Props) => {
  const { id } = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["music", id],
    queryFn: () => getMusicById(id!),
    enabled: !!id, // only fetch if an id is passed (which should always be the case)
    initialData: () =>
      queryClient
        .getQueryData<MusicItemType[]>(["music"])
        ?.find((m) => m.id === id), // use the music data directly from the "music" query for instant load (if available)
  });

  if (isPending) return null;
  if (isError) return null;
  if (error) return null;
  if (!data) return null;

  return (
    <div className={styles.detail}>
      <Heading1 className={styles.heading}>Music Details</Heading1>
      <section className={styles.container}>
        <img
          src={data.artwork}
          alt={`Artwork: ${data.title} by ${data.artist}`}
          className={styles.artwork}
        />
        <div className={styles.content}>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.information}>
            <p>Title: {data.title}</p>
            <p>Artist: {data.artist}</p>
            <p>Genre: {data.genre}</p>
            <p>Release Date: {data.release_date}</p>
            <p>Track Length: {data.length}</p>
          </div>
          <Button>Add To Cart</Button>
        </div>
      </section>
    </div>
  );
};

export default MusicDetail;
