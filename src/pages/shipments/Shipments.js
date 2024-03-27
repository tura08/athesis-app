import { useCollection } from "../../hooks/useCollection";
import Modal from "../../components/Modal";
import NewShipmentForm from "./NewShipmentForm";
import ShipmentList from "./ShipmentList";
import ShipmentFilter from "./ShipmentFilter";

import "./Shipments.css";
import { useState } from "react";

const Shipments = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { documents: shipments, error } = useCollection("shipments");
  const [currentFilter, setCurrentFilter] = useState("tutte");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const filteredShipments =
    shipments &&
    shipments.filter((shipment) => {
      switch (currentFilter) {
        case "tutte":
          return true;
        case "aperte":
        case "chiuse":
        case "partite":
        case "dogana":
        case "concluse":
          console.log(shipment.shipmentStatus.value, currentFilter);
          return shipment.shipmentStatus.value === currentFilter;
        default:
          return true;
      }
    });

  return (
    <div>
      <h2 className="page-title">Lista Spedizioni</h2>
      {error && <p>{error}</p>}
      {shipments && (
        <ShipmentFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      <div className="shipment-list">
        {shipments && <ShipmentList shipments={filteredShipments} />}
      </div>
      <button onClick={toggleModal} className="btn">
        +
      </button>
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <NewShipmentForm toggleModal={toggleModal} />
      </Modal>
    </div>
  );
};

export default Shipments;
