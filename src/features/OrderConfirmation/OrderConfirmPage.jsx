import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./OrderConfirm.css";

export default function OrderConfirm() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const method = state?.method || "COD";
  const totalAmount = state?.totalAmount || 0;
  const address = state?.address;

  const generateOrderId = () => {
    const num = Math.floor(100000 + Math.random() * 900000);
    return `ORD${num}`;
  };

  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("PLACED");

  useEffect(() => {
    let finalOrderId = state?.orderId;

    if (!finalOrderId) {
      const storedOrderId = localStorage.getItem("orderId");

      if (storedOrderId) {
        finalOrderId = storedOrderId;
      } else {
        finalOrderId = generateOrderId();
        localStorage.setItem("orderId", finalOrderId);
      }
    }

    setOrderId(finalOrderId);
  }, [state]);

  useEffect(() => {
    const now = Date.now();

    let orderTime = Number(localStorage.getItem("orderTime"));

    if (!orderTime) {
      orderTime = now;
      localStorage.setItem("orderTime", orderTime);
    }

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const deliveryTime = todayEnd.getTime();
    const totalDuration = deliveryTime - orderTime;

    const updateStatus = () => {
      const current = Date.now();
      const progress = (current - orderTime) / totalDuration;

      if (progress >= 1) {
        setStatus("DELIVERED");
      } else if (progress >= 0.75) {
        setStatus("SHIPPED");
      } else if (progress >= 0.4) {
        setStatus("PROCESSING");
      } else {
        setStatus("PLACED");
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const getPaymentText = () => {
    if (method === "COD") {
      return `Cash on Delivery\nPay ₹${totalAmount} on delivery`;
    }
    if (method === "UPI") return "Paid via UPI";
    if (method === "CARD") return "Paid using Card";
    if (method === "EMI") return "EMI Payment Selected";
  };

  const isActive = (step) => {
    const order = ["PLACED", "PROCESSING", "SHIPPED", "DELIVERED"];
    return order.indexOf(status) >= order.indexOf(step);
  };

  const displayDate = new Date().toLocaleDateString();

  return (
    <div className="addr-wrapper">

      <div className="addr-steps">
        <div className="step active">
          <div className="circle done">1</div>
          <p>My Cart</p>
        </div>

        <div className="line"></div>

        <div className="step active">
          <div className="circle done">2</div>
          <p>Address</p>
        </div>

        <div className="line"></div>

        <div className="step active">
          <div className="circle done">3</div>
          <p>Payment</p>
        </div>

        <div className="line"></div>

        <div className="step active">
          <div className="circle active">4</div>
          <p>Order Confirm</p>
        </div>
      </div>

      <div className="oc-wrapper">
        <div className="oc-card">

          <div className="success-icon">✓</div>

          <h2>Payment Successful</h2>
          <h3>Your order has been confirmed successfully</h3>
          <h4>Order ID # {orderId}</h4>

          <div className="oc-progress">

            <div className="oc-step">
              <div className={`oc-circle ${isActive("PLACED") ? "active" : ""}`}></div>
              <p>Order Placed</p>
            </div>

            <div className="oc-line"></div>

            <div className="oc-step">
              <div className={`oc-circle ${isActive("PROCESSING") ? "active" : ""}`}></div>
              <p>Processing</p>
            </div>

            <div className="oc-line"></div>

            <div className="oc-step">
              <div className={`oc-circle ${isActive("SHIPPED") ? "active" : ""}`}></div>
              <p>Shipped</p>
            </div>

            <div className="oc-line"></div>

            <div className="oc-step">
              <div className={`oc-circle ${isActive("DELIVERED") ? "active" : ""}`}></div>
              <p>Delivered</p>
            </div>

          </div>

          <div className="oc-info-box">

            <p className="oc-subtitle">
              You'll receive shipping updates as your order progresses.
            </p>

            <div className="oc-grid">

              <div>
                <h4>Order Details</h4>
                <p>Delivery by {displayDate}</p>
                <p>Order ID # {orderId}</p>
              </div>

              <div>
                <h4>Billing Address</h4>
                <p>{address?.name}</p>
                <p>{address?.house}, {address?.street}</p>
                <p>{address?.city} - {address?.pincode}</p>
                <p>{address?.district}, {address?.state}</p>
                <p>{address?.phone}</p>
              </div>

            </div>

            <div className="oc-grid">

              <div>
                <h4>Payment Details</h4>
                <p style={{ whiteSpace: "pre-line" }}>
                  {getPaymentText()}
                </p>
              </div>

              <div>
                <h4>Shipping Address</h4>
                <p>{address?.name}</p>
                <p>{address?.house}, {address?.street}</p>
                <p>{address?.city} - {address?.pincode}</p>
                <p>{address?.district}, {address?.state}</p>
                <p>{address?.phone}</p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}