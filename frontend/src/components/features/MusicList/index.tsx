import * as styles from "./styles.css";

import MusicCard from "../MusicCard";
import type { MusicItemType } from "../../../../../shared/types";

type Props = {
  music: MusicItemType[];
};

const MusicList = ({ music }: Props) => {
  return (
    <section className={styles.musicList}>
      {music.map((data) => (
        <MusicCard key={data.id} data={data} />
      ))}
    </section>
  );
};

export default MusicList;
