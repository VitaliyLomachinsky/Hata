import "./FilterItems.scss";

const FilterRooms = () => {
  return (
    <div className="filter_item">
      <div className="filter_title">Rooms ( 3 )</div>
      <div className="filter_body">
        <div className="choose_item">1</div>
        <div className="choose_item">2</div>
        <div className="choose_item selected">3</div>
        <div className="choose_item">4+</div>
      </div>
    </div>
  );
};

export default FilterRooms;
