import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../cart/cartSlice";
import { removeFromWishlist } from "../wishlist/wishlistSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ ranges, selected, setSelected }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist.items);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <aside className="sidebar">
      <div className="section">
        <h3 className="section-title">Price Filter</h3>

        {ranges.map((r) => (
          <label key={r.label} className="filter-item">
            <input
              type="checkbox"
              checked={selected.includes(r.label)}
              onChange={() =>
                setSelected((prev) =>
                  prev.includes(r.label)
                    ? prev.filter((x) => x !== r.label)
                    : [...prev, r.label]
                )
              }
            />
            {r.label}
          </label>
        ))}

        <button className="clear-bt" onClick={() => setSelected([])}>
          Clear Filters
        </button>
      </div>

      <hr />

      <div className="section">
        <h3 className="section-title">
          <FaShoppingCart /> Cart Items
        </h3>

        {cart.length === 0 ? (
          <p className="empty-text">Cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id} className="item-card">
                <div className="item-content">
                  <p className="item-title">{item.title}</p>
                  <span className="item-price">₹{item.price}</span>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="total-box">
              Total: ₹{total.toFixed(2)}
            </div>

            <button
              className="continue-btn"
              onClick={() => navigate("/cart")}
            >
              Go To Cart Page
            </button>
          </>
        )}
      </div>

      <hr />

      <div className="section">
        <h3 className="section-title">
          <FaHeart /> Wishlist Items
        </h3>

        {wishlist.length === 0 ? (
          <p className="empty-text">Wishlist is empty</p>
        ) : (
          wishlist.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-content">
                <p className="item-title">{item.title}</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}