import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "./cartSlice";
import { selectCartItems } from "./cartSelectors";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems) || [];

  const total = cartItems.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + price * qty;
  }, 0);

  return (
    <div className="cart-container">

      <div className="checkout-steps">
        <div className="step active">
          <div className="circle">1</div>
          <p>My Cart</p>
        </div>

        <div className="line"></div>

        <div className="step">
          <div className="circle">2</div>
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
        <button className="back-btn" onClick={() => navigate("/")}>
          Back to HomePage
        </button>
        </div>
      <h2 className="cart-title">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <h3>Your Cart is Empty</h3>

          <button
            className="continue-btn"
            onClick={() => navigate("/address")}
          >
            Go to Address Page
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-card">
                <img src={item.thumbnail} alt={item.title} />

                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p className="item-price">₹{item.price}</p>

                  <div className="quantity">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(1, item.quantity - 1),
                          })
                        )
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btnn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p className="total-text">Total Amount:</p>
            <h2 className="total-price">₹{total.toFixed(2)}</h2>

            <button
              className="continue-button"
              onClick={() => navigate("/address")}
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
}