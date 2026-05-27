import "./FeaturedDeals.css";
import {
  FaShippingFast,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function FeaturedDeals() {
  const navigate = useNavigate();

  const categories = [
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&w=500&q=80",
  ];

  return (
    <section className="featuredDeals">
      <div className="featuredDealsTop">
        <div className="dealCard dark">
          <div className="dealContent">
            <span>Featured Deals</span>
            <h2>Up to 50% OFF For The Summer</h2>

            <button onClick={() => navigate("/home")}>
              Explore Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
            alt=""
          />
        </div>

        <div className="dealRight">
          <div className="dealCard beige">
            <div className="dealContent">
              <span>Special Deal</span>
              <h2>Up to 10% OFF For The First Buying</h2>

              <button onClick={() => navigate("/home")}>
                Shop Now
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"
              alt=""
            />
          </div>

          <div className="dealCard green">
            <div className="dealContent">
              <span>Big Deal</span>
              <h2>Up to 60% OFF The Accessories</h2>

              <button onClick={() => navigate("/home")}>
                Shop Now
              </button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=80"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="trustSection">
        <h3>Why Thousands Trust Us For Style & Tech</h3>

        <div className="trustGrid">
          <div className="trustItem">
            <FaShippingFast />
            <span>Free & Fast Shipping</span>
          </div>

          <div className="trustItem">
            <FaShieldAlt />
            <span>Secure Checkout</span>
          </div>

          <div className="trustItem">
            <FaUndoAlt />
            <span>Easy 7-Day Returns</span>
          </div>

          <div className="trustItem">
            <FaHeadset />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="categoryGrid">
        {categories.map((item, index) => (
          <div className="categoryCard" key={index}>
            <img src={item} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}