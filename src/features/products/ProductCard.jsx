import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../cart/cartSlice";
import { addToWishlist, removeFromWishlist } from "../wishlist/wishlistSlice";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const wishlist = useSelector(state => state.wishlist.items);
  const inCart = cart.some(i => i.id === product.id);
  const inWishlist = wishlist.some(i => i.id === product.id);

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
          onClick={() =>
            inCart
              ? dispatch(removeFromCart(product.id))
              : dispatch(addToCart(product))
          }
        >
          <FaShoppingCart style={{marginRight:"6px"}}/>
          {inCart ? "Remove Cart" : "Add to Cart"}
        </button>

        <button
          className="wish"
          onClick={() =>
            inWishlist
              ? dispatch(removeFromWishlist(product.id))
              : dispatch(addToWishlist(product))
          }
        >
          <FaHeart style={{marginRight:"6px"}}/>
          {inWishlist ? "Remove Wishlist" : "Add to Wishlist"}
        </button>

      </div>

    </div>
  );
}