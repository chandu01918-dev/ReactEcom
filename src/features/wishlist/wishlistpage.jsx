import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../wishlist/wishlistSlice";
import { selectWishlistItems } from "../wishlist/wishlistSelectors";
import "./wishlistpage.css";

export default function WishlistPage() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems) || [];

  if (!wishlistItems.length) {
    return (
      <div className="wishlist-empty">
        <h2>Your Wishlist is Empty</h2>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>

      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-card">
            <img src={item.image} alt={item.title} />

            <h3 className="title">{item.title}</h3>
            <p className="brand">{item.brand}</p>
            <p className="price">₹{item.price}</p>

            <div className="wishlist-actions">
              <button className="add-btn">Add to Cart</button>

              <button
                className="wishlist-btn"
                onClick={() => dispatch(removeFromWishlist(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}