import { Card, Heading, RecordItem, WalletSVG } from "@ensdomains/thorin";
import "./ProfileItem.scss";
import { useNavigate } from "react-router-dom";

const ProfileItem = (props: { img: string, price: string, location: string, address: string }) => {
  const navigate = useNavigate();

  return (
    <Card className="card" onClick={() => navigate(`/main/catalog/item/${props.address}`)
    }>
      <div className="card_info">
        <img
          className="card_img"
          src={`https://eu.starton-ipfs.com/ipfs/${props.img}`}

        ></img>{" "}
        <Heading level="2" as="h4" className="card_price">
          {props.price} $
        </Heading>
        <Heading level="2" as="h4" className="card_title">
          {props.location}
        </Heading>
      </div>
    </Card >
  );
};

export default ProfileItem;
