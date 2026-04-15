import React, { useEffect, useState } from "react";
import "./ProductTable.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity, removeFromCart } from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products);
        setFiltered(data.products);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = () => {
    let list = [...products];

    if (category) {
      list = list.filter((p) => p.category === category);
    }

    if (brand) {
      list = list.filter((p) => p.brand === brand);
    }

    if (rating) {
      list = list.filter((p) => p.rating >= Number(rating));
    }

    if (minPrice) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    if (search) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(list);
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];

  const getCartItem = (id) =>
    cartItems.find((item) => item.id === id);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="table-container">
      <h1>Product Table</h1>

      <button onClick={() => navigate("/")} className="back-btn">
        Back to Home
      </button>

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Brands</option>
          {brands.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">Min Rating</option>
          <option value="4">4 & above</option>
          <option value="3">3 & above</option>
          <option value="2">2 & above</option>
          <option value="1">1 & above</option>
        </select>

        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          className="search-box"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="apply-btn" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price </th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((product) => {
            const cartItem = getCartItem(product.id);

            return (
              <tr key={product.id}>
                <td>
                  <img src={product.thumbnail} alt="" />
                </td>

                <td>{product.title}</td>
                <td>{product.description.slice(0, 40)}...</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>{product.stock}</td>
                <td>{product.brand}</td>

                <td>
                  {!cartItem ? (
                    <button
                      className="cart-btn"
                      disabled={product.stock === 0}
                      onClick={() => dispatch(addToCart(product))}
                    >
                      {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </button>
                  ) : (
                    <div className="qty-controls">
                      <button
                        onClick={() => {
                          if (cartItem.quantity === 1) {
                            dispatch(removeFromCart(product.id));
                          } else {
                            dispatch(
                              updateQuantity({
                                id: product.id,
                                quantity: cartItem.quantity - 1
                              })
                            );
                          }
                        }}
                      >
                        -
                      </button>

                      <span>{cartItem.quantity}</span>

                      <button
                        onClick={() => {
                          if (cartItem.quantity < product.stock) {
                            dispatch(
                              updateQuantity({
                                id: product.id,
                                quantity: cartItem.quantity + 1
                              })
                            );
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;