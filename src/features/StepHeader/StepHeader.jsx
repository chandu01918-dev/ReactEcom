import { useNavigate } from "react-router-dom";
import "./StepHeader.css";

export default function StepHeader({
  currentStep,
  cartItems = [],
  address,
  onConfirm
}) {
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      label: "My Cart",
      action: () => {
        if (cartItems.length === 0) return;
        navigate("/cart");
      }
    },
    {
      id: 2,
      label: "Address",
      action: () => navigate("/address")
    },
    {
      id: 3,
      label: "Payment",
      action: () => {
        if (!address) return;
        navigate("/payment", { state: { address } });
      }
    },
    {
      id: 4,
      label: "Order Confirm",
      action: () => {
        if (!address || cartItems.length === 0) return;
        onConfirm && onConfirm();
      }
    }
  ];

  return (
    <div className="step-wrapper">
      {steps.map((step, index) => {
        const isActive = currentStep >= step.id;
        const isDone = currentStep > step.id;

        return (
          <div key={step.id} className="step-container">
            <div
              className={`step ${isActive ? "active" : ""}`}
              onClick={step.action}
            >
              <div
                className={`circle ${
                  isDone ? "done" : isActive ? "active" : ""
                }`}
              >
                {step.id}
              </div>
              <p>{step.label}</p>
            </div>
            {index !== steps.length - 1 && <div className="line"></div>}
          </div>
        );
      })}
    </div>
  );
}