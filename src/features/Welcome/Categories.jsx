import { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";

import "./Categories.css";

export default function Categories({
  selectedCategory
}) {
  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const fetchProducts = async (
    category
  ) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );

      const data = await response.json();

      setProducts([
        ...(data.products || []),
        ...(data.products || [])
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="products-section">
      <div className="products-header">
        <div className="products-content">
          <span className="deal-badge">
            Best Deal Of The Day
          </span>

          <h2>
            Trending Top Deals
          </h2>

          <p>
            Discover unbeatable
            offers on beauty,
            groceries, furniture
            and fragrances.
          </p>

          <button>
            See All Products
          </button>
        </div>

        <div className="products-carousel">
          <div className="products-track">
            {products.map((product, i) => (
              <div
                key={`${product.id}-${i}`}
                className="product-card"
              >
                <span className="discount">
                  {Math.floor(
                    product.discountPercentage
                  )}
                  % OFF
                </span>

                <img
                  src={product.thumbnail}
                  alt={product.title}
                />

                <h4>
                  {product.title}
                </h4>

                <p>
                  {product.brand}
                </p>

                <div className="price">
                  ₹
                  {Math.floor(
                    product.price * 80
                  )}
                </div>

                <div className="rating">
                  <FaStar />

                  <span>
                    {product.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}