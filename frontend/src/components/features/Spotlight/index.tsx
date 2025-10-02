import MusicCard from "../MusicCard";
import * as styles from "./styles.css";

type Props = {};

const mockData = [
  {
    id: "id3",
    title: "title3",
    artist: "artist3",
    description: "description3",
    artwork: "https://placehold.co/600x400",
    genre: "genre3",
    release_date: "release_date3",
    length: 200,
    format: "format3",
    price_aud: 100,
  },
  {
    id: "id2",
    title: "title2",
    artist: "artist2",
    description: "description2",
    artwork: "https://placehold.co/20x40",
    genre: "genre2",
    release_date: "release_date2",
    length: 75,
    format: "format2",
    price_aud: 350,
  },
  {
    id: "id",
    title: "title",
    artist: "artist",
    description: "description",
    artwork: "https://placehold.co/1600x4000",
    genre: "genre",
    release_date: "release_date",
    length: 65,
    format: "format",
    price_aud: 499,
  },
  {
    id: "id6",
    title: "title6",
    artist: "artist6",
    description: "description6",
    artwork: "https://placehold.co/600x400",
    genre: "genre6",
    release_date: "release_date6",
    length: 150,
    format: "format6",
    price_aud: 2000,
  },
  {
    id: "id8",
    title: "title8",
    artist: "artist5",
    description: "description8",
    artwork: "https://placehold.co/600x400",
    genre: "genre5",
    release_date: "release_date8",
    length: 250,
    format: "format8",
    price_aud: 2000,
  },
  {
    id: "id7",
    title: "title7",
    artist: "artist5",
    description: "description7",
    artwork: "https://placehold.co/600x400",
    genre: "genre5",
    release_date: "release_date7",
    length: 55,
    format: "format7",
    price_aud: 2000,
  },
];

const Spotlight = ({}: Props) => {
  return (
    <section className={styles.spotlight}>
      <h2 className={styles.title}>Spotlight</h2>
      <div className={styles.list}>
        {mockData.map((data) => (
          <MusicCard key={data.id} data={data} className={styles.item} />
        ))}
      </div>
    </section>
  );
};

export default Spotlight;
