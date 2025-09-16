import MusicHeader from "../../components/features/MusicHeader";
import MusicList from "../../components/features/MusicList";

type Props = {};

const mockData = [
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
    price: 2000,
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
    price: 2000,
  },
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
    price: 2000,
  },
  {
    id: "id4",
    title: "title4",
    artist: "artist4",
    description: "description4",
    artwork: "https://placehold.co/600x400",
    genre: "genre4",
    release_date: "release_date4",
    length: 50,
    format: "format4",
    price: 2000,
  },
  {
    id: "id5",
    title: "title5",
    artist: "artist5",
    description: "description5",
    artwork: "https://placehold.co/600x400",
    genre: "genre5",
    release_date: "release_date5",
    length: 60,
    format: "format5",
    price: 2000,
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
    price: 2000,
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
    price: 2000,
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
    price: 2000,
  },
];

const Music = ({}: Props) => {
  return (
    <>
      <MusicHeader />
      <MusicList music={mockData} />
    </>
  );
};

export default Music;
