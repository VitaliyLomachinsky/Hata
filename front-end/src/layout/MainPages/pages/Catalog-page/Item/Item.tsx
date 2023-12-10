import { Link } from "react-router-dom";
import "./Item.scss";

const Item = (props: any) => {
  console.log(props);
  return (
    <div className="item">
      <Link to={`item/${props.propertyID}`}>
        <div className="image_wrapper">
          <img
            src={`https://eu.starton-ipfs.com/ipfs/${props.previewCID}`}
          ></img>
        </div>
      </Link>
      <div className="info_wrapper">
        <div className="info_text">
          <div className="item_adress">{props.location}</div>
          <div className="item_description">{props.area} m2</div>
        </div>
        <div className="info_price">{props.price}$</div>
      </div>
    </div>
  );
};

export default Item;
