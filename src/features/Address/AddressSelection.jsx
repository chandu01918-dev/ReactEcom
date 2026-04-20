import { useSelector, useDispatch } from "react-redux";
import { deleteAddress } from "./addressSlice";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import "./AddressSelection.css";

export default function AddressSelection() {
  const addresses = useSelector((state) => state.address?.list || []);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  

  const selectedAddress = addresses.find((a) => a.id === selectedId);

  const deliveryDate = useMemo(() => {
    const baseDays = 2;
    const extraDays = cartItems.length > 3 ? 2 : cartItems.length > 1 ? 1 : 0;
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
    return cartItems.reduce((acc, item) => acc + (item.price || 0), 0);
  }, [cartItems]);

  const discount = useMemo(() => {
    return Math.floor(price * 0.5);
  }, [price]);

  const platformFee = useMemo(() => {
    return price > 500 ? 0 : 40;
  }, [price]);

  const totalAmount = useMemo(() => {
    return price - discount + platformFee;
  }, [price, discount, platformFee]);

  const handleDelete = () => {
    dispatch(deleteAddress(confirmId));
    setConfirmId(null);
  };

  

  return (
    <div className="addr-wrapper">
      <div className="addr-steps">
        <div className="step active">
          <div className="circle done">1</div>
          <p>My Cart</p>
        </div>

        <div className="line"></div>

        <div className="step active">
          <div className="circle active">2</div>
          <p>Address</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="circle">3</div>
          <p>Payment</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="circle">4</div>
          <p>Order Confirm</p>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="back-btn" onClick={() => navigate("/cart")}>
          Back to My Cart
        </button>
      </div>

      <div className="addr-container">
        <div className="addr-left">
          <div className="addr-header">
            <h3>Select Delivery Address</h3>
            <button
              className="addr-primary-btn addr-small"
              onClick={() => navigate("/address-book")}
            >
              ADD NEW ADDRESS
            </button>
          </div>

          <p className="addr-default-label">DEFAULT ADDRESS</p>

          {addresses.map((a) => (
            <div key={a.id} className="addr-card">
              <div className="addr-top">
                <input
                  type="radio"
                  name="address"
                  checked={selectedId === a.id}
                  onChange={() => setSelectedId(a.id)}
                />

                <div className="addr-name-row">
                  <strong>{a.name}</strong>
                  <span className="addr-tag">{a.type}</span>
                </div>
              </div>

              <div className="addr-details">
                <p>{a.house}, {a.street}</p>
                <p>{a.city} - {a.pincode}</p>
                <p className="addr-light">{a.district}, {a.state}</p>
                <p className="addr-phone"><strong>Mobile:</strong> {a.phone}</p>
                <p className="addr-cod">Cash on Delivery available</p>
              </div>

              <div className="addr-actions">
                <button
                  className="addr-outline-btn"
                  onClick={() => setConfirmId(a.id)}
                >
                  REMOVE
                </button>

                <button
                  className="addr-outline-btn"
                  onClick={() =>
                    navigate("/address-book", { state: { address: a } })
                  }
                >
                  EDIT
                </button>
              </div>
            </div>
          ))}

          <div
            className="addr-add-new"
            onClick={() => navigate("/address-book")}
          >
            + Add New Address
          </div>
        </div>

        <div className="addr-right">
          <h4>ESTIMATES DELIVERY TIME</h4>
          <p className="addr-date">{deliveryDate}</p>

          <div className="addr-row">
            <span>Price ({cartItems.length} items)</span>
            <span>₹{price}</span>
          </div>

          <div className="addr-row addr-discount">
            <span>Discount (10%)</span>
            <span>- ₹{discount}</span>
          </div>

          <div className="addr-row">
            <span>Delivary Fee</span>
            <span>₹{platformFee}</span>
          </div>

          <hr />

          <div className="addr-total">
            <strong>Total Amount</strong>
            <strong>₹{totalAmount}</strong>
          </div>

          <p className="addr-save">You will save ₹{discount}</p>

          <button
            className="addr-primary-btn addr-full"
            disabled={!selectedId || cartItems.length === 0}
            onClick={() => {
              if (!selectedId) return;
              if (cartItems.length === 0) return;
              navigate("/payment", { state: { address: selectedAddress } });
            }}
          >
            Continue
          </button>
        </div>
      </div>

      {confirmId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <p>Are you sure you want to delete the address?</p>
            <div className="confirm-actions">
              <button
                className="addr-outline-btn"
                onClick={() => setConfirmId(null)}
              >
                No
              </button>
              <button
                className="addr-primary-btn"
                onClick={handleDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}