import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import UpiPayment from "../Payment/UpiPayment";
import CardPayment from "../Payment/CardPayment";
import EmiPayment from "./EmiPayment";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [method, setMethod] = useState("COD");

  const cartItems = useSelector((state) => state.cart.items || []);
  const address = state?.address;

  const deliveryDate = useMemo(() => {
    const baseDays = 2;
    const extraDays =
      cartItems.length > 3 ? 2 : cartItems.length > 1 ? 1 : 0;
    const totalDays = baseDays + extraDays;
    const date = new Date();
    date.setDate(date.getDate() + totalDays);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }, [cartItems]);

  const price = useMemo(() => {
    return Number(
      cartItems.reduce((acc, item) => acc + (item.price || 0), 0).toFixed(2)
    );
  }, [cartItems]);

  const discount = useMemo(() => {
    return Number((price * 0.1).toFixed(2));
  }, [price]);

  const platformFee = useMemo(() => {
    return price > 500 ? 0 : 40;
  }, [price]);

  const codFee = method === "COD" ? 10 : 0;

  const totalAmount = useMemo(() => {
    return Number((price - discount + platformFee + codFee).toFixed(2));
  }, [price, discount, platformFee, codFee]);

  const handleOrder = () => {
    if (!address || cartItems.length === 0) return;

    navigate("/orderconfirm", {
      state: {
        method,
        totalAmount,
        deliveryDate,
        address
      }
    });
  };

  return (
    <div className="addr-wrapper">

      <div className="addr-steps">
        <div
          className="step active"
          onClick={() => {
            if (cartItems.length === 0) return;
            navigate("/cart");
          }}
        >
          <div className="circle done">1</div>
          <p>My Cart</p>
        </div>

        <div className="line"></div>

        <div
          className="step active"
          onClick={() => navigate("/address")}
        >
          <div className="circle done">2</div>
          <p>Address</p>
        </div>

        <div className="line"></div>

        <div
          className="step active"
          onClick={() => {
            if (!address) return;
            navigate("/payment", { state: { address } });
          }}
        >
          <div className="circle active">3</div>
          <p>Payment</p>
        </div>

        <div className="line"></div>

        <div
          className="step"
          onClick={() => {
            if (!address || cartItems.length === 0) return;
            handleOrder();
          }}
        >
          <div className="circle">4</div>
          <p>Order Confirm</p>
        </div>
      </div>

      <div className="nav-buttons">
        <button
          className="back-btn"
          onClick={() => navigate("/address")}
        >
          Back to Address
        </button>
      </div>

      <div className="payment-layout">
        <div className="payment-card">

          <div className="payment-left">
            <h3>Choose Payment Mode</h3><br />

            <div
              className={`pay-option ${method === "COD" ? "active" : ""}`}
              onClick={() => setMethod("COD")}
            >
              Cash On Delivery
            </div>

            <div
              className={`pay-option ${method === "UPI" ? "active" : ""}`}
              onClick={() => setMethod("UPI")}
            >
              UPI (Pay Via Any App)
            </div>

            <div
              className={`pay-option ${method === "CARD" ? "active" : ""}`}
              onClick={() => setMethod("CARD")}
            >
              Credit / Debit Cards
            </div>

            <div
              className={`pay-option ${method === "EMI" ? "active" : ""}`}
              onClick={() => setMethod("EMI")}
            >
              EMI
            </div>
          </div>

          <div className="payment-middle">

            {method === "COD" && (
              <>
                <h3>Cash On Delivery</h3>

                <label className="radio-row">
                  <input type="radio" checked readOnly />
                  Cash On Delivery
                </label>

                <p className="note">
                  A fee of ₹10 is applicable for this option.
                </p>

                <button className="continue-btn" onClick={handleOrder}>
                  Continue
                </button>
              </>
            )}

            {method === "UPI" && <UpiPayment onPay={handleOrder} />}

            {method === "CARD" && (
              <CardPayment
                onPay={handleOrder}
                deliveryDate={deliveryDate}
                cartItems={cartItems}
                price={price}
                discount={discount}
                platformFee={platformFee}
                totalAmount={totalAmount}
              />
            )}

            {method === "EMI" && (
              <EmiPayment
                onPay={handleOrder}
                deliveryDate={deliveryDate}
                cartItems={cartItems}
                price={price}
                discount={discount}
                platformFee={platformFee}
                totalAmount={totalAmount}
              />
            )}

          </div>

          <div className="payment-summary-inside">
            <h4>ESTIMATED DELIVERY TIME</h4>
            <p className="summary-date">{deliveryDate}</p>

            <div className="summary-row">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{price.toFixed(2)}</span>
            </div>

            <div className="summary-row discount">
              <span>Discount (10%)</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{platformFee.toFixed(2)}</span>
            </div>

            {method === "COD" && (
              <div className="summary-row">
                <span>COD Fee</span>
                <span>₹{codFee.toFixed(2)}</span>
              </div>
            )}

            <div className="divider"></div>

            <div className="summary-total">
              <strong>Total Amount</strong>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}