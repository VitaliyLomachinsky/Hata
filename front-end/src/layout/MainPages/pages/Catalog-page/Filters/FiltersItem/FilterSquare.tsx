import { Card, Input, Typography } from "@ensdomains/thorin";
import "./FilterItems.scss";
import { useAppDispatch, useAppSelector } from "../../../../../../store/hooks";
import { set_square_max, set_square_min } from "../filterSlice";

const FilterSquare = () => {
  const square = useAppSelector((state) => state.filter.square);
  const dispatch = useAppDispatch();

  const handleChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(set_square_min(event.target.value));
  };
  const handleChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(set_square_max(event.target.value));
  };
  return (
    <Card className="filter_item">
      <Typography fontVariant="large" style={{ textAlign: "center" }}>
        Area
      </Typography>{" "}
      <Card.Divider />
      <Input
        label="At least"
        placeholder=""
        suffix={"m²"}
        value={square.min}
        onChange={handleChangeMin}
      />
      <Input
        label="No more than"
        placeholder=""
        suffix={"m²"}
        value={square.max}
        onChange={handleChangeMax}
      />
    </Card>
  );
};

export default FilterSquare;
