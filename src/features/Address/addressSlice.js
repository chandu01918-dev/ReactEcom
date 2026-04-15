import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "addresses";
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: loadFromStorage()
  },
  reducers: {
    addAddress: (state, action) => {
      const newAddress = { id: nanoid(), ...action.payload };
      state.list.push(newAddress);
      saveToStorage(state.list);
    },

    deleteAddress: (state, action) => {
      state.list = state.list.filter(a => a.id !== action.payload);
      saveToStorage(state.list);
    },

    updateAddress: (state, action) => {
      const index = state.list.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
        saveToStorage(state.list);
      }
    }
  }
});

export const { addAddress, deleteAddress, updateAddress } = addressSlice.actions;
export default addressSlice.reducer;