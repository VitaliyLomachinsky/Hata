//style
import { Card, Input, Typography } from "@ensdomains/thorin";
import "./FilterItems.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { set_price_max, set_price_min } from "../filterSlice";

//rtk

const FilterPrice = () => {
  const price = useAppSelector((state) => state.filter.price);
  const dispatch = useAppDispatch();

  const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(set_price_min(event.target.value));
  };
  const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(set_price_max(event.target.value));
  };

  return (
    <Card className="filter_item">
      <Typography fontVariant="large" style={{ textAlign: "center" }}>
        Price
      </Typography>{" "}
      <Card.Divider />
      <Input
        label="At least"
        placeholder=""
        suffix={"$"}
        value={price.min}
        onChange={handleChangeMin}
      />
      <Input
        label="No more than"
        placeholder=""
        suffix={"$"}
        value={price.max}
        onChange={handleChangeMax}
      />
    </Card>
  );
};

export default FilterPrice;
