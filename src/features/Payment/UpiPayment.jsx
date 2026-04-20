import { useState } from "react";
import "./UpiPayment.css";

export default function UpiPayment({ onPay }) {
  const [selectedApp, setSelectedApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [verified, setVerified] = useState(false);

  const handleAppSelect = (app) => {
    setSelectedApp(app);
    setVerified(false);
  };

  const verifyUpi = () => {
    if (upiId.includes("@") && upiId.length > 5) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  };

  return (
    <div className="upi-container">
      <h3>UPI (Pay Via Any App)</h3>

      <div className="upi-radio">
        <input type="radio" checked readOnly />
        <span>Pay with any UPI App</span>
      </div>

      <div className="upi-apps">
        <div
          className={`upi-app ${selectedApp === "gpay" ? "active" : ""}`}
          onClick={() => handleAppSelect("gpay")}
        >
          <img src="/Images/gpay.png" alt="gpay" />
        </div>

        <div
          className={`upi-app ${selectedApp === "phonepe" ? "active" : ""}`}
          onClick={() => handleAppSelect("phonepe")}
        >
          <img src="/Images/phonepe.png" alt="phonepe" />
        </div>

        <div
          className={`upi-app ${selectedApp === "paytm" ? "active" : ""}`}
          onClick={() => handleAppSelect("paytm")}
        >
          <img src="/Images/paytm.png" alt="paytm" />
        </div>

        <div
          className={`upi-app ${selectedApp === "bhim" ? "active" : ""}`}
          onClick={() => handleAppSelect("bhim")}
        >
          <img src="/Images/bhim.png" alt="bhim" />
        </div>
      </div>

      <div className="upi-or">------ or ------</div>

      <p>Pay with UPI ID</p>

      <div className="upi-input">
        <input
          type="text"
          placeholder="example@okicici"
          value={upiId}
          onChange={(e) => {
            setUpiId(e.target.value);
            setVerified(false);
          }}
        />
        <button onClick={verifyUpi}>verify</button>
      </div>

      <button
        className="upi-pay-btn"
        disabled={!selectedApp && !verified}
        onClick={onPay}
      >
        Pay Now
      </button>
    </div>
  );
}