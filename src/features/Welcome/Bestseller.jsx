import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BestSeller.css";

export default function BestSeller() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products.slice(0, 4));
      });
  }, []);

  return (
    <section className="bestSeller">
      <div className="bestSellerContainer">
        {products.map((product, index) => (
          <div
            className={`bestSellerCard ${
              index % 2 !== 0 ? "reverse" : ""
            }`}
            key={product.id}
          >
            {/* IMAGE */}
            <div className="imageSection">
              <img
                src={product.thumbnail}
                alt={product.title}
              />
            </div>

            {/* CONTENT */}
            <div className="contentSection">
              <span className="tag">
                {product.category}
              </span>

              <h2>Trending Top Deals</h2>

              <p>{product.description}</p>

              <button
                onClick={() =>
                  navigate("/home")
                }
              >
                See All Products
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}