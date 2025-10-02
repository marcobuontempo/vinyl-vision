import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMusicById } from "../../api/music";
import { queryClient } from "../../main";
import type { MusicItemType } from "../../../../shared/types";
import Heading1 from "../../components/common/Heading1";
import * as styles from "./styles.css";
import Button from "../../components/common/Button";
import { useCart } from "../../contexts/CartContext";
import {
  convertPriceToCurrency,
  convertSecondsToHHMMSS,
} from "../../utils/helpers";
import { ScaleLoader } from "react-spinners";

type Props = {};

const MusicDetail = ({}: Props) => {
  const { id } = useParams();
  const { cart, addToCart } = useCart();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["music", id],
    queryFn: () => getMusicById(id!),
    enabled: !!id, // only fetch if an id is passed (which should always be the case)
    initialData: () =>
      queryClient
        .getQueryData<MusicItemType[]>(["music"])
        ?.find((m) => m.id === id), // use the music data directly from the "music" query for instant load (if available)
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
            <p>Track Length: {convertSecondsToHHMMSS(data.length)}</p>
            <p className={styles.price}>
              {convertPriceToCurrency(data.price_aud)}
            </p>
          </div>
          <Button onClick={() => addToCart(data)} disabled={!!cart[data.id]}>
            {cart[data.id] ? "IN CART" : "ADD TO CART"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MusicDetail;
