import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaShoppingBag,
  FaMobileAlt,
  FaLaptop,
  FaTshirt,
  FaAppleAlt,
  FaCouch,
  FaCar,
  FaTags
} from "react-icons/fa";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  const categories = [
    { name: "Smartphones", icon: <FaMobileAlt /> },
    { name: "Laptops", icon: <FaLaptop /> },
    { name: "Fashion", icon: <FaTshirt /> },
    { name: "Groceries", icon: <FaAppleAlt /> },
    { name: "Home Essentials", icon: <FaCouch /> },
    { name: "Automotive", icon: <FaCar /> },
    { name: "Accessories", icon: <FaTags /> }
  ];

  return (
    <div className="wp-container">

      <header className="wp-topbar">
        <div className="wp-logo">ShopSphere</div>

        <div className="wp-location">
          <FaMapMarkerAlt />
          <span>Delivering to your location</span>
        </div>

        <input
          className="wp-search"
          placeholder="Search for products, brands and more..."
        />

        <div className="wp-actions">
          <button className="wp-seller">Become a Seller</button>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>

      <div className="wp-categories">
        {categories.map((cat, index) => (
          <span key={index} className="wp-cat-item">
            {cat.icon}
            {cat.name}
          </span>
        ))}
      </div>

      <section className="wp-hero">

        <div className="wp-left">
          <h4>Everything you need, all in one place</h4>

          <h1>Upgrade Your Lifestyle Today</h1>

          <p>
            Browse top categories, discover trending products, and enjoy seamless shopping with fast delivery and great prices.
          </p>

          <button
            className="wp-btn"
            onClick={() => navigate("/home")}
          >
            <FaShoppingBag />
            <span>Start Shopping</span>
          </button>
        </div>

        <div className="wp-right">
          <img
            src="https://images.unsplash.com/photo-1520975916090-3105956dac38"
            alt="shopping"
          />
        </div>

      </section>

    </div>
  );
}