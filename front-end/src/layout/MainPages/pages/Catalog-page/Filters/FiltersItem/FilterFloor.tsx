import "./FilterItems.scss";

const FilterFloor = () => {
  return (
    <div className="filter_item">
      <div className="filter_title">Floor ( 2 - 33 )</div>
      <div className="filter_body">
        <div className="input_label">From:</div>
        <input type="text" className="input_area"></input>
        <div className="input_label">To:</div>
        <input type="text" className="input_area"></input>
      </div>
    </div>
  );
};

export default FilterFloor;
