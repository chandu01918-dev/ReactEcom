import { useState } from "react";
import "./CardPayment.css";

export default function CardPayment({
  onPay,
  deliveryDate,
  cartItems,
  price,
  discount,
  platformFee,
  totalAmount
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const isValid =
    cardNumber.length === 16 &&
    name.length > 2 &&
    expiry.length === 5 &&
    cvv.length === 3;

  return (
    <div className="card-layout">

      <div className="card-left">
        <h3>Credit / Debit Cards</h3>

        <p className="card-note">
          Please ensure your card can be used for online transactions.
        </p>

        <input
          type="text"
          placeholder="Card Number"
          maxLength="16"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
        />

        <input
          type="text"
          placeholder="Name on Card"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="card-row">
          <input
            type="text"
            placeholder="Valid Thru (MM/YY)"
            maxLength="5"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />

          <input
            type="password"
            placeholder="CVV"
            maxLength="3"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <button
          className="card-pay-btn"
          disabled={!isValid}
          onClick={onPay}
        >
          Pay Now
        </button>
      </div>


    </div>
  );
}