//styles
import "./App.scss";
//pages
import HomePage from "./layout/Home-page/HomePage";
import Main from "./layout/MainPages/Main";
import Catalog from "./layout/MainPages/pages/Catalog-page/Catalog";
import Profile from "./layout/MainPages/pages/Profile-page/Profile";
import SingleItemPage from "./layout/MainPages/pages/SingleItem-page/SingleItemPage";
import CreateAd from "./layout/MainPages/pages/СreateAD_info-page/CreateAd";
import CreateAD_payment from "./layout/MainPages/pages/CreateAD_payment-page/CreateAD_payment";

import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="main/" element={<Main />}>
          <Route path="catalog" element={<Catalog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="createAd" element={<CreateAd />} />
          <Route path="createAd_payment/:id" element={<CreateAD_payment />} />
          <Route path="catalog/item/:id" element={<SingleItemPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
