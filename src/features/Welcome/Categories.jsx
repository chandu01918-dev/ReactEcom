import { useEffect, useState } from "react";

import {
  FaAppleAlt,
  FaCouch,
  FaSprayCan,
  FaSpa,
  FaChevronLeft,
  FaChevronRight,
  FaStar
} from "react-icons/fa";

import "./Categories.css";

export default function Categories() {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("beauty");

  const [currentIndex, setCurrentIndex] =
    useState(0);

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

      setProducts(data.products || []);

      setCurrentIndex(0);
    } catch (error) {
      console.log(error);
    }
  };

  const nextSlide = () => {
    if (
      currentIndex <
      products.length - 4
    ) {
      setCurrentIndex(
        currentIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(
        currentIndex - 1
      );
    }
  };

  return (
    <div className="categories-wrapper">
      <div className="categories">
        {categories.map((cat, index) => (
          <div
            key={index}
            className={`category-item ${
              selectedCategory ===
              cat.slug
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedCategory(
                cat.slug
              )
            }
          >
            <div className="category-icon">
              {cat.icon}
            </div>

            <span>{cat.name}</span>
          </div>
        ))}
      </div>

      <div className="products-section">
        <div className="products-header">
          <div>
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
            <div className="products-row">
              {products
                .slice(
                  currentIndex,
                  currentIndex + 4
                )
                .map((product) => (
                  <div
                    key={product.id}
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

            <div className="carousel-buttons">
              <button
                onClick={prevSlide}
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextSlide}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}