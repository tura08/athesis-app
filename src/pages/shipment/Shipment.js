// // import { useParams } from "react-router-dom";
// // import { useDocument } from "../../hooks/useDocument";
// import { useFirestore } from "../../hooks/useFirestore";

// //styles
// import "./Shipment.css";

// const Shipment = ({ shipment }) => {
//   // const { id } = useParams();
//   // const { document: shipment, error } = useDocument("shipments", id);
//   const { updateDocument, response } = useFirestore("shipments");

//   // if (error) {
//   //   return <div className="error">{error}</div>;
//   // }
//   // if (!shipment) {
//   //   return <div className="loading">Loading...</div>;
//   // }

//   return (
//     <div className="shipment-order">
//       <h4>Numero ordine: {shipment.orderNumber}</h4>
//       <p>Fornitore: {shipment.supplier.label}</p>
//       <p>Da Pagare: ${shipment.amountPayment}</p>
//       <p>Dettagli fattura: {shipment.invoiceDetails}</p>
//       <p>Scadenza pagamento: {shipment.dueDate}</p>
//       <p>Stato spedizione: {shipment.shipmentStatus.label}</p>
//       <button className="btn">Aggiorna</button>
//     </div>
//   );
// };

// export default Shipment;

import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// styles
import "./Shipment.css";

import Select from "react-select";

const suppliers = [
  { value: "alpha", label: "Alpha Vitabio" },
  { value: "proactive", label: "Proactive Health" },
];

const shipmentsStatus = [
  { value: "aperte", label: "Aperta" },
  { value: "chiuse", label: "Chiusa" },
  { value: "partite", label: "Partita" },
  { value: "dogana", label: "In Dogana" },
  { value: "concluse", label: "Conclusa" },
];

const Shipment = ({ shipment }) => {
  const [orderNumber, setOrderNumber] = useState(shipment.orderNumber);
  const [amountPayment, setAmountPayment] = useState(shipment.amountPayment);
  const [invoiceDetails, setInvoiceDetails] = useState(shipment.invoiceDetails);
  const [dueDate, setDueDate] = useState(shipment.dueDate);
  const [supplier, setSupplier] = useState(
    suppliers.find((opt) => opt.label === shipment.supplier.label)
  );
  const [shipmentStatus, setShipmentStatus] = useState(
    shipmentsStatus.find((opt) => opt.label === shipment.shipmentStatus.label)
  );

  const { updateDocument, response } = useFirestore("shipments");

  const handleUpdate = async () => {
    const updates = {
      orderNumber,
      supplier: { value: supplier, label: shipment.supplier.label },
      amountPayment,
      invoiceDetails,
      dueDate,
      shipmentStatus: {
        value: shipmentStatus,
        label: shipment.shipmentStatus.label,
      },
    };
    await updateDocument(shipment.id, updates);
  };

  return (
    <div className="shipment-order">
      <form onSubmit={handleUpdate}>
        <label>
          Numero ordine:
          <input
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
          />
        </label>
        <label>
          Da Pagare:
          <input
            type="text"
            value={amountPayment}
            onChange={(e) => setAmountPayment(e.target.value)}
          />
        </label>
        <label>
          Data e numero fattura:
          <input
            type="text"
            value={invoiceDetails}
            onChange={(e) => setInvoiceDetails(e.target.value)}
          />
        </label>
        <label>
          Scadenza pagamento:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>
        <label>
          <span>Fornitore</span>
          <Select
            onChange={(option) => setSupplier(option)}
            options={suppliers}
          />
        </label>
        <label>
          <span>Stato spedizione</span>
          <Select
            onChange={(option) => setShipmentStatus(option)}
            options={shipmentsStatus}
          />
        </label>
        <button className="btn">Aggiorna</button>
      </form>
      {response.isPending && <p>Updating...</p>}
      {response.error && <p className="error">{response.error}</p>}
      {response.success && <p>Update successful!</p>}
    </div>
  );
};

export default Shipment;
