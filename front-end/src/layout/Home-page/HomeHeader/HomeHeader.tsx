import "./HomeHeader.scss";
import { Link } from "react-router-dom";

import { Heading, Button } from "@ensdomains/thorin";

const Header = () => {
  return (
    <div className="home_header">
      <Link to="">
        <Heading color="background">Hata</Heading>
      </Link>
      <Link to="/main/catalog">
        <Button width="45" colorStyle="background" size="medium">
          Launch App
        </Button>
      </Link>
    </div>
  );
};

export default Header;
