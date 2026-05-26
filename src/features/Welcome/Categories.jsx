import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {FaStar,FaChevronLeft,FaChevronRight} from "react-icons/fa";
import "./Categories.css";

export default function Categories({
  selectedCategory
}) {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const intervalRef = useRef(null);

  const sectionRef = useRef(null);

  const CARD_WIDTH = 238;

  const VISIBLE_CARDS = 4;

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (
      selectedCategory &&
      sectionRef.current
    ) {
      sectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }, [selectedCategory]);

  useEffect(() => {
    startAutoSlide();

    return stopAutoSlide;
  }, [products]);

  const fetchProducts = async (
    category
  ) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );

      const data =
        await response.json();

      setProducts(
        data.products || []
      );

      setCurrentIndex(0);
    } catch (error) {
      console.log(error);
    }
  };

  const nextSlide = () => {
    if (
      currentIndex >=
      products.length -
        VISIBLE_CARDS
    ) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(
        currentIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(
        products.length -
          VISIBLE_CARDS
      );
    } else {
      setCurrentIndex(
        currentIndex - 1
      );
    }
  };

  const startAutoSlide = () => {
    stopAutoSlide();

    intervalRef.current =
      setInterval(() => {
        nextSlide();
      }, 3000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(
        intervalRef.current
      );
    }
  };

  return (
    <div
      className="products-section"
      ref={sectionRef}
    >
      <div className="products-header">
        <div className="products-content">
          <span className="deal-badge">
            Best Deal Of The Day
          </span>

          <h2>
            Today’s Best Deals
          </h2>

          <p>
            Explore top discounts on
            beauty, groceries,
            furniture, and premium
            fragrances — all in one
            place at unbeatable
            prices.
          </p>

          <button
            className="see-all-products-btn"
            onClick={() =>
              navigate("/home")
            }
          >
            Explore Products
          </button>
        </div>

        <div
          className="products-carousel"
          onMouseEnter={
            stopAutoSlide
          }
          onMouseLeave={
            startAutoSlide
          }
        >
          <button
            className="carousel-btn prev"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>

          <button
            className="carousel-btn next"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>

          <div
            className="products-track"
            style={{
              transform: `translateX(-${
                currentIndex *
                CARD_WIDTH
              }px)`
            }}
          >
            {products.map(
              (product) => (
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
                    src={
                      product.thumbnail
                    }
                    alt={
                      product.title
                    }
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
                      product.price *
                        80
                    )}
                  </div>

                  <div className="rating">
                    <FaStar />

                    <span>
                      {
                        product.rating
                      }
                    </span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}