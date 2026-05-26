import "./FeaturedDeals.css";
import {
  FaShippingFast,
  FaShieldAlt,
  FaUndoAlt,
  FaHeadset,
} from "react-icons/fa";

export default function FeaturedDeals() {
  const categories = [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b",
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  ];

  return (
    <section className="featuredDeals">
      <div className="featuredDealsTop">
        <div className="dealCard dark">
          <div className="dealContent">
            <span>Featured Deals</span>
            <h2>Up to 50% OFF For The Summer</h2>
            <button>Explore Now</button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt=""
          />
        </div>

        <div className="dealRight">
          <div className="dealCard beige">
            <div className="dealContent">
              <span>Special Deal</span>
              <h2>Up to 10% OFF For The First Buying</h2>
              <button>Shop Now</button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
              alt=""
            />
          </div>

          <div className="dealCard green">
            <div className="dealContent">
              <span>Big Deal</span>
              <h2>Up to 60% OFF The Accessories</h2>
              <button>Shop Now</button>
            </div>

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
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
            <img src={`${item}?w=500`} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}