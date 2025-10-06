/**
 * Home (Page) Component.
 *
 * The landing page of the Vinyl Vision website.
 * - Displays the Hero section.
 * - Displays the Featured music section.
 *
 */

// LOCAL IMPORTS
import Hero from "../../components/features/Hero";
import Featured from "../../components/features/Featured";

/**
 * Renders the Home page with Hero and Featured sections.
 *
 * @returns Element containing the main landing page content.
 */
const Home = () => {
  return (
    <>
      <Hero />
      <Featured />
    </>
  );
};

export default Home;
