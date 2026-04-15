import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../products/productsSlice";
import { logout } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import ProductCard from "../products/ProductCard";
import Sidebar from "../MainUserInterface/Sidebar";
import ProductSkeleton from "../products/ProductSkeleton";
import "../MainUserInterface/Home.css";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const priceRanges = [
    { label: "₹ 1 - 500", min: 1, max: 500 },
    { label: "₹ 501 - 1000", min: 501, max: 1000 },
    { label: "₹ 1001 - 2000", min: 1001, max: 2000 },
    { label: "₹ 2001+", min: 2001, max: Infinity },
  ];

  const filtered = useMemo(() => {
    let list = [...items];

    if (debouncedSearch.trim()) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (selectedRanges.length > 0) {
      list = list.filter((product) =>
        selectedRanges.some((label) => {
          const range = priceRanges.find((r) => r.label === label);
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

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

 
  const handleGoToTable = () => {
    navigate("/products");
  };

  if (loading) return <h2 className="loading">Loading...</h2>;

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
              onChange={(e) => setSearch(e.target.value)}
            />

            
            <div className="top-buttons">
              <button className="table-btn" onClick={handleGoToTable}>
                Product Table
              </button>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>

          <div className="grid">
            {loading ? (
              [...Array(itemsPerPage)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={
                    currentPage === index + 1 ? "active-page" : ""
                  }
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
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