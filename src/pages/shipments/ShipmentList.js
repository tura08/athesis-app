import React, { useState } from "react";
// import { Link } from "react-router-dom";

import { useFirestore } from "../../hooks/useFirestore";

import Modal from "../../components/Modal";
import Shipment from "../shipment/Shipment";

const ShipmentList = ({ shipments }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const { deleteDocument } = useFirestore("shipments");

  const openModalForShipment = (shipment) => {
    setSelectedShipment(shipment);
    setIsModalOpen(true);
  };
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="shipment-list">
      {shipments.length === 0 && <p>No shipments yet!</p>}
      {shipments.map((shipment) => (
        <div className="shipment-card" key={shipment.id}>
          <div className="shipment-card-details">
            <h4>Ordine Numero: {shipment.orderNumber}</h4>
            <p>Da Pagare: ${shipment.amountPayment}</p>
            <p>Scadenza Pagamento: {shipment.dueDate}</p>
            <p>Fornitore: {shipment.supplier.label}</p>
          </div>
          {/* <Link to={`/shipments/${shipment.id}`}>
            <button className="btn">View</button>
          </Link> */}
          <button
            className="btn"
            onClick={() => openModalForShipment(shipment)}
          >
            View
          </button>

          <button
            className="delete"
            onClick={(e) => deleteDocument(shipment.id)}
          >
            Delete
          </button>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        {selectedShipment && <Shipment shipment={selectedShipment} />}
      </Modal>
    </div>
  );
};

export default ShipmentList;
