import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../wishlist/wishlistSlice";
import { addToCart } from "../cart/cartSlice";
import { selectWishlistItems } from "../wishlist/wishlistSelectors";
import { useNavigate } from "react-router-dom";
import "./wishlistpage.css";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector(selectWishlistItems) || [];

  return (
    <div className="wl-container">

      <h2 className="wl-title">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="wl-empty">
          <h2>Your Wishlist is Empty</h2>
          <button
            className="wl-continue-btn"
            onClick={() => navigate("/home")}
          >
            Back To Home Page
          </button>
        </div>
      ) : (
        <>
          {wishlistItems.map((item) => (
            <div key={item.id} className="wl-row">

              <img
                src={item.thumbnail}
                alt={item.title}
                className="wl-img"
              />

              <div className="wl-info">
                <h3 className="wl-name">{item.title}</h3>
                <p className="wl-price">₹{item.price}</p>

                <div className="wl-actions">

                  <button
                    className="wl-add-btn"
                    onClick={() => {
                      dispatch(addToCart(item));
                      dispatch(removeFromWishlist(item.id));
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="wl-remove-btn"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    Remove
                  </button>

                </div>
              </div>

            </div>
          ))}

          <div className="wl-footer">
            <button
              className="wl-continue-btn"
              onClick={() => navigate("/home")}
            >
              Back To Home Page
            </button>
          </div>
        </>
      )}

    </div>
  );
}