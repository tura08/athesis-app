import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

import Select from "react-select";

const suppliers = [
  { value: "alpha", label: "Alpha Vitabio" },
  { value: "proactive", label: "Proactive Health" },
];

const shipmentStatus = [
  { value: "aperte", label: "Aperta" },
  { value: "chiuse", label: "Chiusa" },
  { value: "partite", label: "Partita" },
  { value: "dogana", label: "In Dogana" },
  { value: "concluse", label: "Conclusa" },
];

const NewShipmentForm = ({ toggleModal }) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [supplier, setSupplier] = useState("");
  const [amountPayment, setAmountPayment] = useState("");
  const [invoiceDetails, setInvoiceDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();
  const { addDocument, response } = useFirestore("shipments");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!supplier.value) {
      setFormError("Please select a supplier");
      return;
    }
    if (!orderStatus.value) {
      setFormError("Please select a status for the order");
      return;
    }
    const shipmentDetails = {
      orderNumber,
      supplier,
      amountPayment,
      invoiceDetails,
      dueDate,
      orderStatus,
    };
    addDocument(shipmentDetails);
    if (!response.error) {
      navigate("/shipments");
    }
    toggleModal();
  };

  return (
    <div className="new-shipment">
      <h2 className="page-title">Lista spedizioni</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Numero Ordine</span>
          <input
            required
            type="number"
            onChange={(e) => setOrderNumber(e.target.value)}
            value={orderNumber}
          />
        </label>
        <label>
          <span>Da pagare ($)</span>
          <input
            required
            type="number"
            onChange={(e) => setAmountPayment(e.target.value)}
            value={amountPayment}
          />
        </label>
        <label>
          <span>Data e numero fatture</span>
          <input
            required
            type="text"
            onChange={(e) => setInvoiceDetails(e.target.value)}
            value={invoiceDetails}
          />
        </label>
        <label>
          <span>Scadenza pagamento</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
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
            onChange={(option) => setOrderStatus(option)}
            options={shipmentStatus}
          />
        </label>
        <button className="btn">Aggiungi spedizione</button>
      </form>
      {formError && <p className="error">{formError}</p>}
    </div>
  );
};

export default NewShipmentForm;
