import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../products/productsSlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import Sidebar from "../MainUserInterface/Sidebar";
import {
  FaUserCircle,
  FaUser,
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt
} from "react-icons/fa";
import "../MainUserInterface/Home.css";
import { logout } from "../auth/authSlice";
import { clearCart } from "../cart/cartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector(
    (state) => state.products
  );

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] =
    useState("");

  const [selectedRanges, setSelectedRanges] =
    useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [user, setUser] = useState(null);

  const [showDropdown, setShowDropdown] =
    useState(false);

  const [cartCount, setCartCount] = useState(0);

  const [wishlistCount, setWishlistCount] =
    useState(0);

  const dropdownRef = useRef();

  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
        JSON.parse(localStorage.getItem("cart")) || [];

      const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) ||
        [];

      setCartCount(cart.length);

      setWishlistCount(wishlist.length);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  useEffect(() => {
    loadUserData();

    window.addEventListener("focus", loadUserData);

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

    window.addEventListener("storage", handleStorage);

    return () =>
      window.removeEventListener(
        "storage",
        handleStorage
      );
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  const handleLogout = () => {
    dispatch(clearCart());

    dispatch(logout());

    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("storage"));

    setUser(null);

    setCartCount(0);

    setWishlistCount(0);

    setShowDropdown(false);

    navigate("/");
  };

  const handleGoToTable = () => {
    navigate("/products");
  };

  const handleAddToCart = (product) => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updated = [...cart, product];

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("storage"));

    setCartCount(updated.length);
  };

  const handleAddToWishlist = (product) => {
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) ||
      [];

    const updated = [...wishlist, product];

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("storage"));

    setWishlistCount(updated.length);
  };

  const priceRanges = [
    { label: "₹ 1 - 500", min: 1, max: 500 },
    {
      label: "₹ 501 - 1000",
      min: 501,
      max: 1000
    },
    {
      label: "₹ 1001 - 2000",
      min: 1001,
      max: 2000
    },
    {
      label: "₹ 2001+",
      min: 2001,
      max: Infinity
    }
  ];

  const filtered = useMemo(() => {
    let list = [...items];

    if (debouncedSearch.trim()) {
      list = list.filter((p) =>
        p.title
          .toLowerCase()
          .includes(
            debouncedSearch.toLowerCase()
          )
      );
    }

    if (selectedRanges.length > 0) {
      list = list.filter((product) =>
        selectedRanges.some((label) => {
          const range = priceRanges.find(
            (r) => r.label === label
          );

          return (
            product.price >= range.min &&
            product.price <= range.max
          );
        })
      );
    }

    return list;
  }, [items, debouncedSearch, selectedRanges]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedRanges]);

  const totalPages = Math.ceil(
    filtered.length / itemsPerPage
  );

  const paginatedProducts = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    return filtered.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [filtered, currentPage]);

  if (loading)
    return <h2 className="loading">Loading...</h2>;

  return (
    <div className="home">
      <div className="layout">
        <Sidebar
          ranges={priceRanges}
          selected={selectedRanges}
          setSelected={setSelectedRanges}
        />

        <div className="content">
          <div className="top">
            <input
              className="search-input"
              placeholder="Search products brands and more..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <div className="top-buttons">
              <button
                className="table-btn"
                onClick={handleGoToTable}
              >
                Product Table
              </button>
              <button
    className="table-btn"
    onClick={() => navigate("/")}
  >
   Back  To Welcome Page
  </button>

              {user && (
                <div
                  className="profile-wrapper"
                  ref={dropdownRef}
                >
                  <div
                    className="profile-btn"
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
                    <div className="profile-dropdown">
                      <div
                        onClick={() =>
                          navigate("/account")
                        }
                      >
                        <FaUser />
                        <span>
                          Your Account
                        </span>
                      </div>

                      <div
                        onClick={() =>
                          navigate("/profile")
                        }
                      >
                        <FaUserCircle />
                        <span>
                          My Profile
                        </span>
                      </div>

                      <div
                        onClick={() =>
                          navigate("/orders")
                        }
                      >
                        <FaBox />
                        <span>Orders</span>
                      </div>

                      <div
                        onClick={() =>
                          navigate("/wishlist")
                        }
                      >
                        <FaHeart />
                        <span>
                          Wishlists
                        </span>

                        {wishlistCount > 0 && (
                          <span className="count-badge">
                            {wishlistCount}
                          </span>
                        )}
                      </div>

                      <div
                        onClick={() =>
                          navigate("/cart")
                        }
                      >
                        <FaShoppingCart />
                        <span>My Cart</span>

                        {cartCount > 0 && (
                          <span className="count-badge">
                            {cartCount}
                          </span>
                        )}
                      </div>

                      <div
                        className="logout"
                        onClick={handleLogout}
                      >
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid">
            {paginatedProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() =>
                    handleAddToCart(product)
                  }
                  onAddToWishlist={() =>
                    handleAddToWishlist(
                      product
                    )
                  }
                />
              )
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    currentPage - 1
                  )
                }
              >
                Prev
              </button>

              {[...Array(totalPages)].map(
                (_, index) => (
                  <button
                    key={index}
                    className={
                      currentPage === index + 1
                        ? "active-page"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(
                        index + 1
                      )
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    currentPage + 1
                  )
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}