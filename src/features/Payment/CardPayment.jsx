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
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!/^[a-zA-Z ]{3,}$/.test(name.trim())) {
      newErrors.name = "Enter valid name";
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Format MM/YY required";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;

      if (month < 1 || month > 12) {
        newErrors.expiry = "Invalid month";
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = "Card expired";
      }
    }

    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePay = () => {
    if (validate()) {
      onPay();
    }
  };

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
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}

        <input
          type="text"
          placeholder="Name on Card"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <div className="card-row">
          <div>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
            />
            {errors.expiry && <p className="error">{errors.expiry}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="CVV"
              maxLength="3"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            />
            {errors.cvv && <p className="error">{errors.cvv}</p>}
          </div>
        </div>

        <button className="card-pay-btn" onClick={handlePay}>
          Pay Now
        </button>
      </div>
    </div>
  );
}