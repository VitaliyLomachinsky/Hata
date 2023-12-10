//style
import "./Filters.scss";
import { Button, CheckSVG, CrossSVG, Heading } from "@ensdomains/thorin";

import FilterSquare from "./FiltersItem/FilterSquare";
import FilterPrice from "./FiltersItem/FilterPrice";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { clear_all, set_active } from "./filterSlice";

const Filters = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="filters_wrapper">
      <Heading style={{ textAlign: "center", marginBottom: "10px" }}>
        Filters
      </Heading>
      <section className="filters">
        <div className="basic_filters">
          <FilterSquare />
          <FilterPrice />
        </div>
        <div className="filter_menu">

          <Button
            style={{ margin: "10px 0" }}
            suffix={<CrossSVG />}
            colorStyle="redSecondary"
            onClick={() => dispatch(clear_all())}
          >
            Clear All
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Filters;
