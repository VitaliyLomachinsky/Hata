//style
import "./HomePage.scss";
//layout
import GradientStartUp from "./GradientStartUp/GradientStartUp";
import HomeHeader from "./HomeHeader/HomeHeader";
import Statistica from "./Statistica/Statistica";

const Home = () => {
  return (
    <main className="Home">
      <HomeHeader />
      <GradientStartUp />
      <Statistica />
    </main>
  );
};

export default Home;
