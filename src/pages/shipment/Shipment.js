// import { useParams } from "react-router-dom";
// import { useDocument } from "../../hooks/useDocument";

//styles
import "./Shipment.css";

const Shipment = ({ shipment }) => {
  // const { id } = useParams();
  // const { document: shipment, error } = useDocument("shipments", id);

  // if (error) {
  //   return <div className="error">{error}</div>;
  // }
  // if (!shipment) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <div className="shipment-order">
      <h4>Numero ordine: {shipment.orderNumber}</h4>
      <p>Fornitore: {shipment.supplier.label}</p>
      <p>Da Pagare: ${shipment.amountPayment}</p>
      <p>Dettagli fattura: {shipment.invoiceDetails}</p>
      <p>Scadenza pagamento: {shipment.dueDate}</p>
      <p>Stato spedizione: {shipment.orderStatus.label}</p>
    </div>
  );
};

export default Shipment;
