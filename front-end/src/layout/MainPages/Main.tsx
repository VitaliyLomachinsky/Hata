//styles
import "./Main.scss";

//components
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

import { Outlet, Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <main className="main">
      <Header />
      <Outlet />

      {/* <Footer /> */}
    </main>
  );
};

export default Main;
