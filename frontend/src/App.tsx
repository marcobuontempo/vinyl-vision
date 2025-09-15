import { Route, Routes } from "react-router-dom";

// Components
import Layout from "./components/layout/Layout";

// Pages
import Home from "./pages/Home";
import Music from "./pages/Music";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* BASE */}
        <Route index element={<Home />} />

        {/* MUSIC */}
        <Route path="/music" element={<Music />} />

        {/* MISC */}
        <Route path="/about" element={<About />} />

        {/* ERROR */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
