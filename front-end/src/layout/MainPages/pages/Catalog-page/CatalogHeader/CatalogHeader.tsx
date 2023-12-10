import { Dropdown, Heading, Typography } from "@ensdomains/thorin";
import "./CatalogHeader.scss";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { start } from "repl";
import { set_order, set_sort } from "../Filters/filterSlice";

const CatalogHeader = () => {
  const sortBy = useAppSelector((state) => state.filter.sortBy);
  const orderBy = useAppSelector((state) => state.filter.orderBy);
  const dispatch = useAppDispatch();

  const handleClick = (text: string) => {
    dispatch(set_sort(text));
  };

  const handleOrder = (text: string) => {
    dispatch(set_order(text));
  };

  return (
    <section className="main_container">
      <div className="catalog_header_wrapper">
        <div>
          <Heading className="catalog_title">Rent an apartment</Heading>
          <Typography>23,256 proposals</Typography>
        </div>
        <div className="drop_down_div">
          <div className="drop_down_inner">
            <Dropdown
              align="left"
              items={[
                {
                  label: "Price",
                  onClick: () => handleClick("price"),
                  color: "text",
                },
                {
                  label: "Area",
                  onClick: () => handleClick("area"),
                  color: "text",
                },
              ]}
              label={sortBy}
            />
          </div>
          <Dropdown
            align="left"
            items={[
              {
                label: "Lowest first",
                onClick: () => handleOrder("lowest"),
                color: "text",
              },

              {
                label: "Highest first",
                onClick: () => handleOrder("highest"),
                color: "text",
              },
            ]}
            label={orderBy}
          />
        </div>
      </div>
    </section>
  );
};

export default CatalogHeader;
