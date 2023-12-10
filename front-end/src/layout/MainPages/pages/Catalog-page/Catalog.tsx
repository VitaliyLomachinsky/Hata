//styles
import "./Catalog.scss";

//components
import Filters from "./Filters/Filters";
import Item from "./Item/Item";
import CatalogHeader from "./CatalogHeader/CatalogHeader";
import Pagination from "./Pagination/Pagination";
import { useEffect } from "react";
import React from "react";
import { gql } from "@graphql-mesh/utils";
import { execute } from "../../../../.graphclient";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { set_active } from "./Filters/filterSlice";

const Catalog = () => {
  const [data, setData] = React.useState<any>();
  const dispatch = useAppDispatch();

  const sort_by = useAppSelector((state) => state.filter.sortBy);
  const order_by = useAppSelector((state) => state.filter.orderBy);
  const price_max = useAppSelector((state) => state.filter.price.max);
  const price_min = useAppSelector((state) => state.filter.price.min);
  const square_max = useAppSelector((state) => state.filter.square.max);
  const square_min = useAppSelector((state) => state.filter.square.min);

  const filterSortBy =
    sort_by === "price"
      ? `orderBy: price`
      : sort_by === "area"
        ? `orderBy: area`
        : "";

  const filterOrderBy =
    order_by === "lowest"
      ? `orderDirection: asc`
      : order_by === "highest"
        ? `orderDirection: desc`
        : "";

  const filterPriceMax = price_max ? `price_lte: "${price_max}"` : "";
  const filterPriceMin = price_min ? `price_gte: "${price_min}"` : "";

  const filterAreaMax = square_max ? `area_lte: ${square_max}` : "";
  const filterAreaMin = square_min ? `area_gte: ${square_min}` : "";

  const combinedFilters = [
    filterPriceMax,
    filterPriceMin,
    filterAreaMax,
    filterAreaMin,
  ]
    .filter(Boolean)
    .join(", ");
  const combinedOrders = [filterSortBy, filterOrderBy];

  const queryResult = `
      query ActivePropertyQuery {
        properties(where: { isActive: true, ${combinedFilters} } ${combinedOrders}) {
        isActive
        area
        id
        landlord
        location
        payment
        previewCID
        price
        propertyID
      }
    }
    `;

  useEffect(() => {
    const getActiveProperty = async () => {
      const query = gql`
        ${queryResult}
      `;

      const result = await execute(query, {});
      setData(result?.data);
    };

    getActiveProperty();
    dispatch(set_active(false));
  }, [order_by, sort_by, price_max, price_min, square_max, square_min]);

  const itemList =
    data?.properties?.map((item: any, index: number) => (
      <Item key={index} {...item} />
    )) || [];

  return (
    <>
      <div className="main_container">
        <Filters />
        <CatalogHeader />
        <div className="catalog">{itemList}</div>
      </div>
    </>
  );
};

export default Catalog;
