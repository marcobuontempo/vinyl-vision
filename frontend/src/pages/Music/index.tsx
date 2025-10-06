/**
 * Music (Page) Component.
 *
 * Renders the Music page of the Vinyl Vision website.
 * - Displays the MusicHeader section for filtering and sorting music items.
 * - Displays the MusicList section with all music items.
 *
 */

// LOCAL IMPORTS
import MusicHeader from "../../components/features/MusicHeader";
import MusicList from "../../components/features/MusicList";

/**
 * Renders the Music page containing:
 * - MusicHeader for filters and sorting
 * - MusicList displaying all music items
 *
 * @returns Element for the Music page.
 */
const Music = () => {
  return (
    <>
      <MusicHeader />
      <MusicList />
    </>
  );
};

export default Music;
