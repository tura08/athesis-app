import React, { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

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

const Shipment = ({
  shipment,
  toggleModal,
}: {
  shipment?: any;
  toggleModal?: any;
}) => {
  const [form, setForm] = useState({
    orderNumber: shipment ? shipment.orderNumber : "",
    amountPayment: shipment ? shipment.amountPayment : "",
    invoiceDetails: shipment ? shipment.invoiceDetails : "",
    dueDate: shipment ? shipment.dueDate : "",
    supplier: shipment ? shipment.supplier : "",
    shipmentStatus: shipment ? shipment.shipmentStatus : "",
  });

  const navigate = useNavigate();

  const [formError, setFormError] = useState(null);

  const isNewOrder = !shipment?.id;

  //wat javascript => da vedere

  const { updateDocument, addDocument, response } = useFirestore("shipments");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);
    if (isNewOrder) {
      if (!form.supplier.value) {
        setFormError("Please select a supplier");
        return;
      }
      if (!form.shipmentStatus.value) {
        setFormError("Please select a status for the order");
        return;
      }
      addDocument(form);
      if (!response.error) {
        navigate("/shipments");
      }
    } else {
      await updateDocument(shipment.id, form);
    }

    // toggleModal();
  };

  return (
    <div className="shipment-order">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Numero Ordine</span>
          <input
            required
            type="number"
            onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
            value={form.orderNumber}
          />
        </label>
        <label>
          <span>Da pagare ($)</span>
          <input
            required
            type="number"
            onChange={(e) =>
              setForm({ ...form, amountPayment: e.target.value })
            }
            value={form.amountPayment}
          />
        </label>
        <label>
          <span>Data e numero fatture</span>
          <input
            required
            type="text"
            onChange={(e) =>
              setForm({ ...form, invoiceDetails: e.target.value })
            }
            value={form.invoiceDetails}
          />
        </label>
        <label>
          <span>Scadenza pagamento</span>
          <input
            required
            type="date"
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            value={form.dueDate}
          />
        </label>
        <label>
          <span>Fornitore</span>
          <Select
            options={suppliers}
            onChange={(value) => setForm({ ...form, supplier: value })}
            value={form.supplier}
          />
        </label>
        <label>
          <span>Stato spedizione</span>
          <Select
            options={shipmentsStatus}
            onChange={(value) => setForm({ ...form, shipmentStatus: value })}
            value={form.shipmentStatus}
          />
        </label>
        <button className="btn">
          {isNewOrder ? "Aggiungi spedizione" : "Aggiorna"}
        </button>
      </form>
      {response.isPending && <p>Updating...</p>}
      {response.error && <p className="error">{response.error}</p>}
      {response.success && <p>Update successful!</p>}
    </div>
  );
};

export default Shipment;
