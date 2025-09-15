import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";

import * as styles from "./styles.css";

type Props = {};

const Layout = ({}: Props) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
