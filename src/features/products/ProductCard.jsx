import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { addToWishlist } from "../wishlist/wishlistSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card">

      <img
        src={product.thumbnail}
        alt={product.title}
        loading="lazy"
      />

      <h3 className="title">{product.title}</h3>

      <p>{product.brand}</p>

      <h4>₹{product.price}</h4>

      <div className="buttons">

        <button
          onClick={() => dispatch(addToCart(product))}
        >
          <FaShoppingCart style={{ marginRight: "6px" }} />
          Add to Cart
        </button>

        <button
          className="wish"
          onClick={() => dispatch(addToWishlist(product))}
        >
          <FaHeart style={{ marginRight: "6px" }} />
          Add to Wishlist
        </button>

      </div>

    </div>
  );
}