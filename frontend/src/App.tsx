// NPM IMPORTS
import { Route, Routes } from "react-router-dom";

// COMPONENTS
import Layout from "./components/layout/Layout";

// PAGES
import Home from "./pages/Home";
import Music from "./pages/Music";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import MusicDetail from "./pages/MusicDetail";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* BASE */}
        <Route index element={<Home />} />

        {/* AUTH */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* USER */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* MUSIC */}
        <Route path="/music" element={<Music />} />
        <Route path="/music/:id" element={<MusicDetail />} />

        {/* CART */}
        <Route path="/cart" element={<Cart />} />

        {/* MISC */}
        <Route path="/about" element={<About />} />

        {/* ERROR */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
