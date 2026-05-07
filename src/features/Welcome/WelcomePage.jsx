import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  FaMapMarkerAlt,
  FaShoppingBag,
  FaUserCircle,
  FaUser,
  FaHeart,
  FaBox,
  FaSignOutAlt,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaAppleAlt,
  FaCouch,
  FaSprayCan,
  FaSpa
} from "react-icons/fa";

import "./WelcomePage.css";

import { logout } from "../auth/authSlice";
import { clearCart } from "../cart/cartSlice";

import Categories from "../Welcome/Categories";

export default function WelcomePage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [cartCount, setCartCount] = useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const [currentSlide, setCurrentSlide] =
    useState(0);

  const [selectedCategory, setSelectedCategory] =
    useState("beauty");

  const dropdownRef = useRef();

  const categories = [
    {
      name: "Beauty",
      slug: "beauty",
      icon: <FaSpa />
    },
    {
      name: "Groceries",
      slug: "groceries",
      icon: <FaAppleAlt />
    },
    {
      name: "Furniture",
      slug: "furniture",
      icon: <FaCouch />
    },
    {
      name: "Fragrances",
      slug: "fragrances",
      icon: <FaSprayCan />
    }
  ];

  const slides = [
    {
      image:
        "https://t4.ftcdn.net/jpg/02/32/16/07/360_F_232160763_FuTBWDd981tvYEJFXpFZtolm8l4ct0Nz.jpg",

      title: "Upgrade Your Lifestyle",

      desc:
        "Discover premium collections with unbeatable prices"
    },

    {
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",

      title: "Trendy Fashion Deals",

      desc:
        "Stay ahead with the latest styles"
    },

    {
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",

      title: "Smart Gadgets",

      desc:
        "Latest tech at your fingertips"
    }
  ];

  const loadUserData = () => {
    try {
      const authUser =
        localStorage.getItem("auth_user");

      const normalUser =
        localStorage.getItem("user");

      let storedUser = null;

      if (authUser) {
        storedUser = JSON.parse(authUser);
      } else if (normalUser) {
        storedUser = JSON.parse(normalUser);
      }

      if (storedUser) {
        const userName =
          storedUser.username ||
          storedUser.name ||
          storedUser.email?.split("@")[0] ||
          storedUser.user?.username ||
          storedUser.user?.name ||
          storedUser.user?.email?.split("@")[0];

        setUser(userName || "User");
      } else {
        setUser(null);
      }

      const cart =
        JSON.parse(localStorage.getItem("cart")) ||
        [];

      const wishlist =
        JSON.parse(
          localStorage.getItem("wishlist")
        ) || [];

      setCartCount(cart.length);

      setWishlistCount(wishlist.length);
    } catch (error) {
      console.log(error);

      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();

    window.addEventListener(
      "focus",
      loadUserData
    );

    return () => {
      window.removeEventListener(
        "focus",
        loadUserData
      );
    };
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      loadUserData();
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % slides.length
      );
    }, 4000);

    return () =>
      clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (
      e
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    dispatch(clearCart());

    dispatch(logout());

    localStorage.removeItem("cart");

    localStorage.removeItem(
      "wishlist"
    );

    localStorage.removeItem(
      "auth_user"
    );

    localStorage.removeItem("user");

    window.dispatchEvent(
      new Event("storage")
    );

    setUser(null);

    setCartCount(0);

    setWishlistCount(0);

    setShowDropdown(false);

    navigate("/");
  };

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    );
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) %
        slides.length
    );
  };

  return (
    <div className="wp-container">
      <header className="wp-topbar">
        <div
          className="wp-logo"
          onClick={() => navigate("/")}
        >
          ShopSphere
        </div>

        <div className="wp-location">
          <FaMapMarkerAlt />

          <span>
            Enable Location Access
          </span>
        </div>

        <input
          className="wp-search"
          placeholder="Search for products, brands and more..."
        />

        <div className="wp-actions">
          <button className="wp-seller">
            Become a Seller
          </button>

          {user ? (
            <div
              className="wp-user"
              ref={dropdownRef}
            >
              <div
                className="wp-user-info"
                onClick={() =>
                  setShowDropdown(
                    !showDropdown
                  )
                }
              >
                <FaUserCircle />

                <span>{user}</span>
              </div>

              {showDropdown && (
                <div className="wp-dropdown">
                  <div
                    onClick={() =>
                      navigate("/account")
                    }
                  >
                    <FaUser />
                    Your Account
                  </div>

                  <div
                    onClick={() =>
                      navigate("/profile")
                    }
                  >
                    <FaUserCircle />
                    My Profile
                  </div>

                  <div
                    onClick={() =>
                      navigate("/orders")
                    }
                  >
                    <FaBox />
                    Orders
                  </div>

                  <div
                    onClick={() =>
                      navigate("/wishlist")
                    }
                  >
                    <FaHeart />
                    Wishlists

                    {wishlistCount >
                      0 && (
                      <span className="dropdown-cart-count">
                        {
                          wishlistCount
                        }
                      </span>
                    )}
                  </div>

                  <div
                    onClick={() =>
                      navigate("/cart")
                    }
                  >
                    <FaShoppingCart />
                    My Cart

                    {cartCount > 0 && (
                      <span className="dropdown-cart-count">
                        {cartCount}
                      </span>
                    )}
                  </div>

                  <div
                    className="logout"
                    onClick={
                      handleLogout
                    }
                  >
                    <FaSignOutAlt />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="wp-login"
              onClick={() =>
                navigate("/login")
              }
            >
              Login/Signup
            </button>
          )}
        </div>
      </header>

     <div className="welcome-categories">
  {categories.map((cat, index) => (
    <div
      key={index}
      className={`welcome-category-item ${
        selectedCategory === cat.slug
          ? "active"
          : ""
      }`}
      onClick={() =>
        setSelectedCategory(cat.slug)
      }
    >
      <div className="welcome-category-icon">
        {cat.icon}
      </div>

      <span>{cat.name}</span>
    </div>
  ))}
</div>

      <section
        className="wp-hero"
        style={{
          backgroundImage: `url(${slides[currentSlide].image})`
        }}
      >
        <div className="overlay"></div>

        <button
          className="arrow left"
          onClick={prevSlide}
        >
          <FaChevronLeft />
        </button>

        <div className="wp-hero-content">
          <h1>
            {
              slides[currentSlide]
                .title
            }
          </h1>

          <p>
            {
              slides[currentSlide]
                .desc
            }
          </p>

          <button
            className="wp-btn"
            onClick={() =>
              navigate("/home")
            }
          >
            <FaShoppingBag />
            Start Shopping
          </button>
        </div>

        <button
          className="arrow right"
          onClick={nextSlide}
        >
          <FaChevronRight />
        </button>
      </section>

      <Categories
        selectedCategory={
          selectedCategory
        }
      />
    </div>
  );
}