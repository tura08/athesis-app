const filterList = [
  "tutte",
  "aperte",
  "chiuse",
  "partite",
  "dogana",
  "concluse",
];

const ShipmentFilter = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="shipment-filter">
      <nav>
        <p>Stato ordine:</p>
        {filterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? "active" : ""}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ShipmentFilter;
