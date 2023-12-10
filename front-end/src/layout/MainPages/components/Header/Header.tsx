//styles
import "./Header.scss";
import { Heading, Button } from "@ensdomains/thorin";

//componets
import Search from "../../../../components/Search/Search";
import ProfileComponent from "./ProfileMenu/ProfileComponent";

import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className="header">
      <div className="header_inner">
        <Link to={"/main/catalog"}>
          <Heading
            color="background"
            level="1"
            style={{ margin: "0 0 10px 0" }}
          >
            Hata
          </Heading>
        </Link>
        <Search />
        <Link to={"/main/createAd"}>
          <Button
            shape="square"
            width="56"
            colorStyle="greyPrimary"
            style={{ backgroundColor: "yellow", color: "black" }}
          >
            + Add advertisement
          </Button>
        </Link>
        <ProfileComponent />
      </div>
    </header>
  );
};

export default MainHeader;
