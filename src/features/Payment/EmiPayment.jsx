import { useState } from "react";
import "./EmiPayment.css";

export default function EmiPayment({
  onPay,
  deliveryDate,
  cartItems,
  price,
  discount,
  platformFee,
  totalAmount
}) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedBank, setSelectedBank] = useState("");

  const banks = [
    { name: "HDFC", rate: 12 },
    { name: "ICICI", rate: 13 },
    { name: "SBI", rate: 11 }
  ];

  const tenures = [3, 6, 9];

  const calculateEMI = (P, r, n) => {
    const monthlyRate = r / 12 / 100;
    return Math.round(
      (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
        (Math.pow(1 + monthlyRate, n) - 1)
    );
  };

  const selectedBankObj = banks.find(b => b.name === selectedBank);

  const emi =
    selectedPlan && selectedBankObj
      ? calculateEMI(totalAmount, selectedBankObj.rate, selectedPlan)
      : 0;

  const totalPayable = emi * (selectedPlan || 0);

  return (
    <div className="emi-layout">

      <div className="emi-left">
        <h3>EMI Options</h3>

        <div className="emi-bank">
          {banks.map((bank) => (
            <div
              key={bank.name}
              className={`emi-bank-card ${selectedBank === bank.name ? "active" : ""}`}
              onClick={() => setSelectedBank(bank.name)}
            >
              {bank.name}
              <span>{bank.rate}%</span>
            </div>
          ))}
        </div>

        <div className="emi-options">
          {tenures.map((months) => (
            <div
              key={months}
              className={`emi-card ${selectedPlan === months ? "active" : ""}`}
              onClick={() => setSelectedPlan(months)}
            >
              <p>{months} Months</p>
              {selectedBankObj && (
                <span>
                  ₹{calculateEMI(totalAmount, selectedBankObj.rate, months)}/mo
                </span>
              )}
            </div>
          ))}
        </div>

        {selectedPlan && selectedBankObj && (
          <div className="emi-breakdown">
            <p>Monthly EMI: ₹{emi}</p>
            <p>Total Payable: ₹{totalPayable}</p>
          </div>
        )}

        <button
          className="emi-pay-btn"
          disabled={!selectedPlan || !selectedBank}
          onClick={onPay}
        >
          Continue
        </button>
      </div>

      

    </div>
  );
}