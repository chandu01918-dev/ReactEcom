import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const user =
      JSON.parse(localStorage.getItem("auth_user")) ||
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      return [];
    }

    const data = localStorage.getItem("cart");

    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    const user =
      JSON.parse(localStorage.getItem("auth_user")) ||
      JSON.parse(localStorage.getItem("user"));

    if (!user) {
      localStorage.removeItem("cart");
      return;
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(items)
    );
  } catch {}
};

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: loadCart()
  },

  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        if (item.quantity < action.payload.stock) {
          item.quantity += 1;
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1
        });
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );

      saveCart(state.items);
    },

    updateQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload.id
      );

      if (item) {
        item.quantity = action.payload.quantity;
      }

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("cart");
    },

    logoutCart: (state) => {
      state.items = [];

      localStorage.removeItem("cart");
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  logoutCart
} = cartSlice.actions;

export default cartSlice.reducer;